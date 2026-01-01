//@ts-check
import {markdownRenderer} from "../markdownRenderer/index.js";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

/**
 * Demo function to process a sample markdown file and generate HTML output
 */
async function runDemo() {
  const inputFilePath = join(__dirname, "example.md");
  const outputFilePath = join(__dirname, "output.html");

  await markdownRenderer(inputFilePath, outputFilePath);
  console.log(`✓ Generated HTML output at ${outputFilePath}`);
}

runDemo().catch((error) => {
  console.error("Error running demo:", error);
});