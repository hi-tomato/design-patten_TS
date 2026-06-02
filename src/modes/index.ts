import { CircleSelectCommand, ErasearSelectCommand, PenSelectCommand, PipetteSelectCommand, RectangleSelectCommand } from "../commands/index.js";
import type Grimpan from "../Grimpan.js";


const convertToHex = (color: number) => {
  if (color < 0) {
    return 0;
  } 
  else if (color > 255) {
    return 255;
  }

  const hex = color.toString(16)

  return `0${hex}`.slice(-2);
}

const rgb2hex = (r: number, g: number, b: number) => {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export abstract class Mode {

  constructor(protected grimpan: Grimpan) {
    this.grimpan = grimpan;
  }

  abstract mouseDown(e: MouseEvent): void;
  abstract mouseMove(e: MouseEvent): void;
  abstract mouseUp(e: MouseEvent): void;
}

export class PenMode extends Mode {
  constructor(grimpan: Grimpan){
    super(grimpan);
    grimpan.history.stack.push(new PenSelectCommand(grimpan));
  }

  override mouseDown(e: MouseEvent) {
    this.grimpan.active = true;
    this.grimpan.ctx.lineWidth = 1;
    this.grimpan.ctx.lineCap = 'round';
    this.grimpan.ctx.strokeStyle = this.grimpan.color;
    this.grimpan.ctx.globalCompositeOperation = 'source-over'
    this.grimpan.ctx.beginPath();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
  }
  override mouseMove(e: MouseEvent) {
    if (!this.grimpan.active) {
      return;
    }
    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseUp(e: MouseEvent) {
    this.grimpan.active = false;
    
    
  }
}

export class EraserMode extends Mode {
  constructor(grimpan: Grimpan){
    super(grimpan);
    grimpan.history.stack.push(new ErasearSelectCommand(grimpan));
  }

  override mouseDown(e: MouseEvent) {
        this.grimpan.active = true;
        this.grimpan.ctx.lineWidth = 10;
        this.grimpan.ctx.lineCap = 'round';
        this.grimpan.ctx.strokeStyle = '#000'
        this.grimpan.ctx.globalCompositeOperation = 'destination-out'
        this.grimpan.ctx.beginPath();
        this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseMove(e: MouseEvent) {
    if (!this.grimpan.active) {
        return;
    }

    this.grimpan.ctx.lineTo(e.offsetX, e.offsetY);
    this.grimpan.ctx.stroke();
    this.grimpan.ctx.moveTo(e.offsetX, e.offsetY);
  }
  override mouseUp() {
    this.grimpan.active = false;
    return;
  }
} 

export class PipetteMode extends Mode {
  constructor(grimpan: Grimpan){
    super(grimpan);
    grimpan.history.stack.push(new PipetteSelectCommand(grimpan));
  }

  override mouseDown() {}
  override mouseMove(e: MouseEvent) {
     const { data } =this.grimpan.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
        if(data[3] === 0) {
          this.grimpan.changeColor('#FFFFFF')
        } else {
          this.grimpan.changeColor(rgb2hex(data[0]!, data[1]!, data[2]!))
        }
  }
  override mouseUp() {
    this.grimpan.menu.setActiveBtn('pen')
  }
}

export class RectangleMode extends Mode {
  constructor(grimpan: Grimpan){
    super(grimpan);
    grimpan.history.stack.push(new RectangleSelectCommand(grimpan));
  }

  override mouseDown() {}
  override mouseMove() {}
  override mouseUp() {}
}

export class CircleMode extends Mode {
  constructor(grimpan: Grimpan){
    super(grimpan);
    grimpan.history.stack.push(new CircleSelectCommand(grimpan));
  }

  override mouseDown() {}
  override mouseMove() {}
  override mouseUp() {}
}