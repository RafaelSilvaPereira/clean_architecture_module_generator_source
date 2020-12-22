"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aux_funtions_1 = require("./aux.funtions");
class ClassFileSufixes {
    constructor(builder) {
        const { model, entity, domainInterface, usecase, mainInterface, protocol, connector, drive, datasource, presentation, convertClassSufixInFileSufix, } = builder;
        this.model = aux_funtions_1.nullTernary(model, "Model");
        this.entity = aux_funtions_1.nullTernary(entity, "Entity");
        this.domainInterface = aux_funtions_1.nullTernary(domainInterface, "Typedef");
        this.mainInterface = aux_funtions_1.nullTernary(mainInterface, "Interface");
        this.usecase = aux_funtions_1.nullTernary(usecase, "Usecase");
        this.protocol = aux_funtions_1.nullTernary(protocol, "Protocol");
        this.connector = aux_funtions_1.nullTernary(connector, "Connector");
        this.drive = aux_funtions_1.nullTernary(drive, "Drive");
        this.datasource = aux_funtions_1.nullTernary(datasource, "Datasource");
        this.presentation = aux_funtions_1.nullTernary(presentation, "Controller");
        this.convertClassSufixInFileSufix = aux_funtions_1.nullTernary(convertClassSufixInFileSufix, (sufix) => sufix.toLowerCase());
    }
    toFileSufix(sufix) {
        return this.toFileSufix(sufix);
    }
}
exports.ClassFileSufixes = ClassFileSufixes;
//# sourceMappingURL=class_file.sufix.js.map