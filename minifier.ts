import { minify } from "https://esm.sh/terser@5.19.2";

async function minifyJS(jsCode: string): Promise<string> {
    const result = await minify(jsCode, {
        compress: true,
        mangle: true,
        format: { comments: false },
    });
    if (result.code) return result.code;
    throw new Error("Minification failed.");
}

interface Args {
    [key: string]: string | undefined;
}

function parseArgStrings(argArray: string[]): Args {
    const args: Args = {};
    argArray.forEach((argString) => {
        if (argString.startsWith("--") && argString.includes("=")) {
            const [key, value] = argString.split("=");
            args[key.substring(2)] = value;
        }
    });
    return args;
}

const args = parseArgStrings(Deno.args);
const { file: inputFile, input: inputScript, output: outputFile } = args;

if (!inputFile && !inputScript) {
    console.error("Please provide either --file or --input argument.");
    Deno.exit(1);
}

try {
    const jsCode = inputScript ?? (await Deno.readTextFile(inputFile!));
    const minifiedCode = await minifyJS(jsCode);
    
    if (outputFile) {
        await Deno.writeTextFile(outputFile, minifiedCode);
        console.log(`Minification complete. Output saved to ${outputFile}`);
    } else {
        console.log(minifiedCode);
    }
} catch (error) {
    console.error("Error:", error);
}
