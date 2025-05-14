import { Container, ModuleMetadata } from "./main";
const controllerInstances = new Map<any, any>();

export default class YarovenFactory {
	create(target: new (...args: any[]) => any) {
		const imports = ModuleMetadata.get(target).imports;

		imports.forEach((element: new (...args: any[]) => unknown) => {
			const instance = Container.resolve(element);
			controllerInstances.set(element, instance);
		});
		return{
            getController: <T>(target: new(...args:any[]) => T):T => controllerInstances.get(target), 
        };
	}
}
