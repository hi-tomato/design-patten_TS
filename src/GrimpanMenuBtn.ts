import type { GrimpanMenu } from "./GrimpanMenu.js";

// 1. 그림판 태그 요소 공통 부모 생성
export abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;

  protected constructor(menu: GrimpanMenu, name: string) {
    this.menu = menu;
    this.name = name;
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
  private onClick?: () => void;
  private active?: boolean;

  private constructor(menu: GrimpanMenu, name: string) {
    super(menu, name);
  }

  override draw() {
    const btn = document.createElement("button");

    btn.textContent = this.name;

    if(this.onClick) 
      btn.addEventListener("click", this.onClick.bind(this));

    if(this.active)
      btn.classList.add("active");

    (this.menu as any).dom.appendChild(btn);
  }

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;

    constructor(menu: GrimpanMenu, name: string) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name);
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

  private constructor(menu: GrimpanMenu, name: string) {
    super(menu, name);
  }

  override draw() {
    const input = document.createElement("input");
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

    constructor(menu: GrimpanMenu, name: string) {
      super();
      this.btn = new GrimpanMenuInput(menu, name);
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