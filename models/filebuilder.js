"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileBuilder {
    constructor(name, path, content) {
        this.name = name;
        this.path = path;
        this.content = content;
    }
    static factory(name, path, content) {
        return new FileBuilder(`${name}.ts`, path, content);
    }
    getCompleteFileName() {
        return `${this.path}/${this.name}`;
    }
}
exports.FileBuilder = FileBuilder;
class ExportFileBuilder extends FileBuilder {
    setContentFromFileNames(filesNames) {
        this.content = filesNames.reduce((pv, cv) => `${pv}\nexport *  from '${cv.replace(".ts", "")}';`, "");
    }
    constructor(name, location) {
        super(`${name}.exports.ts`, location);
    }
}
exports.ExportFileBuilder = ExportFileBuilder;
//# sourceMappingURL=filebuilder.js.map