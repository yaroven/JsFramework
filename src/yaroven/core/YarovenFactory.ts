import { ModuleLoader } from "./ModuleLoader";
import YarovenServer from "./YarovenServer";

export default class YarovenFactory {
  static create(target: new (...args: any[]) => any) {
    ModuleLoader.loadModule(target);
    return new YarovenServer();
  }
}
