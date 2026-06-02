import type Grimpan from "../Grimpan.js";
import type { GrimpanHistory } from "../GrimpanHistory.js";

 export abstract class Command {
  abstract execute(): void;
 }

 export class BackCommand extends Command {
  name = 'back';

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.undo(); // Reciver
  }
 }

 export class ForwardCommand extends Command {
  name = 'forward';

  constructor(private history: GrimpanHistory) {
    super();
  }

  override execute(): void {
    this.history.redo();
  }
 }

 export class PenSelectCommand extends Command {
  name = 'penSelect';

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.setMode("pen");
  }
 }

 export class ErasearSelectCommand extends Command {
    name = 'eraserSelect';

    constructor(private grimpan: Grimpan) {
      super();
    }

    override execute() {
      this.grimpan.menu.setActiveBtn('eraser');
    }
}

 export class CircleSelectCommand extends Command {
    name = 'circleSelect';

    constructor(private grimpan: Grimpan) {
      super();
    }

    override execute() {
      this.grimpan.setMode("circle");
    }
}

 export class RectangleSelectCommand extends Command {
    name = 'rectangleSelect';

    constructor(private grimpan: Grimpan) {
      super();
    }

    override execute() {
      this.grimpan.menu.setActiveBtn("rectangle");
    }
}

 export class PipetteSelectCommand extends Command {
    name = 'pipetteSelect';

    constructor(private grimpan: Grimpan) {
      super();
    }

    override execute() {
      this.grimpan.menu.setActiveBtn("pipette");
    }
}