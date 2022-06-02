//@ts-check

import { outline, square } from "./square.js";
import {
  blue,
  cyan,
  green,
  orange,
  purple,
  red,
  wall,
  yellow,
} from "./colors.js";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const allColors = [null, blue, cyan, green, orange, purple, red, yellow];

/** @type {<T>(arr: T[]) => T} */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** @type {import('./square.js').DrawFull} */
const drawLineV = (ctx, colors, x, y) => {
  const pX = (x + 6) * 30;
  const pY = (y + 1) * 30;
  square(ctx, colors, pX, pY + 0 * 30);
  square(ctx, colors, pX, pY + 1 * 30);
  square(ctx, colors, pX, pY + 2 * 30);
  square(ctx, colors, pX, pY + 3 * 30);
};

/** @type {import('./square.js').DrawFull} */
const drawLineH = (ctx, colors, x, y) => {
  const pX = (x + 6) * 30;
  const pY = (y + 1) * 30;
  square(ctx, colors, pX + 0 * 30, pY);
  square(ctx, colors, pX + 1 * 30, pY);
  square(ctx, colors, pX + 2 * 30, pY);
  square(ctx, colors, pX + 3 * 30, pY);
};

const render = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let y = 0; y < Math.floor(ctx.canvas.height / 30); y++) {
    for (let x = 0; x < Math.floor(ctx.canvas.width / 30); x++) {
      // Game grid
      if (y !== 0 && y !== 21 && x >= 6 && x < 16) {
        continue;
      }
      // Next piece
      if (y > 0 && y <= 4 && x > 16 && x <= 20) continue;
      square(ctx, wall, x * 30, y * 30);
    }
  }
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

const state = { x: 0, y: 0 };

/** @type {(min: number, max: number, x: number) => number} */
const clamp = (min, max, x) => x < min ? min : x > max ? max : x;

const lineVHeight = 4;
const lineVWidth = 1;

const update = () => {
  state.x = clamp(
    0,
    10 - lineVWidth,
    state.x + Number(input.right) - Number(input.left),
  );
  state.y = clamp(
    0,
    20 - lineVHeight,
    state.y + Number(input.down) - Number(input.up),
  );
};

const main = () => {
  update();
  render();
  drawLineV(ctx, cyan, state.x, state.y);
};

main();
