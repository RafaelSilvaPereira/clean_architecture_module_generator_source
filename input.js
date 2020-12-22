"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clean_architecture_module_generator_1 = require("./clean_architecture_module_generator");
const class_file_sufix_1 = require("./models/class_file.sufix");
const folder_sufix_1 = require("./models/folder.sufix");
const params_1 = require("./models/params");
class MockInput {
  async getConfiguration() {
    const params = new params_1.Params({
      moduleBaseName: "teste",
      dataModelsBaseName: ["Cliente3", "Cliente4"],
      usecasesBaseName: ["Uc3", "Uc4"],
      creationOptions: {
        type: params_1.CreationOptionsTypes.usecase,
        path:
          "/home/rafaelsp/projects/plugins/javascript/clean_architecture_module_generator/other",
        moduleBaseName: "teste",
      },
      fileSufixes: new class_file_sufix_1.ClassFileSufixes({}),
      folderSufixes: new folder_sufix_1.FolderSufixes({}),
    });
    return params;
  }
}
const creator = new clean_architecture_module_generator_1.CleanArchitectureGenerator();
creator.generator(new MockInput());
//# sourceMappingURL=input.js.map
