/** [AbstractGrimpan]
 * @description
 * 1. 추상 그림판을 생성합니다.
 * 2. 상속 받은 그림판에는 초기화 메서드와, 초기화 메뉴 메서드를 구현해야 합니다.
 * 3. 싱글톤 패턴을 적용하여, getInstance 메서드를 통해 인스턴스를 반환합니다.
 * */

import { BackCommand, Command, ForwardCommand } from "./commands/index.js";
import { ChromeGrimpanFactory, IEGrimpanFactory, type AbstractGrimpanFactory } from "./GrimpanFactory.js";
import type { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import type { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode, type Mode } from "./modes/index.js";

export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = 'pen' | 'eraser' | 'pipette' | 'circle' | 'rectangle';

export type ImageType = 'png' | 'jpg' | 'webp' | 'avif' | 'gif' | 'pdf';

export default abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: Mode;
  color: string;
  active: boolean;
  saveStrategy!: () => void;

  protected constructor(canvas: HTMLCanvasElement, factory: typeof AbstractGrimpanFactory) {
    if(!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element not found');
    }

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.color = '#000000';
    this.active = false;
    this.setSaveStrategy('png');
  }

  setSaveStrategy(imageType: ImageType) {
    switch(imageType) {
    case 'png': {
      this.saveStrategy = () => {
        const a_Tag = document.createElement('a');
        a_Tag.download = 'canvas.png';
        const dataURL = a_Tag.href = this.canvas.toDataURL('image/png');
        let url = dataURL.replace('image/webp', 'data:application/octet-stream');
        a_Tag.href = url;
        a_Tag.click();
      }
      break;
    }
    case 'jpg': {
      this.saveStrategy = () => {
        const a_Tag = document.createElement('a');
        a_Tag.download = 'canvas.jpg';
        const dataURL = a_Tag.href = this.canvas.toDataURL('image/jpg');
        let url = dataURL.replace('image/webp', 'data:application/octet-stream');
        a_Tag.href = url;
        a_Tag.click();
      }
      break;
    }
    case 'webp': {
      this.saveStrategy = () => {
        const a_Tag = document.createElement('a');
        a_Tag.download = 'canvas.webp';
        const dataURL = a_Tag.href = this.canvas.toDataURL('image/webp');
        let url = dataURL.replace('image/webp', 'data:application/octet-stream');
        a_Tag.href = url;
        a_Tag.click();
      }
      break;
    }
    default: {
      throw new Error('Invalid image type');
    }
  }}

  setColor(color: string) {
    this.color = color;
  }

  setMode(mode: GrimpanMode) {
    console.log('mode change', mode)
    switch(mode) {
      case "pen":
        this.mode = new PenMode(this);
        break;
      case "eraser":
        this.mode = new EraserMode(this);
        break;
      case "pipette":
        this.mode = new PipetteMode(this);
        break;
      case "circle":
        this.mode = new CircleMode(this);
        break;
      case "rectangle":
        this.mode = new RectangleMode(this);
        break;
    }
  }

  changeColor(color: string) {
    this.setColor(color);
    
    if(this.menu.colorBtn) {
      this.menu.colorBtn.value = color;
    }
  }

  executeCommand(command: Command) {}

  abstract initialize(option: GrimpanOption): void;
  abstract onMouseDown(e: MouseEvent): void;
  abstract onMouseMove(e: MouseEvent): void;
  abstract onMouseUp(e: MouseEvent): void;

  static getInstance() {
    
  }
}

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  menu: ChromeGrimpanMenu;
  history: ChromeGrimpanHistory;

  private constructor(canvas: HTMLCanvasElement, factory: typeof ChromeGrimpanFactory) {
    super(canvas, factory);

    this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu")!);
    this.history = factory.createGrimpanHistory(this, document.querySelector("#history")!);
    this.menu.setActiveBtn('pen');
  }

  override initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log(e);
      if(e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        this.menu.executeCommand(new ForwardCommand(this.history))
        return;
      }
      if(e.code === "KeyZ" && e.ctrlKey) {
        this.menu.executeCommand(new BackCommand(this.history))
        return;
      }
    })
  }

  override onMouseDown(e: MouseEvent) {
    this.mode.mouseDown(e)
  };

  override onMouseMove(e: MouseEvent) {
    this.mode.mouseMove(e)
  };

  override onMouseUp(e: MouseEvent) {
    this.mode.mouseUp(e)
  };


  static override getInstance() {
    if(!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas')!, ChromeGrimpanFactory);
    }

    return this.instance
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  override initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu)
    this.history.initialize();
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
  }


  override onMouseDown(e: MouseEvent) {

  };
  
  override onMouseMove(e: MouseEvent) {
    
  };

  override onMouseUp(e: MouseEvent) {
    
  };

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('canvas')!, IEGrimpanFactory)
    }
    return this.instance;
  }
}