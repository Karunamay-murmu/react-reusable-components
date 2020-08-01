const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const parse = require("react-docgen").parse;
const chokidar = require("chokidar");

const paths = {
    examples: path.join(__dirname, "../src", "docs", "examples"),
    components: path.join(__dirname, "../src", "components"),
    output: path.join(__dirname, "../config", "componentData.js"),
};

const enableWatchMode = process.argv.slice(2) == "--watch";
if (enableWatchMode) {
    // Regenerate component metadata when components or example changes
    chokidar
        .watch([paths.examples, paths.components])
        .on("change", function (event, path) {
            generate(paths);
        });
} else {
    // Generate Component metadata;
    generate(paths);
}

function generate(paths) {
    const errors = [];
    const componentData = getDirectories(paths.components).map(function (
        componentName
    ) {
        try {
            return getComponentData(paths, componentName);
        } catch (error) {
            errors.push(
                "An error occured while generating metadata for " +
                    componentName +
                    ". " +
                    error
            );
        }
    });
    writeFile(
        paths.output,
        "module.exports = " +
            JSON.stringify(errors.length ? errors : componentData)
    );
}

function getComponentData(paths, componentName) {
    const content = readFile(
        path.join(paths.components, componentName, componentName + ".js")
    );
    const info = parse(content);

    return {
        name: componentName,
        description: info.description,
        props: info.props,
        code: content,
        examples: getExampleData(paths.examples, componentName),
    };
}

function getExampleData(examplePath, componentName) {
    const examples = getExampleFiles(examplePath, componentName);
    return examples.map(function (file) {
        let filePath = path.join(examplePath, componentName, file);
        let content = readFile(filePath);
        let info = parse(content);

        return {
            // By convention component name should match the file name
            // So remove the .js extension to get the component name.
            name: file.slice(0, -3),
            description: info.description,
            code: content,
        };
    });
}

function getExampleFiles(examplePath, componentName) {
    let exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(examplePath, componentName));
    } catch (error) {
        console.log(chalk.red(`No example found for ${componentName}.`));
    }
    return exampleFiles;
}

function getDirectories(filePath) {
    return fs.readdirSync(filePath).filter(function (file) {
        return fs.statSync(path.join(filePath, file)).isDirectory();
    });
}

function getFiles(filePath) {
    return fs.readdirSync(filePath).filter(function (file) {
        return fs.statSync(path.join(filePath, file)).isFile();
    });
}
function writeFile(filePath, content) {
    fs.writeFile(filePath, content, function (err) {
        err
            ? console.log(chalk.red(err))
            : console.log(chalk.green("Component data saved."));
    });
}

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}
