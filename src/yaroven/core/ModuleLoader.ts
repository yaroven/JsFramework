import { Container } from "./Container";
import { ModuleMetadata } from "../decorators/Module";

export class ModuleLoader {
  static loadModule(target: new (...args: any[]) => any) {
    const metadata = ModuleMetadata.get(target);
    if (!metadata) {
      throw new Error(`Module ${target.name} is missing @Module decorator`);
    }

    (metadata.imports || []).forEach((importedModule: any) => {
      this.loadModule(importedModule);
    });

    (metadata.controllers || []).forEach((controller: any) => {
      Container.resolve(controller);
    });

    (metadata.providers || []).forEach((provider: any) => {
      Container.resolve(provider);
    });
  }
}
