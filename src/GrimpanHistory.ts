import type Grimpan from "./AbstractGrimpan";
import type { ChromeGrimpan } from "./ChormeGrimpan";

interface Cloneable {
  clone(): Cloneable;
}

class HistoryStack extends Array implements Cloneable {
  clone() {
    return this.slice() as HistoryStack;
  }
}


export abstract class GrimpanHistory {
  grimpan: Grimpan; 
  stack: HistoryStack;

  protected constructor(grimpan: Grimpan, stack: HistoryStack) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
  }

  abstract initialize (): void;

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  static getInstance(grimpan: Grimpan, stack: HistoryStack) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  override initialize() {}

  static override getInstance(grimpan: Grimpan) {
    if(!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan, new HistoryStack());
    }

    return this.instance;
  }
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;
  override initialize(): void {
    
  }
  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan, new HistoryStack());
    }
    return this.instance;
  }
} 