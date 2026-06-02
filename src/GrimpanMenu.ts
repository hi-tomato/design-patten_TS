import { BackCommand, CircleSelectCommand, Command, ErasearSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand } from "./commands/index.js";
import type Grimpan from "./Grimpan.js";
import type { ChromeGrimpan, GrimpanMode, IEGrimpan } from "./Grimpan.js";
import { GrimpanMenuBtn } from "./GrimpanMenuBtn.js";

export type BtnType = | "pen" | "circle" | "rectangle" | "eraser"
  | "back" | "forward" | "save" | "pipette" | "color";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize (types: BtnType[]): void;

  abstract setActiveBtn(type: GrimpanMode): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}
  
export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]): void {
    types.forEach(this.drowButtonByType.bind(this))
    this.setActiveBtn('pen')
  }

  setActiveBtn(type: GrimpanMode) {
    document.querySelector('.active')?.classList.remove('active')
    document.querySelector(`${type}-btn`)?.classList.add('active')
    this.grimpan.setMode(type);
  }

  executeCommand(command: Command) {
    /** 비활성화 로직  */
    command.execute(); // Invoker가 명령을 실행하는 구조
  }

  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history))
  }

  onClickPen() {
    const command = new PenSelectCommand(this.grimpan);
    this.executeCommand(command);
    this.grimpan.history.stack.push(command)
  }
  
  onClickEraser() {
    this.executeCommand(new ErasearSelectCommand(this.grimpan))
  }

  onClickCircle() {
    this.executeCommand(new CircleSelectCommand(this.grimpan))
  }

  onClickRectangle() {
    this.executeCommand(new RectangleSelectCommand(this.grimpan))
  }

  onClickPipette() {
    this.executeCommand(new PipetteSelectCommand(this.grimpan))
  }

  drowButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        return new GrimpanMenuBtn.Builder(this, "뒤로", type)
          .setOnClick(this.onClickBack.bind(this))
          .build();
      }
      case "forward": {
        return new GrimpanMenuBtn.Builder(this, "앞으로", type)
          .setOnClick(() => {})
          .build();
      }
      case "pen": {
        return new GrimpanMenuBtn.Builder(this, "펜", type)
          .setActive(true)
          .setOnClick(this.onClickPen.bind(this))
          .build();
      }
      case "pipette": {
        const btn = new GrimpanMenuBtn.Builder(this, '스포이드', type)
        .setOnClick(this.onClickEraser.bind(this))
        .build();
        btn.draw();
        return btn;
      }
      case "circle": {
        const btn = new GrimpanMenuBtn.Builder(this, '원', type)
        .setOnClick(this.onClickCircle.bind(this))
        .build();
        btn.draw();
        return btn;
      }
      case "rectangle": {
        const btn = new GrimpanMenuBtn.Builder(this, '사각형', type)
        .setOnClick(this.onClickRectangle.bind(this))
        .build();
        btn.draw();
        return btn;
      }
      case "eraser": {
        const btn = new GrimpanMenuBtn.Builder(this, '지우개', type)
        .setOnClick(this.onClickEraser.bind(this))
        .build();
        btn.draw();
        return btn;
      }

      // 필요에 따라 circle, rectangle, eraser, save, color, pipette 추가
      default: {
        return new GrimpanMenuBtn.Builder(this, type, type).build();
      }
  }
  }

  static override getInstance(grimpan: ChromeGrimpan, dom: HTMLElement): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom)
    }
    return this.instance;
  }
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;
  override initialize(): void {
    
  }
  override setActiveBtn(type: GrimpanMode): void {
    document.querySelector('.active')?.classList.remove('active')
    document.querySelector(`${type}-btn`)?.classList.add('active')
    this.grimpan.setMode(type);
  }

  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom)
    }
    return this.instance;
  }
}

