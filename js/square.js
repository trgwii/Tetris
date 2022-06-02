//@ts-check

/**
 * @typedef {{
 * middle: string,
 * top: string,
 * right: string,
 * bottom: string,
 * left: string
 * }} SquareColorInfo
 */

/** @typedef {(ctx: CanvasRenderingContext2D, color: string, x: number, y: number) => void} DrawSimple */
/** @typedef {(ctx: CanvasRenderingContext2D, colors: SquareColorInfo, x: number, y: number) => void} DrawFull */

/** @type {DrawSimple} */
const squareTop = (ctx, color, x, y) => {
  const p = new Path2D();
  p.moveTo(x, y);
  p.lineTo(x += 30, y);
  p.lineTo(x -= 5, y += 5);
  p.lineTo(x -= 20, y);
  p.lineTo(x -= 5, y -= 5);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareRight = (ctx, color, x, y) => {
  const p = new Path2D();
  p.moveTo(x += 30, y);
  p.lineTo(x, y += 30);
  p.lineTo(x -= 5, y -= 5);
  p.lineTo(x, y -= 20);
  p.lineTo(x += 5, y -= 5);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareLeft = (ctx, color, x, y) => {
  const p = new Path2D();
  p.moveTo(x, y);
  p.lineTo(x += 5, y += 5);
  p.lineTo(x, y += 20);
  p.lineTo(x -= 5, y += 5);
  p.lineTo(x, y -= 30);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareBottom = (ctx, color, x, y) => {
  const p = new Path2D();
  p.moveTo(x, y += 30);
  p.lineTo(x += 5, y -= 5);
  p.lineTo(x += 20, y);
  p.lineTo(x += 5, y += 5);
  p.lineTo(x -= 30, y);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawFull} */
export const square = (ctx, colors, x, y) => {
  ctx.fillStyle = colors.middle;
  ctx.fillRect(x, y, 30, 30);
  squareBottom(ctx, colors.bottom, x, y);
  squareRight(ctx, colors.right, x, y);
  squareLeft(ctx, colors.left, x, y);
  squareTop(ctx, colors.top, x, y);
};

/** @type {DrawSimple} */
export const outline = (ctx, color, x, y) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 30, 30);
  ctx.fillStyle = "black";
  ctx.fillRect(x + 3, y + 3, 24, 24);
};
