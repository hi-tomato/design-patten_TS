/**
 * @description singleton 패턴을 적용한 GrimpanFactory의 추상 클래스입니다.
 */

import type Grimpan from "./AbstractGrimpan.js";
import { ChromeGrimpan } from "./ChormeGrimpan.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, IEGrimpanMenu } from "./GrimpanMenu.js";
import IEGrimpan from "./IEGrimpan.js";

abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }

  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }

  static createGrimpanHistory(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }
}


export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom)
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan)
  }
}