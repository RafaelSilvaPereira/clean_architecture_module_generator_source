"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aux_funtions_1 = require("./aux.funtions");
class FolderSufixes {
    constructor(builder) {
        const { main, mainDomain, adapter, adapterConnectors, adapterDrives, infra, infraDatasources, infraPresentation, mainDomainEntities, mainDomainInterfaces, mainDomainModels, mainInterfaces, mainProtocol, mainUsecases, } = builder;
        this.main = aux_funtions_1.nullTernary(main, "main");
        this.mainInterfaces = aux_funtions_1.nullTernary(mainInterfaces, "interface");
        this.mainDomain = aux_funtions_1.nullTernary(mainDomain, "domain");
        this.mainDomainModels = aux_funtions_1.nullTernary(mainDomainModels, "models");
        this.mainDomainEntities = aux_funtions_1.nullTernary(mainDomainEntities, "entities");
        this.mainDomainInterfaces = aux_funtions_1.nullTernary(mainDomainInterfaces, "typedefs");
        this.mainUsecases = aux_funtions_1.nullTernary(mainUsecases, "usecases");
        this.mainInterfaces = aux_funtions_1.nullTernary(mainUsecases, "interfaces");
        this.mainProtocol = aux_funtions_1.nullTernary(mainProtocol, "protocols");
        this.adapter = aux_funtions_1.nullTernary(adapter, "adapter");
        this.adapterConnectors = aux_funtions_1.nullTernary(adapterConnectors, "connectors");
        this.adapterDrives = aux_funtions_1.nullTernary(adapterDrives, "drives");
        this.infra = aux_funtions_1.nullTernary(infra, "infra");
        this.infraDatasources = aux_funtions_1.nullTernary(infraDatasources, "datasources");
        this.infraPresentation = aux_funtions_1.nullTernary(infraPresentation, "presentation");
    }
}
exports.FolderSufixes = FolderSufixes;
//# sourceMappingURL=folder.sufix.js.map