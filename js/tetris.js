//@ts-check

import { outline, square } from "./square.js";
import { cyan, wall } from "./colors.js";
import { tetrominoes } from "./tetrominoes.js";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const gameWidthPx = ctx.canvas.width;
const gameHeightPx = ctx.canvas.height;

const cellSize = 30;

const gameWidth = Math.floor(gameWidthPx / cellSize);
const gameHeight = Math.floor(gameHeightPx / cellSize);

const boardWidth = 10;
const boardHeight = 20;

const boardOffsetX = 6;
const boardOffsetY = 1;

/** @type {import('./square.js').DrawFull} */
const drawLineV = (ctx, colors, x, y) => {
  const pX = (x + boardOffsetX) * cellSize;
  const pY = (y + boardOffsetY) * cellSize;
  outline(ctx, colors.middle, pX, 17 * cellSize, cellSize);
  outline(ctx, colors.middle, pX, 18 * cellSize, cellSize);
  outline(ctx, colors.middle, pX, 19 * cellSize, cellSize);
  outline(ctx, colors.middle, pX, 20 * cellSize, cellSize);
  square(ctx, colors, pX, pY + 0 * cellSize, cellSize);
  square(ctx, colors, pX, pY + 1 * cellSize, cellSize);
  square(ctx, colors, pX, pY + 2 * cellSize, cellSize);
  square(ctx, colors, pX, pY + 3 * cellSize, cellSize);
};

/** @type {import('./square.js').DrawFull} */
const drawLineH = (ctx, colors, x, y) => {
  const pX = (x + boardOffsetX) * cellSize;
  const pY = (y + boardOffsetY) * cellSize;
  square(ctx, colors, pX + 0 * cellSize, pY, cellSize);
  square(ctx, colors, pX + 1 * cellSize, pY, cellSize);
  square(ctx, colors, pX + 2 * cellSize, pY, cellSize);
  square(ctx, colors, pX + 3 * cellSize, pY, cellSize);
};

const initRender = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let y = 0; y < gameHeight; y++) {
    for (let x = 0; x < gameWidth; x++) {
      // Game grid
      if (
        y >= boardOffsetY && y < boardHeight + boardOffsetY &&
        x >= boardOffsetX && x < boardWidth + boardOffsetX
      ) {
        continue;
      }
      // Next piece
      if (y > 0 && y <= 4 && x > 16 && x <= 20) continue;
      square(ctx, wall, x * cellSize, y * cellSize, cellSize);
    }
  }
};

const updateRender = () => {
  ctx.canvas.style.border = input.pause ? "3px solid red" : "";
  ctx.fillStyle = "black";
  ctx.fillRect(
    boardOffsetX * cellSize,
    boardOffsetY * cellSize,
    boardWidth * cellSize,
    boardHeight * cellSize,
  );
};

const input = {
  up: false,
  right: false,
  down: false,
  left: false,
  space: false,
  pause: false,
};

document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === " ") input.space = true;
  if (k === "arrowup" || k === "w") input.up = true;
  if (k === "arrowright" || k === "d") input.right = true;
  if (k === "arrowdown" || k === "s") input.down = true;
  if (k === "arrowleft" || k === "a") input.left = true;
  if (k === "escape") input.pause = !input.pause;
  main();
});

document.addEventListener("keyup", (e) => {
  const k = e.key.toLowerCase();
  if (k === " ") input.space = false;
  if (k === "arrowup" || k === "w") input.up = false;
  if (k === "arrowright" || k === "d") input.right = false;
  if (k === "arrowdown" || k === "s") input.down = false;
  if (k === "arrowleft" || k === "a") input.left = false;
});

const state = { x: 0, y: 0, i: 0 };

/** @type {(min: number, max: number, x: number) => number} */
const clamp = (min, max, x) => x < min ? min : x > max ? max : x;

const lineVHeight = 4;
const lineVWidth = 1;

const update = () => {
  if (input.pause) return;
  state.x = clamp(
    0,
    10 - lineVWidth,
    state.x + Number(input.right) - Number(input.left),
  );
  if (input.space) {
    state.i = (state.i + 1) % tetrominoes.length;
  }
  if (input.up) {
    tetrominoes[state.i].rotate();
  }
  state.y = clamp(
    0,
    20 - lineVHeight,
    state.y + Number(input.down),
  );
};

const main = () => {
  update();
  updateRender();
  tetrominoes[state.i].draw(
    ctx,
    boardOffsetX,
    boardOffsetY,
    state.x,
    state.y,
    cellSize,
  );
};

initRender();
main();
