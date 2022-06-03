//@ts-check

/**
 * @typedef {{
 * middle: string,
 * top: string,
 * right: string,
 * bottom: string,
 * left: string
 * }} ColorInfo
 */

/** @typedef {(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, size: number) => void} DrawSimple */
/** @typedef {(ctx: CanvasRenderingContext2D, colors: ColorInfo, x: number, y: number, size: number) => void} DrawFull */

/** @type {DrawSimple} */
const squareTop = (ctx, color, x, y, size) => {
  const sixth = Math.round((1 / 6) * size);
  const twoThirds = Math.round((2 / 3) * size);
  const p = new Path2D();
  p.moveTo(x, y);
  p.lineTo(x += size, y);
  p.lineTo(x -= sixth, y += sixth);
  p.lineTo(x -= twoThirds, y);
  p.lineTo(x -= sixth, y -= sixth);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareRight = (ctx, color, x, y, size) => {
  const sixth = Math.round((1 / 6) * size);
  const twoThirds = Math.round((2 / 3) * size);
  const p = new Path2D();
  p.moveTo(x += size, y);
  p.lineTo(x, y += size);
  p.lineTo(x -= sixth, y -= sixth);
  p.lineTo(x, y -= twoThirds);
  p.lineTo(x += sixth, y -= sixth);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareLeft = (ctx, color, x, y, size) => {
  const sixth = Math.round((1 / 6) * size);
  const twoThirds = Math.round((2 / 3) * size);
  const p = new Path2D();
  p.moveTo(x, y);
  p.lineTo(x += sixth, y += sixth);
  p.lineTo(x, y += twoThirds);
  p.lineTo(x -= sixth, y += sixth);
  p.lineTo(x, y -= size);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawSimple} */
const squareBottom = (ctx, color, x, y, size) => {
  const sixth = Math.round((1 / 6) * size);
  const twoThirds = Math.round((2 / 3) * size);
  const p = new Path2D();
  p.moveTo(x, y += size);
  p.lineTo(x += sixth, y -= sixth);
  p.lineTo(x += twoThirds, y);
  p.lineTo(x += sixth, y += sixth);
  p.lineTo(x -= size, y);
  p.closePath();

  ctx.fillStyle = color;
  ctx.fill(p);
};

/** @type {DrawFull} */
export const square = (ctx, colors, x, y, size) => {
  ctx.fillStyle = colors.middle;
  ctx.fillRect(x, y, size, size);
  squareBottom(ctx, colors.bottom, x, y, size);
  squareRight(ctx, colors.right, x, y, size);
  squareLeft(ctx, colors.left, x, y, size);
  squareTop(ctx, colors.top, x, y, size);
};

/** @type {DrawSimple} */
export const outline = (ctx, color, x, y, size) => {
  const tenth = Math.round(0.1 * size);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = "black";
  ctx.fillRect(x + tenth, y + tenth, size - tenth * 2, size - tenth * 2);
};
