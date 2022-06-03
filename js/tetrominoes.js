//@ts-check

import { blue, cyan, green, orange, purple, red, yellow } from "./colors.js";
import { outline, square } from "./square.js";

/** @typedef {import('./square.js').ColorInfo} ColorInfo */

/** @typedef {[boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]} Shape */

export class Tetromino {
  constructor(
    /** @type {'I' | 'O' | 'T' | 'J' | 'L' | 'S' | 'Z'} */ name,
    /** @type {Shape} */ shape,
    /** @type {ColorInfo} */ colors,
  ) {
    this.name = name;
    this.shape = shape;
    this.colors = colors;
  }

  rotate() {
    const newShape =
      /** @type {Shape} */
      (Array(16).fill(false));

    newShape[0] = this.shape[0];
    newShape[7] = this.shape[1];
    newShape[11] = this.shape[2];
    newShape[15] = this.shape[3];
    newShape[2] = this.shape[4];
    newShape[6] = this.shape[5];
    newShape[10] = this.shape[6];
    newShape[14] = this.shape[7];
    newShape[1] = this.shape[8];
    newShape[5] = this.shape[9];
    newShape[9] = this.shape[10];
    newShape[13] = this.shape[11];
    newShape[0] = this.shape[12];
    newShape[4] = this.shape[13];
    newShape[8] = this.shape[14];
    newShape[12] = this.shape[15];
    this.shape = newShape;
  }

  /** @type {(ctx: CanvasRenderingContext2D, boardOffsetX: number, boardOffsetY: number, x: number, y: number, size: number, drawOutline: boolean) => void} */
  draw(ctx, boardOffsetX, boardOffsetY, x, y, size, drawOutline = false) {
    for (let i = 0; i < this.shape.length; i++) {
      if (!this.shape[i]) continue;
      const xOffset = i % 4;
      const yOffset = Math.floor(i / 4);
      const pX = (x + boardOffsetX + xOffset) * size;
      const pY = (y + boardOffsetY + yOffset) * size;
      if (drawOutline) {
        outline(ctx, this.colors.middle, pX, pY, size);
      } else {
        square(ctx, this.colors, pX, pY, size);
      }
    }
  }

  /** @type {() => { minWidth: number, minHeight: number, maxWidth: number, maxHeight: number }} */
  bounds() {
    let minWidth = Infinity;
    let minHeight = Infinity;
    let maxWidth = 0;
    let maxHeight = 0;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (this.shape[y * 4 + x]) {
          if (minWidth > x) minWidth = x;
          if (maxWidth < x) maxWidth = x;
          if (minHeight > y) minHeight = y;
          if (maxHeight < y) maxHeight = y;
        }
      }
    }
    return { minWidth, minHeight, maxWidth, maxHeight };
  }

  /** @type {(board: number[], boardX: number, boardY: number, boardWidth: number) => void} */
  materialize(board, boardX, boardY, boardWidth) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (this.shape[y * 4 + x]) {
          board[(boardY + y) * boardWidth + (boardX + x)] = tetrominoes
            .findIndex((v) => v?.name === this.name);
        }
      }
    }
  }

  debugPrint() {
    let str = "";
    for (let i = 0; i < this.shape.length; i++) {
      str += (this.shape[i] ? "X" : "O") + ((i + 1) % 4 === 0 ? "\n" : "");
    }
    console.log(str);
  }
}

const X = true;
const O = false;

// deno-fmt-ignore
export const tetrominoes = [
  ,
  new Tetromino("I", [
    O, O, X, O,
    O, O, X, O,
    O, O, X, O,
    O, O, X, O,
  ], cyan),
  new Tetromino("O", [
    O, O, O, O,
    O, X, X, O,
    O, X, X, O,
    O, O, O, O,
  ], yellow),
  new Tetromino("T", [
    O, O, O, O,
    O, X, X, X,
    O, O, X, O,
    O, O, O, O,
  ], purple),
  new Tetromino("J", [
    O, O, X, O,
    O, O, X, O,
    O, X, X, O,
    O, O, O, O,
  ], blue),
  new Tetromino("L", [
    O, X, O, O,
    O, X, O, O,
    O, X, X, O,
    O, O, O, O,
  ], orange),
  new Tetromino("S", [
    O, X, O, O,
    O, X, X, O,
    O, O, X, O,
    O, O, O, O,
  ], green),
  new Tetromino("Z", [
    O, O, X, O,
    O, X, X, O,
    O, X, O, O,
    O, O, O, O,
  ], red),
];
