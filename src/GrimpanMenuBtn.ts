import type { BtnType, GrimpanMenu } from "./GrimpanMenu.js";

// 1. 그림판 태그 요소 공통 부모 생성
export abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    this.menu = menu;
    this.name = name;
    this.type = type;
  }

  abstract draw(): void;
}

// 2. 그림판 태그 요소 조립 도구 공통 부모 생성 (중간 브릿지 역할)
export abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;

  build() {
    return this.btn
  }
}

// 3. 버튼 + 버튼 전용 빌더 (2번 부모를 상속)
export class GrimpanMenuBtn extends GrimpanMenuElement {
  protected onClick?: () => void;
  protected active?: boolean;
  protected type: BtnType;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    super(menu, name, type);
    this.type = type;
  }

  override draw() {
    const btn = document.createElement("button");
    btn.textContent = this.name;
    btn.id = `${this.type}-btn`;

    if(this.onClick) 
      btn.addEventListener("click", this.onClick.bind(this));

    if(this.active)
      btn.classList.add("active");

    (this.menu as any).dom.appendChild(btn);
  }

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;

    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  }
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: () => void;
  private value?: string | number;

  private constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    super(menu, name, type);
  }

  override draw() {
    const input = document.createElement("input");
    input.type = 'color';
    input.title = this.name;
    input.id = 'color-btn';
    
    if (this.onChange) {
      input.addEventListener("change", this.onChange.bind(this));
    }
    if (this.value !== undefined) {
      input.value = String(this.value);
    }
    (this.menu as any).dom.appendChild(input);
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;

    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuInput(menu, name, type);
    }

    setOnChange(onChange: () => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
  };
}