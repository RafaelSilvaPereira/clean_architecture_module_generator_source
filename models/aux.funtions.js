"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classbuilder_1 = require("./classbuilder");
exports.nullTernary = (thing, other) => !!thing ? thing : other;
exports.toSnakeCase = (str) => str.trim().toLowerCase().split(" ").join("_");
exports.toPascalCase = (str) => str
    .trim()
    .split(" ")
    .reduce((pv, cv) => `${pv}${cv[0].toUpperCase()}${cv.substring(1)}`);
exports.createClass = (params) => {
    const { isInterface, classBaseName, classTerminology, moduleFolderGen, classDependecy, classExtension, } = params;
    const classNameSnackCase = exports.toSnakeCase(classBaseName); // classBaseName
    const classNamePascalCase = exports.toPascalCase(classBaseName); // classBaseName
    const classTermonolgySnackCase = exports.toSnakeCase(classTerminology); // classTerminologyclassTermonolgy
    const classTermonolgyPascalCase = exports.toPascalCase(classTerminology); // classTermonolgy
    const classBuildered = classbuilder_1.ClassBuilder.factory({
        imports: moduleFolderGen.getImports(),
        className: `${classNamePascalCase}${classTermonolgyPascalCase}`,
        isInterface: isInterface,
        filename: `${classNameSnackCase}.${classTermonolgySnackCase}`,
        location: moduleFolderGen.path(),
        dependency: classDependecy,
        superClass: classExtension,
    });
    return classBuildered;
};
function getDataClasses(dataclassName, classesFilesSufix, builder) {
    const { modelsFolder, entitiesFolder, domainInterfaceFolder } = builder;
    const domainInterface = exports.createClass({
        classBaseName: dataclassName,
        classTerminology: classesFilesSufix.domainInterface,
        isInterface: true,
        moduleFolderGen: domainInterfaceFolder,
    });
    const entity = exports.createClass({
        classBaseName: dataclassName,
        classTerminology: classesFilesSufix.entity,
        isInterface: false,
        moduleFolderGen: entitiesFolder,
    });
    const model = exports.createClass({
        classBaseName: dataclassName,
        classTerminology: classesFilesSufix.model,
        isInterface: false,
        moduleFolderGen: modelsFolder,
        classDependecy: entity,
    });
    const dataClassesBuilder = {
        entity: entity,
        domainInterface: domainInterface,
        model: model,
    };
    return dataClassesBuilder;
}
exports.getDataClasses = getDataClasses;
function getFunctionallityClasses(usecaseClasseBaseName, classFileSufixes, builder) {
    const { interfaceFolder, protocolsFolder, driversFolder, usecasesFolder, connectorsFolder, datasourcesFolder, } = builder;
    /// declare interfaces
    const mainInterface = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.mainInterface,
        isInterface: true,
        moduleFolderGen: interfaceFolder,
    });
    const protocolInterface = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.protocol,
        isInterface: true,
        moduleFolderGen: protocolsFolder,
    });
    const driveInterface = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.drive,
        isInterface: true,
        moduleFolderGen: driversFolder,
    });
    /// declare implementation
    const usecaseImpl = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.usecase,
        isInterface: false,
        moduleFolderGen: usecasesFolder,
        classExtension: mainInterface,
        classDependecy: protocolInterface,
    });
    const connectorImpl = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.connector,
        isInterface: false,
        moduleFolderGen: connectorsFolder,
        classExtension: protocolInterface,
        classDependecy: driveInterface,
    });
    const datasourcesImpl = exports.createClass({
        classBaseName: usecaseClasseBaseName,
        classTerminology: classFileSufixes.datasource,
        isInterface: false,
        moduleFolderGen: datasourcesFolder,
        classExtension: driveInterface,
    });
    return {
        connector: connectorImpl,
        datasource: datasourcesImpl,
        drive: driveInterface,
        interface: mainInterface,
        protocol: protocolInterface,
        usecase: usecaseImpl,
    };
}
exports.getFunctionallityClasses = getFunctionallityClasses;
//# sourceMappingURL=aux.funtions.js.map