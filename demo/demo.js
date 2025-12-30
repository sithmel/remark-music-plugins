//@ts-check
/**
 * @fileoverview Demo script for the remark-lilypond and remark-svguitar plugins
 */

import { readFile, writeFile } from "fs/promises";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkLilypond from "../plugins/remark-lilypond/index.js";
import remarkGuitarChart, {
  closeBrowser,
} from "../plugins/remark-guitar-chart/index.js";

/**
 * Main demo function
 */
async function runDemo() {
  try {
    console.log("Running Music-MD plugins demo...");

    // Read the example markdown file
    const markdownContent = await readFile("demo/example.md", "utf8");
    console.log("✓ Read example markdown file");

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
    console.log("🎵 Processing LilyPond blocks...");
    console.log("🎸 Processing SVGuitar blocks...");
    const result = await processor.process(markdownContent);

    // Create HTML output
    const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music-MD Demo</title>
    <link href="remark.css" rel="stylesheet" />
    <link href="remark-print.css" rel="stylesheet" media="print" />
</head>
<body>
${result.toString()}
</body>
</html>`;

    // Write the output
    await writeFile("demo/output.html", htmlOutput, "utf8");
    console.log("✓ Generated demo/output.html");

    console.log("\nDemo completed successfully!");
    console.log("Open demo/output.html in your browser to see the results.");

    // Show some stats
    const lilypondBlocks = (markdownContent.match(/```lilypond/g) || []).length;
    const guitarChartBlocks = (markdownContent.match(/```guitar-chart/g) || []).length;
    console.log(
      `\nProcessed ${lilypondBlocks} LilyPond code blocks and ${guitarChartBlocks} Guitar Chart code blocks.`,
    );
  } catch (err) {
    // Normalize unknown exceptions so we can safely read .message
    const error = err instanceof Error ? err : new Error(String(err));

    console.error("❌ Demo failed:", error.message);

    if (String(error.message).includes("lilypond")) {
      console.log(
        "\n💡 Make sure LilyPond is installed and available in your PATH.",
      );
      console.log(
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

// Check if this script is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo();
}

export default runDemo;
