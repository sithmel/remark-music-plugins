# remark music plugins

Remark plugins to insert music notation and guitar fretboard chart in markdown files

## Markdown Extensions

### LilyPond Integration

The LilyPond extension allows you to embed musical notation directly in your markdown:

````markdown
```lilypond
\version "2.20.0"

{
  \clef treble
  \time 4/4
  \key c \major

  c'4 d'4 e'4 f'4 |
  g'4 a'4 b'4 c''2
}
```
````

The plugin will:

- Detect fenced code blocks with the `lilypond` language identifier
- Compile the LilyPond code to SVG using the LilyPond CLI
- Embed the resulting SVG as inline images in your output

### Guitar Fretboard Charts

The svguitar extension uses the [svguitar library](https://github.com/omnibrain/svguitar) and [Text Guitar Chart](https://github.com/sithmel/text-guitar-chart) to render guitar fretboard diagrams:

````markdown
```guitar-charts
  A min
  ######
  oo   o
  ------
  ||||o|
  ||o*||
  ||||||

  D
  ######
  xoo
  ------
  ||||||
  |||o|o
  ||||*|
```
````

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- LilyPond (for musical notation rendering)
- Google Chrome or Chromium (for guitar chord rendering)

To install LilyPond:

- **macOS**: `brew install lilypond`
- **Ubuntu/Debian**: `apt install lilypond`
- **Windows**: Download from [lilypond.org](https://lilypond.org/download.html)

For guitar chord rendering, the plugin uses Puppeteer which will automatically download a suitable version of Chromium. No additional installation is required.

## Usage

### Basic Usage

```javascript
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkLilypond from "./plugins/remark-lilypond/index.js";
import remarkGuitarChart from "./plugins/remark-guitar-chart/index.js";

const processor = remark()
  .use(remarkLilypond)
  .use(remarkGuitarChart)
  .use(remarkHtml, { sanitize: false }); // Required: Allow raw HTML/SVG for musical notation

const result = await processor.process(markdownContent);
console.log(result.toString());
```

**Important**: The `sanitize: false` option is required for the SVG musical notation to display. For production use with untrusted content, consider using `remark-rehype` with `rehype-raw` instead for better security.

### Plugin Options

#### LilyPond Plugin Options

```javascript
const processor = remark().use(remarkLilypond, {
  binaryPath: "lilypond", // Path to LilyPond executable
  errorInline: false, // Show errors inline vs console
  skipOnMissing: false, // Skip processing if LilyPond not found
  compact: true, // Remove attribution and crop whitespace (default: true)
});
```

#### GuitarChart Plugin Options

```javascript
const processor = remark().use(remarkGuitarChart, {
  errorInline: false, // Show errors inline vs console
  skipOnMissing: false, // Skip processing if Puppeteer fails to launch
  puppeteerOptions: {
    // Options passed to puppeteer.launch()
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
```

### Running the Demo

Try the included demo to see the plugin in action:

```bash
node demo/demo.js
```

This will process `demo/example.md` and generate `demo/output.html` with rendered musical notation and guitar chord diagrams.

## Development

### Scripts

- `npm test` - Run tests using Node.js test runner
- `npm run format` - Format code using Prettier (no semicolons)
- `npm run types` - Generate TypeScript definitions from JSDoc comments

## Contributing

1. Write comprehensive JSDoc comments with TypeScript type annotations
2. Add tests for new functionality using the Node.js test runner
3. Format code using Prettier (no semicolons)
4. Ensure all tests pass before submitting

## Troubleshooting

### LilyPond Not Found Error

If you see errors like `lilypond: not found` or `LilyPond executable not found`, LilyPond is not installed or not in your system PATH.

**Solutions:**

1. **Install LilyPond:**
   - **macOS**: `brew install lilypond`
   - **Ubuntu/Debian**: `sudo apt install lilypond`
   - **Windows**: Download from [lilypond.org](https://lilypond.org/download.html)

2. **Verify Installation:**

   ```bash
   lilypond --version
   ```

3. **Specify Custom Path:**

   ```javascript
   const processor = remark().use(remarkLilypond, {
     binaryPath: "/usr/local/bin/lilypond", // Custom path
   });
   ```

4. **Skip Missing LilyPond:**
   ```javascript
   const processor = remark().use(remarkLilypond, {
     skipOnMissing: true, // Skip blocks if LilyPond not available
   });
   ```

### Compilation Errors

LilyPond compilation errors are usually due to invalid syntax. Common issues:

- Missing version declaration: Add `\\version "2.20.0"` at the top
- Unmatched braces: Ensure all `{` have matching `}`
- Invalid note names: Use proper LilyPond syntax

Set `errorInline: true` to see errors in the generated HTML instead of just the console.

### SVG Output Control

The plugin generates compact, clean SVG output by default:

- **Compact mode** (`compact: true`, default): Removes attribution text and crops excessive whitespace
- **Full mode** (`compact: false`): Preserves original LilyPond output including attribution

**Compact mode automatically:**

- Removes "Music engraving by LilyPond" attribution text
- Crops whitespace to focus on musical content
- Significantly reduces SVG file size

**To disable compact mode:**

```javascript
const processor = remark().use(remarkLilypond, {
  compact: false, // Keep full LilyPond output
});
```

### GuitarChart Chord Data Format

The GuitarChart plugin expects uses the syntax described [here](https://github.com/sithmel/text-guitar-chart)


### HTML Sanitization

The plugin generates raw SVG content that needs to pass through HTML processing:

**Quick Fix (for trusted content):**

```javascript
.use(remarkHtml, { sanitize: false })
```

**Recommended for Production (more secure):**

```javascript
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const processor = remark()
  .use(remarkLilypond)
  .use(remarkGuitarChart)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify);
```

## TypeScript Usage

Full TypeScript definitions are included. You can import the plugins and option types:

```ts
import { remark } from "remark";
import remarkHtml from "remark-html";
import {
  remarkLilypond,
  remarkGuitarChart,
  closeBrowser,
  type LilyPondOptions,
  type SVGuitarOptions,
} from "music-md";

const lilyOptions: LilyPondOptions = { compact: true };
const svguitarOptions: SVGuitarOptions = { keepAlive: true };

const processor = remark()
  .use(remarkLilypond, lilyOptions)
  .use(remarkGuitarChart, svguitarOptions)
  .use(remarkHtml, { sanitize: false });

const result = await processor.process(markdown);

// When using keepAlive you should close the browser manually after all processing:
await closeBrowser();
```

### SVGuitar keepAlive Option

The `keepAlive` option (default `false`) trades memory for speed across multiple markdown files:

```js
const processor = remark()
  .use(remarkGuitarChart, { keepAlive: true })
  .use(remarkHtml, { sanitize: false });

for (const file of files) {
  await processor.process(await fs.promises.readFile(file, "utf8"));
}

await closeBrowser(); // Important when keepAlive = true
```

| Scenario                  | Recommendation                                              |
| ------------------------- | ----------------------------------------------------------- |
| Single file CLI run       | leave `keepAlive` false                                     |
| Batch convert many files  | set `keepAlive: true`                                       |
| Long-lived server process | set `keepAlive: true` and call `closeBrowser()` on shutdown |

## License

ISC
