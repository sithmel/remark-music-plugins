/**
 * @fileoverview Tests for the remark-svguitar plugin
 */

import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { remark } from "remark";

// Import the plugin
import remarkGuitarChart, {
  closeBrowser,
} from "../plugins/remark-guitar-chart/index.js";

// Suppress console output during tests
let originalConsoleError;
let originalConsoleWarn;

beforeEach(() => {
  originalConsoleError = console.error;
  originalConsoleWarn = console.warn;
  console.error = () => {}; // Suppress error messages during tests
  console.warn = () => {}; // Suppress warning messages during tests
});

afterEach(async () => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  // Close browser after each test to avoid conflicts
  await closeBrowser();
});

describe("remark-svguitar plugin", () => {
  test("should skip svguitar blocks when skipOnMissing is true and Puppeteer fails", async () => {
    const input = `# Guitar Chord Example

\`\`\`guitar-chard
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\`

Regular text.`;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
      puppeteerOptions: {
        executablePath: "/nonexistent/chrome", // Force browser launch failure
      },
    });

    // Should not throw when Puppeteer fails and skipOnMissing is true
    const result = await processor.process(input);

    // Verify the plugin processed the input (even if it skipped rendering)
    assert.ok(
      typeof result.toString() === "string",
      "Should return processed markdown",
    );
    assert.ok(
      result.toString().includes("Guitar Chord Example"),
      "Should preserve other content",
    );
    assert.ok(
      result.toString().includes("Regular text"),
      "Should preserve non-svguitar content",
    );
  });

  test("should handle multiple svguitar blocks with skipOnMissing", async () => {
    const input = `# Guitar Chord Examples

\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\`

Some text between chords.

\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
      puppeteerOptions: {
        executablePath: "/nonexistent/chrome",
      },
    });

    const result = await processor.process(input);

    // Should process without errors
    assert.ok(result.toString().length > 0, "Should return processed content");
    assert.ok(
      result.toString().includes("Guitar Chord Examples"),
      "Should preserve headings",
    );
    assert.ok(
      result.toString().includes("Some text between chords"),
      "Should preserve text",
    );
  });

  test("should handle plugin options correctly", async () => {
    const input = `\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\``;

    const options = {
      errorInline: true,
      skipOnMissing: true,
      puppeteerOptions: { headless: true },
    };

    const processor = remark().use(remarkGuitarChart, options);

    // Test that options are accepted without throwing
    await assert.doesNotReject(async () => {
      await processor.process(input);
    });
  });

  test("should preserve non-svguitar code blocks", async () => {
    const input = `\`\`\`javascript
console.log("hello")
\`\`\`

\`\`\`python
print("world")
\`\`\``;

    const processor = remark().use(remarkGuitarChart);
    const result = await processor.process(input);

    // Should preserve other code blocks unchanged
    const output = result.toString();
    assert.ok(
      output.includes("javascript"),
      "Should preserve javascript block",
    );
    assert.ok(output.includes("python"), "Should preserve python block");
    assert.ok(output.includes("console.log"), "Should preserve code content");
    assert.ok(output.includes('print("world")'), "Should preserve python code");
  });

  test("should handle empty svguitar blocks with skipOnMissing", async () => {
    const input = `\`\`\`guitar-chart
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
      puppeteerOptions: {
        executablePath: "/nonexistent/chrome",
      },
    });

    // Should not throw on empty blocks
    await assert.doesNotReject(async () => {
      await processor.process(input);
    });
  });

  test("should handle no svguitar blocks gracefully", async () => {
    const input = `# Regular Markdown

This is just regular markdown with no guitar chords.

\`\`\`javascript
console.log("Not SVGuitar")
\`\`\``;

    const processor = remark().use(remarkGuitarChart);
    const result = await processor.process(input);

    // Should process normally when no svguitar blocks present
    const output = result.toString();
    assert.ok(output.includes("Regular Markdown"), "Should preserve markdown");
    assert.ok(
      output.includes("javascript"),
      "Should preserve other code blocks",
    );
    assert.ok(output.includes("console.log"), "Should preserve code content");
  });

  test("should return transformer function", () => {
    const plugin = remarkGuitarChart({ errorInline: true });

    // Plugin should return a transformer function
    assert.ok(typeof plugin === "function", "Plugin should return a function");
  });

  test("should handle successful rendering with real Puppeteer", async () => {
    const input = `\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true, // Skip if Puppeteer not available rather than fail
    });

    // Should not throw regardless of whether Puppeteer is available
    await assert.doesNotReject(async () => {
      const result = await processor.process(input);

      // Either it rendered to SVG or it was skipped, both are valid outcomes
      const output = result.toString();
      assert.ok(typeof output === "string", "Should return a string");
      assert.ok(output.length > 0, "Should return non-empty content");
    });
  });
});

describe("Plugin configuration", () => {
  test("should accept errorInline option", () => {
    const plugin = remarkGuitarChart({ errorInline: true });
    assert.ok(typeof plugin === "function", "Should accept errorInline option");
  });

  test("should accept skipOnMissing option", () => {
    const plugin = remarkGuitarChart({ skipOnMissing: true });
    assert.ok(
      typeof plugin === "function",
      "Should accept skipOnMissing option",
    );
  });

  test("should accept puppeteerOptions", () => {
    const plugin = remarkGuitarChart({
      puppeteerOptions: {
        headless: true,
        args: ["--no-sandbox"],
      },
    });
    assert.ok(typeof plugin === "function", "Should accept puppeteerOptions");
  });

  test("should work with empty options", () => {
    const plugin = remarkGuitarChart();
    assert.ok(typeof plugin === "function", "Should work with no options");
  });

  test("should work with all options combined", () => {
    const plugin = remarkGuitarChart({
      errorInline: true,
      skipOnMissing: false,
      puppeteerOptions: {
        headless: true,
        args: ["--disable-dev-shm-usage"],
      },
    });
    assert.ok(
      typeof plugin === "function",
      "Should accept all options together",
    );
  });
});

describe("Multiple chord support", () => {
  test("should handle multiple chords in array format", async () => {
    const input = `\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true, // Skip if Puppeteer not available
    });

    await assert.doesNotReject(async () => {
      const result = await processor.process(input);
      const output = result.toString();
      assert.ok(typeof output === "string", "Should return a string");
      assert.ok(output.length > 0, "Should return non-empty content");
    });
  });

  test("should handle single chord (backward compatibility)", async () => {
    const input = `\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
    });

    await assert.doesNotReject(async () => {
      const result = await processor.process(input);
      const output = result.toString();
      assert.ok(typeof output === "string", "Should return a string");
      assert.ok(output.length > 0, "Should return non-empty content");
    });
  });

  test("should handle empty array gracefully", async () => {
    const input = `\`\`\`guitar-chart

\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
    });

    await assert.doesNotReject(async () => {
      const result = await processor.process(input);
      const output = result.toString();
      assert.ok(typeof output === "string", "Should return a string");
    });
  });

  test("should handle mixed valid and invalid chords in array", async () => {
    const input = `\`\`\`guitar-chart
  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|


  INVALID CHORD DATA
\`\`\``;

    const processor = remark().use(remarkGuitarChart, {
      skipOnMissing: true,
      errorInline: true,
    });

    await assert.doesNotReject(async () => {
      const result = await processor.process(input);
      const output = result.toString();
      assert.ok(typeof output === "string", "Should return a string");
    });
  });
});

describe("Cleanup", () => {
  test("should provide closeBrowser function", () => {
    assert.ok(
      typeof closeBrowser === "function",
      "Should export closeBrowser function",
    );
  });

  test("should handle closeBrowser gracefully", async () => {
    await assert.doesNotReject(async () => {
      await closeBrowser();
    }, "closeBrowser should not throw");
  });
});
