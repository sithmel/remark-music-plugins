//@ts-check
import { readFile, writeFile } from "fs/promises";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkLilypond from "../plugins/remark-lilypond/index.js";
import remarkGuitarChart, {
  closeBrowser,
} from "../plugins/remark-guitar-chart/index.js";
import { readFileSync } from "fs";
import { join, basename, extname } from "path";

const thisFolder = new URL(".", import.meta.url).pathname;
const css = readFileSync(join(thisFolder, "remark.css"), "utf8");
const printCss = readFileSync(join(thisFolder, "remark-print.css"), "utf8");

/**
 * Process markdown content with music notation plugins
 * @param {string} markdownContent - The markdown content to process
 * @param {string} [title=""] - Optional title for the HTML document
 * @returns {Promise<string>} The generated HTML output
 */
async function processMarkdown(markdownContent, title = "", extraCss = "", paged = false) {
  try {
    // Create processor with plugins
    const processor = remark()
      .use(remarkLilypond, {
        binaryPath: "lilypond",
        errorInline: true,
        skipOnMissing: true, // Skip if LilyPond not available
      })
      .use(remarkGuitarChart, {
        errorInline: true,
        skipOnMissing: true, // Skip if Puppeteer not available
      })
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false }); // Allow raw HTML/SVG (needed for musical notation)

    // Process the markdown
    const result = await processor.process(markdownContent);

    // Create HTML output
    const htmlOutput = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>${css}</style>
      <style media="print">${printCss}</style>
      <style>${extraCss}</style>
      ${paged ? '<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>' : ''}
  </head>
  <body>
  ${result.toString()}
  </body>
  </html>`;

    return htmlOutput;
  } catch (err) {
    // Normalize unknown exceptions so we can safely read .message
    const error = err instanceof Error ? err : new Error(String(err));

    console.error("❌ Markdown Renderer failed:", error.message);

    if (String(error.message).includes("lilypond")) {
      console.error(
        "\n💡 Make sure LilyPond is installed and available in your PATH.",
      );
      console.error(
        "   You can install it from: https://lilypond.org/download.html",
      );
    }

    process.exit(1);
  } finally {
    // Always clean up browser resources
    try {
      await closeBrowser();
    } catch (closeErr) {
      // ignore cleanup errors
    }
  }
}

/**
 * Main demo function
 * @param {string} inputFilePath - Path to the input markdown file
 * @param {string} outputFilePath - Path to the output HTML file
 * @param {object} options - Additional options
 * @param {string} [options.title] - title for the HTML document
 * @param {string} [options.css = ""] - additional css
 * @param {boolean} [options.paged = false] - whether to include paged.js for pagination
 */
export async function markdownRenderer(inputFilePath, outputFilePath, options = {}) {
  const {title, css = "", paged = false} = options;
  console.log("Running Markdown Renderer...");

  const markdownContent = await readFile(inputFilePath, "utf8");
  console.log("✓ Read markdown file");

  const htmlOutput = await processMarkdown(markdownContent, title ?? basename(inputFilePath, extname(inputFilePath)), css, paged);

  await writeFile(outputFilePath, htmlOutput, "utf8");
  console.log(`✓ Generated ${outputFilePath}`);
}
