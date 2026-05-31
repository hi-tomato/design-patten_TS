import type Grimpan from "./AbstractGrimpan";
import type { ChromeGrimpan } from "./ChormeGrimpan";

export abstract class GrimpanHistory {
  grimpan: Grimpan; 

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
  }

  abstract initialize (): void;

  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  override initialize() {}

  static override getInstance(grimpan: Grimpan) {
    if(!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
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
      this.instance = new ChromeGrimpanHistory(grimpan)
    }
    return this.instance;
  }
}