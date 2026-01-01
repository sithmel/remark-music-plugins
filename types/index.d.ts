export { default as remarkLilypond } from "./plugins/remark-lilypond/index.js";
declare namespace _default {
    export { remarkLilypond };
    export { remarkGuitarChart };
    export { closeBrowser };
    export { markdownRenderer };
}
export default _default;
import remarkLilypond from "./plugins/remark-lilypond/index.js";
import remarkGuitarChart from "./plugins/remark-guitar-chart/index.js";
import { closeBrowser } from "./plugins/remark-guitar-chart/index.js";
import markdownRenderer from "./markdownRenderer/index.js";
export { default as remarkGuitarChart, closeBrowser } from "./plugins/remark-guitar-chart/index.js";
