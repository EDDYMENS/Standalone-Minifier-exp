# Standalone Minifier (exp)

> Personal use: To minify JavaScript for my static blog site.

This tool allows you to minify JavaScript files using [Terser](https://terser.org/) via Deno. It supports both running as a Deno script and compiling to a binary for Linux and macOS environments.

## Features
- **Minify JavaScript files**: Reduces the size of your JS files by removing unnecessary characters (like whitespace and comments) and optimizing the code.
- **Custom input and output**: You can specify the source JavaScript file and the output file for the minified code.
- **Cross-platform binary**: Compile the minifier into a binary executable for Linux or macOS, eliminating the need for Deno runtime in production.

## Requirements
- [Deno](https://deno.land/#installation) must be installed to run or compile the script.
- The script uses the `--allow-read` and `--allow-write` permissions to access the file system.

## Usage

### Running the Script Directly

You can run the JavaScript minifier using Deno directly with the following command:

```bash
deno run --allow-read --allow-write minifier.ts --file="path/to/source.js" --output="path/to/output.min.js"
```

- `--file`: The path to the input JavaScript file that you want to minify.
- `--output`: The path where the minified file will be saved. If no `--output` is specified, the minified code will be printed to the console.

### Example

```bash
deno run --allow-read --allow-write minifier.ts --file="spa.js" --output="spa.min.js"
```

This will minify `spa.js` and save the minified result to `spa.min.js`.

### Compiling the Minifier to a Binary

You can compile the script into a standalone binary for Linux or macOS. This allows you to run the minifier without requiring Deno to be installed on the system.

#### Compiling for Linux

To compile the script into a binary for Linux, use the following command:

```bash
deno compile --allow-read --allow-write --target x86_64-unknown-linux-gnu --output ./minifier-linux minifier.ts
```

This will generate an executable named `minifier-linux` that you can run on Linux systems.

#### Compiling for macOS

To compile the script into a binary for macOS, use this command:

```bash
deno compile --allow-read --allow-write --target x86_64-apple-darwin --output ./minifier-darwin minifier.ts
```

This will generate an executable named `minifier-darwin` that you can run on macOS systems.

### Using the Compiled Binary

After compiling the binary for your system, you can use the minifier without needing Deno installed. Run the binary as follows:

```bash
./minifier --file="path/to/source.js" --output="path/to/output.min.js"
```

- Replace `minifier` with `minifier-linux` or `minifier-darwin`, depending on your platform.
- Specify the input JavaScript file using the `--file` flag and the output file using the `--output` flag.

### Example

```bash
./minifier --file="spa.js" --output="spa.min.js"
```

This will minify `spa.js` and save the minified code to `spa.min.js` using the compiled binary.

## Error Handling

- If neither `--file` nor `--input` is provided, the script will output an error:
  ```bash
  Please provide either --file or --input argument.
  ```

- If there is an issue during minification, an error message will be displayed:
  ```bash
  Error: Minification failed.
  ```

## TODO
- Reduce bundle/binary size.
- Allow minification of other asset types