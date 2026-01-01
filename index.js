//@ts-check
/**
 * @fileoverview Main entry point for music-md package exposing remark plugins
 */

import remarkLilypond from "./plugins/remark-lilypond/index.js";
import {markdownRenderer} from "./markdownRenderer/index.js";

import remarkGuitarChart, {
  closeBrowser,
} from "./plugins/remark-guitar-chart/index.js";

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

/**
 * Default export containing both plugins
 */
export default {
  remarkLilypond,
  remarkGuitarChart,
  closeBrowser,
  markdownRenderer
};
