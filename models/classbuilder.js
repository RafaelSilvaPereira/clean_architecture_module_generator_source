"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aux_funtions_1 = require("./aux.funtions");
const filebuilder_1 = require("./filebuilder");
class ClassBuilder {
    constructor(builder) {
        Object.assign(this, builder);
    }
    getFileName() {
        return this.fileBuilder.name;
    }
    declaretionName() {
        return this.isInterface ? "I" + this.className : this.className;
    }
    static factory(builder) {
        const { filename, className, location, isInterface, superClass, dependency, } = builder;
        const imports = aux_funtions_1.nullTernary(builder.imports, "");
        const validDepency = ClassBuilder.getValidDependency(dependency);
        const fullPropertyName = ClassBuilder.getFullProptertyName(validDepency, dependency);
        const properties = ClassBuilder.getProperties(isInterface, validDepency, dependency);
        const classPrefix = ClassBuilder.getClassPrefix(isInterface);
        const _className = ClassBuilder.getClassFullName(isInterface, className);
        const constructorParams = ClassBuilder.getConstructorParams(dependency, fullPropertyName);
        console.log(constructorParams);
        const constructor = ClassBuilder.getConstructor(isInterface, _className, constructorParams);
        const supClass = !!superClass
            ? `implements ${superClass?.declaretionName()}`
            : "";
        const content = `\n
import {} from '${imports.trim()}';

export ${classPrefix} ${_className} ${supClass} {
  ${properties}

  ${constructor}
}
`;
        const formatedFileName = isInterface ? "i." + filename : filename;
        return new ClassBuilder({
            isInterface: isInterface,
            className: className,
            fileBuilder: filebuilder_1.FileBuilder.factory(formatedFileName, location, content),
            imports: imports,
            dependency: dependency,
            superClass: superClass,
        });
    }
    static getConstructor(isInterface, _className, constructorParams) {
        const builderType = !!constructorParams ? constructorParams : "any";
        return !isInterface
            ? `constructor(builder: ${builderType}) {
      Object.assign(this, builder);
    }`
            : "";
    }
    static getConstructorParams(dependency, fullPropertyName) {
        return !!dependency
            ? `{${fullPropertyName}: ${dependency.declaretionName()}}`
            : "";
    }
    static getClassFullName(isInterface, className) {
        return isInterface ? `I${className}` : className;
    }
    static getClassPrefix(isInterface) {
        return isInterface ? "abstract class" : "class";
    }
    static getProperties(isInterface, validDepency, dependency) {
        let properties;
        if (!isInterface && validDepency) {
            properties = `private readonly  ${dependency.className[0].toLowerCase()}${dependency.className.substring(1)} : ${dependency.declaretionName()}`;
        }
        else {
            properties = "";
        }
        return properties;
    }
    static getFullProptertyName(validDepency, dependency) {
        return validDepency
            ? dependency.className[0].toLowerCase() +
                dependency.className.substring(1)
            : "";
    }
    static getFullClassName(validDepency, dependency) {
        return validDepency ? dependency.className : "";
    }
    static getValidDependency(dependency) {
        console.log(dependency);
        return !!dependency && dependency.className.length > 0;
    }
}
exports.ClassBuilder = ClassBuilder;
//# sourceMappingURL=classbuilder.js.map