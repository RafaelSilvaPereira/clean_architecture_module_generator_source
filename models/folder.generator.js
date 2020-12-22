"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aux_funtions_1 = require("./aux.funtions");
const filebuilder_1 = require("./filebuilder");
const params_1 = require("./params");
class FolderGen {
    constructor(builder) {
        this.separator = () => "/";
        this.exportName = () => this.exportFile.name;
        Object.assign(this, builder);
        this.exportFile = new filebuilder_1.ExportFileBuilder(builder.folderName, this.path());
    }
    path() {
        const oldPath = `${aux_funtions_1.nullTernary(this.parent?.path(), params_1.RootPath.I().path)}`;
        const newPath = this.folderName != null ? `${this.separator()}${this.folderName}` : "";
        return `${oldPath}${newPath}`;
    }
    getImports() {
        let numberOfBars = "";
        for (var i = 0; i < this.nestedLevel; i++) {
            numberOfBars += "../";
        }
        return `${numberOfBars}${params_1.RootPath.I().name}.exports`;
    }
    generateExportFile(filesNames) {
        this.exportFile.setContentFromFileNames(filesNames);
    }
}
exports.FolderGen = FolderGen;
//# sourceMappingURL=folder.generator.js.map