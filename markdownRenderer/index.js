//@ts-check
import { readFile, writeFile } from "fs/promises";
import { remark } from "remark";
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
async function processMarkdown(markdownContent, title = "") {
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
 */
export async function markdownRenderer(inputFilePath, outputFilePath) {
  console.log("Running Markdown Renderer...");

  const markdownContent = await readFile(inputFilePath, "utf8");
  console.log("✓ Read markdown file");

  const htmlOutput = await processMarkdown(markdownContent, basename(inputFilePath, extname(inputFilePath)));

  await writeFile(outputFilePath, htmlOutput, "utf8");
  console.log(`✓ Generated ${outputFilePath}`);
}

/**
 * Stream version that reads from stdin and writes to stdout
 * Logs go to stderr to keep stdout clean
 */
export async function markdownRendererStream() {
    // Read from stdin
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    const markdownContent = Buffer.concat(chunks).toString("utf8");
    const htmlOutput = await processMarkdown(markdownContent);
    process.stdout.write(htmlOutput);
}

