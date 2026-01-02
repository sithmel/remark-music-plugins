//@ts-check
/**
 * @fileoverview Main entry point for music-md package exposing remark plugins
 */


/**
 * Remark plugin for converting LilyPond code blocks to inline SVG
 * @type {import("./plugins/remark-lilypond/index.js").default}
 */
export { default as remarkLilypond } from "./plugins/remark-lilypond/index.js";

/**
 * Remark plugin for converting SVGuitar code blocks to inline SVG
 * @type {import("./plugins/remark-guitar-chart/index.js").default}
 */
export {
  default as remarkGuitarChart,
  closeBrowser,
} from "./plugins/remark-guitar-chart/index.js";

export {markdownRenderer} from "./markdownRenderer/index.js";
