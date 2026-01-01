#!/usr/bin/env node
//@ts-check
/**
 * @fileoverview CLI tool for music-md markdown renderer
 */

import { markdownRendererStream } from "./markdownRenderer/index.js";

// Run the stream renderer
markdownRendererStream().catch((err) => {
  console.error("Error processing markdown:", err.message);
  process.exit(1);
});
