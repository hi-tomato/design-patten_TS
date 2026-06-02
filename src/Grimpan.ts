/** [AbstractGrimpan]
 * @description
 * 1. 추상 그림판을 생성합니다.
 * 2. 상속 받은 그림판에는 초기화 메서드와, 초기화 메뉴 메서드를 구현해야 합니다.
 * 3. 싱글톤 패턴을 적용하여, getInstance 메서드를 통해 인스턴스를 반환합니다.
 * */

import { BackCommand, ForwardCommand } from "./commands/index.js";
import { ChromeGrimpanFactory, IEGrimpanFactory, type AbstractGrimpanFactory } from "./GrimpanFactory.js";
import type { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import type { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";

export interface GrimpanOption {
  menu: BtnType[];
}

export type GrimpanMode = 'pen' | 'eraser' | 'pipette' | 'circle' | 'rectangle';

export default abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: GrimpanMode;
  
  initialize(option: GrimpanOption) { }

  protected constructor(canvas: HTMLCanvasElement, factory: typeof AbstractGrimpanFactory) {
    if(!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element not found');
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
  }

  setMode(mode: GrimpanMode) {
    console.log('mode change', mode)
    this.mode = mode;
  }

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

  static override getInstance() {
    if(!this.instance) {
      this.instance = new ChromeGrimpan(document.querySelector('#canvas')!, ChromeGrimpanFactory);
    }

    return this.instance
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  override initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector('canvas')!, IEGrimpanFactory)
    }
    return this.instance;
  }
}