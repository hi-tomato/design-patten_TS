import type Grimpan from "./AbstractGrimpan.js";
import type { ChromeGrimpan } from "./ChormeGrimpan.js";
import { GrimpanMenuBtn } from "./GrimpanMenuBtn.js";
import type IEGrimpan from "./IEGrimpan.js";

export type BtnType = | "pen" | "circle" | "rectangle" | "eraser"
  | "back" | "forward" | "save" | "pipette" | "color";

 abstract class Command {
  abstract execute(): void;
 }

 class BackCommand extends Command {
  name = 'back';

  override execute(): void {
    this.grimpan.history.back();
  }
 }

 class PenCommand extends Command {
  name = 'pen';

  override execute(): void {
    this.grimpan.history.pen();
  }
 }

 class EraserCommand extends Command {
    name = 'eraser';
    execute() {
        // 지우개 구현
    }
}

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize (types: BtnType[]): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}
  
export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]): void {
    types.forEach((type) => {
      const btn = this.drowButtonByType(type);
      btn.draw();
    })
  }

  executeCommand(command: Command) {
    
    command.execute();
  }

  onClickBack() {
    this.executeCommand(new BackCommand())
  }

  onClickPen() {
    const command = new PenCommand();
    this.executeCommand(command);
    this.grimpan.history.push(command)
  }

  
  onClickEraser() {
    this.executeCommand(new EraserCommand())
  }

  drowButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        return new GrimpanMenuBtn.Builder(this, "뒤로")
          .setOnClick(this.onClickBack.bind(this))
          .build();
      }
      case "forward": {
        return new GrimpanMenuBtn.Builder(this, "앞으로")
          .setOnClick(() => {})
          .build();
      }
      case "pen": {
        return new GrimpanMenuBtn.Builder(this, "펜")
          .setActive(true)
          .setOnClick(this.onClickPen.bind(this))
          .build();
      }
      // 필요에 따라 circle, rectangle, eraser, save, color, pipette 추가
      default: {
        return new GrimpanMenuBtn.Builder(this, type).build();
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
  static override getInstance(grimpan: IEGrimpan, dom: HTMLElement): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom)
    }
    return this.instance;
  }
}

