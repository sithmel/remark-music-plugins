/**
 * Main demo function
 * @param {string} inputFilePath - Path to the input markdown file
 * @param {string} outputFilePath - Path to the output HTML file
 * @param {object} options - Additional options
 * @param {string} [options.title] - title for the HTML document
 * @param {string} [options.css = ""] - additional css
 * @param {boolean} [options.paged = false] - whether to include paged.js for pagination
 */
export function markdownRenderer(inputFilePath: string, outputFilePath: string, options?: {
    title?: string;
    css?: string;
    paged?: boolean;
}): Promise<void>;
