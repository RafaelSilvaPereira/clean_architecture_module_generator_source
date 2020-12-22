"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aux_funtions_1 = require("./aux.funtions");
class RootPath {
    setPath(path) {
        this.path = path;
    }
    static I() {
        if (!RootPath.instance) {
            RootPath.instance = new RootPath();
        }
        return RootPath.instance;
    }
}
exports.RootPath = RootPath;
class Params {
    constructor(builder) {
        Object.assign(this, builder);
    }
    getFolderName() {
        return aux_funtions_1.toSnakeCase(this.moduleBaseName);
    }
}
exports.Params = Params;
var CreationOptionsTypes;
(function (CreationOptionsTypes) {
    CreationOptionsTypes[CreationOptionsTypes["module"] = 0] = "module";
    CreationOptionsTypes[CreationOptionsTypes["usecase"] = 1] = "usecase";
})(CreationOptionsTypes = exports.CreationOptionsTypes || (exports.CreationOptionsTypes = {}));
//# sourceMappingURL=params.js.map