/**
 * @description singleton 패턴을 적용한 GrimpanFactory의 추상 클래스입니다.
 */

import type Grimpan from "./AbstractGrimpan";
import { ChromeGrimpan } from "./ChormeGrimpan";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory";
import { ChromeGrimpanMenu, IEGrimpanMenu } from "./GrimpanMenu";
import IEGrimpan from "./IEGrimpan";

abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }

  static createGrimpanMenu(grimpan: Grimpan) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }

  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error('하위 클래스에서 구현하셔야 합니다.')
  }
}


export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: ChromeGrimpan) {
    return ChromeGrimpanMenu.getInstance(grimpan);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance()
  }
  static override createGrimpanMenu(grimpan: IEGrimpan) {
    return IEGrimpanMenu.getInstance(grimpan)
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan)
  }
}