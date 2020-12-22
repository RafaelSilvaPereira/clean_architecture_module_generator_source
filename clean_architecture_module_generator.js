"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const aux_funtions_1 = require("./models/aux.funtions");
const folder_generator_1 = require("./models/folder.generator");
const params_1 = require("./models/params");
class CleanArchitectureGenerator {
    async writeFolders(folders) {
        for (const folder of folders) {
            fs_1.default.mkdirSync(folder.path());
            console.log(`[writed] ${folder.path()}`);
        }
    }
    async generator(inputOption) {
        const params = await inputOption.getConfiguration();
        params_1.RootPath.I().setPath(params.creationOptions.path);
        if (params.creationOptions.type === params_1.CreationOptionsTypes.module) {
            this.writeNewModule(params, params.folderSufixes, params.fileSufixes);
        }
        else if (params.creationOptions.type === params_1.CreationOptionsTypes.usecase) {
            this.writeNewUsecase(params);
        }
        else {
            console.log("invalid option");
        }
    }
    async writeNewModule(params, folderSufixes, classFileSufixes) {
        params_1.RootPath.I().name = params.moduleBaseName;
        const rootFolder = new folder_generator_1.FolderGen({
            nestedLevel: 0,
            folderName: params.getFolderName(),
            parent: null,
        });
        const foldersMap = new Map();
        foldersMap.set("root", rootFolder);
        this.getArchitectureFolders(rootFolder, folderSufixes).forEach((v, k) => foldersMap.set(k, v));
        await this.writeFolders(Array.from(foldersMap.values()));
        const dataClasses = this.getDataClassesClasseBuilder(foldersMap, params.dataModelsBaseName, classFileSufixes, folderSufixes);
        this.writeClasses([
            ...dataClasses.models,
            ...dataClasses.entities,
            ...dataClasses.domainInterface,
        ]);
        const functionallyClasses = this.getFunctionallyClasses(foldersMap, params, classFileSufixes, folderSufixes);
        this.writeClasses([
            ...functionallyClasses.connectors,
            ...functionallyClasses.datasources,
            ...functionallyClasses.drives,
            ...functionallyClasses.interfaces,
            ...functionallyClasses.protocols,
            ...functionallyClasses.usecases,
        ]);
        const exportsFiles = this.getExportFilesContent(folderSufixes, foldersMap, functionallyClasses, dataClasses);
        exportsFiles.forEach((exportFile) => this.writeFile(exportFile));
    }
    getExportFilesContent(folderSufixes, foldersMap, functionallyClasses, dataClassesMap) {
        const rootFolder = foldersMap.get("root");
        const mainFolder = foldersMap.get(folderSufixes.main);
        const mainDomainFolder = foldersMap.get(folderSufixes.mainDomain);
        const mainDomainModelsFolder = foldersMap.get(folderSufixes.mainDomainModels);
        const mainDomainEntitiesFolder = foldersMap.get(folderSufixes.mainDomainEntities);
        const mainDomainInterfacesFolder = foldersMap.get(folderSufixes.mainDomainInterfaces);
        const mainInterfacesFolder = foldersMap.get(folderSufixes.mainInterfaces);
        const mainUsecasesFolder = foldersMap.get(folderSufixes.mainUsecases);
        const mainProtocolsFolder = foldersMap.get(folderSufixes.mainProtocol);
        const adapterFolder = foldersMap.get(folderSufixes.adapter);
        const adapterConnectorsFolder = foldersMap.get(folderSufixes.adapterConnectors);
        const adapterDrivesFolder = foldersMap.get(folderSufixes.adapterDrives);
        const infraFolder = foldersMap.get(folderSufixes.infra);
        const infraDatasourcesFolder = foldersMap.get(folderSufixes.infraDatasources);
        const infraPresentationFolder = foldersMap.get(folderSufixes.infraPresentation);
        rootFolder.exportFile.setContentFromFileNames([
            this.getExportFileFullPath(mainFolder.folderName, mainFolder.exportName()),
            this.getExportFileFullPath(adapterFolder.folderName, adapterFolder.exportName()),
            this.getExportFileFullPath(infraFolder.folderName, infraFolder.exportName()),
        ]);
        mainFolder.exportFile.setContentFromFileNames([
            this.getExportFileFullPath(mainDomainFolder.folderName, mainDomainFolder.exportName()),
            this.getExportFileFullPath(mainInterfacesFolder.folderName, mainInterfacesFolder.exportName()),
            this.getExportFileFullPath(mainUsecasesFolder.folderName, mainUsecasesFolder.exportName()),
            this.getExportFileFullPath(mainProtocolsFolder.folderName, mainProtocolsFolder.exportName()),
        ]);
        mainDomainFolder.exportFile.setContentFromFileNames([
            this.getExportFileFullPath(mainDomainModelsFolder.folderName, mainDomainModelsFolder.exportName()),
            this.getExportFileFullPath(mainDomainEntitiesFolder.folderName, mainDomainEntitiesFolder.exportName()),
            this.getExportFileFullPath(mainDomainInterfacesFolder.folderName, mainDomainInterfacesFolder.exportName()),
        ]);
        mainDomainModelsFolder.exportFile.setContentFromFileNames(dataClassesMap.models.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        mainDomainEntitiesFolder.exportFile.setContentFromFileNames(dataClassesMap.entities.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        mainDomainInterfacesFolder.exportFile.setContentFromFileNames(dataClassesMap.domainInterface.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        mainProtocolsFolder.exportFile.setContentFromFileNames(functionallyClasses.protocols.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        mainUsecasesFolder.exportFile.setContentFromFileNames(functionallyClasses.usecases.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        mainInterfacesFolder.exportFile.setContentFromFileNames(functionallyClasses.interfaces.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        adapterFolder.exportFile.setContentFromFileNames([
            this.getExportFileFullPath(adapterConnectorsFolder.folderName, adapterConnectorsFolder.exportName()),
            this.getExportFileFullPath(adapterDrivesFolder.folderName, adapterDrivesFolder.exportName()),
        ]);
        adapterConnectorsFolder.exportFile.setContentFromFileNames(functionallyClasses.connectors.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        adapterDrivesFolder.exportFile.setContentFromFileNames(functionallyClasses.drives.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        infraFolder.exportFile.setContentFromFileNames([
            this.getExportFileFullPath(infraDatasourcesFolder.folderName, infraDatasourcesFolder.exportName()),
            this.getExportFileFullPath(infraPresentationFolder.folderName, infraPresentationFolder.exportName()),
        ]);
        infraDatasourcesFolder.exportFile.setContentFromFileNames(functionallyClasses.datasources.map((c) => this.getExportFileFullPathFromFiles(c.getFileName())));
        // infraPresentationFolder.exportFile.setContentFromFileNames(
        //   functionallyClasses..map(c => this.getExportFileFullPath(any, c.getFileName())
        // ),
        const exportFiles = [
            rootFolder.exportFile,
            mainFolder.exportFile,
            mainDomainFolder.exportFile,
            mainDomainModelsFolder.exportFile,
            mainDomainEntitiesFolder.exportFile,
            mainDomainInterfacesFolder.exportFile,
            mainProtocolsFolder.exportFile,
            mainUsecasesFolder.exportFile,
            mainInterfacesFolder.exportFile,
            adapterFolder.exportFile,
            adapterConnectorsFolder.exportFile,
            adapterDrivesFolder.exportFile,
            infraFolder.exportFile,
            infraDatasourcesFolder.exportFile,
        ];
        return exportFiles;
    }
    getExportFileFullPath(folderName, files) {
        return `./${folderName}/${files}`;
    }
    getExportFileFullPathFromFiles(file) {
        return `./${file}`;
    }
    /**
       
  
   *
   * @author Rafael S Pereira; @email: contato.dev.rafaelsp@gmail.com
   * @date 22/12/2020
   * @param {Map<string, FolderGen>} foldersMap
   * @param {Params} params
   * @param {ClassFileSufixes} classFileSufixes
   * @param {FolderSufixes} folderSufixes
   * @returns {*}  {{
   *     connectors: ClassBuilder[];
   *     datasources: ClassBuilder[];
   *     drives: ClassBuilder[];
   *     interfaces: ClassBuilder[];
   *     protocols: ClassBuilder[];
   *     usecases: ClassBuilder[];
   *   }}
   * @memberof CleanArchitectureGenerator
   */
    getFunctionallyClasses(foldersMap, params, classFileSufixes, folderSufixes) {
        const functionallyClasses = {
            connectors: new Array(),
            datasources: new Array(),
            drives: new Array(),
            interfaces: new Array(),
            protocols: new Array(),
            usecases: new Array(),
        };
        for (const usecaseBaseName of params.usecasesBaseName) {
            const mapFunctionallyClasses = aux_funtions_1.getFunctionallityClasses(usecaseBaseName, classFileSufixes, {
                connectorsFolder: foldersMap.get(folderSufixes.adapterConnectors),
                datasourcesFolder: foldersMap.get(folderSufixes.infraDatasources),
                driversFolder: foldersMap.get(folderSufixes.adapterDrives),
                interfaceFolder: foldersMap.get(folderSufixes.mainInterfaces),
                protocolsFolder: foldersMap.get(folderSufixes.mainProtocol),
                usecasesFolder: foldersMap.get(folderSufixes.mainUsecases),
            });
            functionallyClasses.connectors.push(mapFunctionallyClasses.connector);
            functionallyClasses.datasources.push(mapFunctionallyClasses.datasource);
            functionallyClasses.drives.push(mapFunctionallyClasses.drive);
            functionallyClasses.interfaces.push(mapFunctionallyClasses.interface);
            functionallyClasses.protocols.push(mapFunctionallyClasses.protocol);
            functionallyClasses.usecases.push(mapFunctionallyClasses.usecase);
        }
        return functionallyClasses;
    }
    getDataClassesClasseBuilder(folders, dataModelsBaseName, classFileSufixes, folderSufixes) {
        const dataClassesClassBuider = {
            entities: new Array(),
            models: new Array(),
            domainInterface: new Array(),
        };
        for (const dataClassBaseName of dataModelsBaseName) {
            const dataClasses = aux_funtions_1.getDataClasses(dataClassBaseName, classFileSufixes, {
                domainInterfaceFolder: folders.get(folderSufixes.mainDomainInterfaces),
                entitiesFolder: folders.get(folderSufixes.mainDomainEntities),
                modelsFolder: folders.get(folderSufixes.mainDomainModels),
            });
            dataClassesClassBuider.entities.push(dataClasses.entity);
            dataClassesClassBuider.models.push(dataClasses.model);
            dataClassesClassBuider.domainInterface.push(dataClasses.domainInterface);
        }
        return dataClassesClassBuider;
    }
    writeNewUsecase(params) {
        const folderSufixes = params.folderSufixes;
        const path = params.creationOptions.path;
        const classFileSufixes = params.fileSufixes;
        params_1.RootPath.I().name = params.moduleBaseName;
        const rootFolder = new folder_generator_1.FolderGen({
            nestedLevel: 0,
            folderName: params.getFolderName(),
            parent: null,
        });
        const foldersMap = new Map();
        foldersMap.set("root", rootFolder);
        this.getArchitectureFolders(rootFolder, folderSufixes).forEach((v, k) => foldersMap.set(k, v));
        const dataClasses = this.getDataClassesClasseBuilder(foldersMap, params.dataModelsBaseName, classFileSufixes, folderSufixes);
        this.writeClasses([
            ...dataClasses.models,
            ...dataClasses.entities,
            ...dataClasses.domainInterface,
        ]);
        const functionallyClasses = this.getFunctionallyClasses(foldersMap, params, classFileSufixes, folderSufixes);
        this.writeClasses([
            ...functionallyClasses.connectors,
            ...functionallyClasses.datasources,
            ...functionallyClasses.drives,
            ...functionallyClasses.interfaces,
            ...functionallyClasses.protocols,
            ...functionallyClasses.usecases,
        ]);
        const exportsFiles = this.getExportFilesContent(folderSufixes, foldersMap, functionallyClasses, dataClasses);
        exportsFiles.forEach((exportFile) => this.writeFile(exportFile));
    }
    getArchitectureFolders(rootFolder, folderSufixes) {
        const folders = new Map();
        const mainFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.main,
            parent: rootFolder,
        });
        folders.set(folderSufixes.main, mainFolder);
        const domainFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.mainDomain,
            parent: mainFolder,
        });
        folders.set(folderSufixes.mainDomain, domainFolder);
        const domainInterfaces = new folder_generator_1.FolderGen({
            nestedLevel: 3,
            folderName: folderSufixes.mainDomainInterfaces,
            parent: domainFolder,
        });
        folders.set(folderSufixes.mainDomainInterfaces, domainInterfaces);
        const entitiesFolder = new folder_generator_1.FolderGen({
            nestedLevel: 3,
            folderName: folderSufixes.mainDomainEntities,
            parent: domainFolder,
        });
        folders.set(folderSufixes.mainDomainEntities, entitiesFolder);
        const modelsFolder = new folder_generator_1.FolderGen({
            nestedLevel: 3,
            folderName: folderSufixes.mainDomainModels,
            parent: domainFolder,
        });
        folders.set(folderSufixes.mainDomainModels, modelsFolder);
        const interfaceFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.mainInterfaces,
            parent: mainFolder,
        });
        folders.set(folderSufixes.mainInterfaces, interfaceFolder);
        const usecasesFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.mainUsecases,
            parent: mainFolder,
        });
        folders.set(folderSufixes.mainUsecases, usecasesFolder);
        const protocolsFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.mainProtocol,
            parent: mainFolder,
        });
        folders.set(folderSufixes.mainProtocol, protocolsFolder);
        const adpterFolder = new folder_generator_1.FolderGen({
            nestedLevel: 1,
            folderName: folderSufixes.adapter,
            parent: rootFolder,
        });
        folders.set(folderSufixes.adapter, adpterFolder);
        const connectorsFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.adapterConnectors,
            parent: adpterFolder,
        });
        folders.set(folderSufixes.adapterConnectors, connectorsFolder);
        const drivesFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.adapterDrives,
            parent: adpterFolder,
        });
        folders.set(folderSufixes.adapterDrives, drivesFolder);
        const infraFolder = new folder_generator_1.FolderGen({
            nestedLevel: 1,
            folderName: folderSufixes.infra,
            parent: rootFolder,
        });
        folders.set(folderSufixes.infra, infraFolder);
        const datasourcesFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.infraDatasources,
            parent: infraFolder,
        });
        folders.set(folderSufixes.infraDatasources, datasourcesFolder);
        const presentationFolder = new folder_generator_1.FolderGen({
            nestedLevel: 2,
            folderName: folderSufixes.infraPresentation,
            parent: infraFolder,
        });
        folders.set(folderSufixes.infraPresentation, presentationFolder);
        return folders;
    }
    async writeClasses(classes) {
        for (const classe of classes) {
            await this.writeFile(classe.fileBuilder);
            console.log(`[writed] ${classe.fileBuilder.getCompleteFileName()}`);
        }
    }
    async writeFile(fileBuilder) {
        fs_1.default.writeFileSync(fileBuilder.getCompleteFileName(), fileBuilder.content);
    }
}
exports.CleanArchitectureGenerator = CleanArchitectureGenerator;
//# sourceMappingURL=clean_architecture_module_generator.js.map