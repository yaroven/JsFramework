import { HttpMethods } from "../../enums/HttpMethods";

export default function createMethod(method: HttpMethods, path: string) {
  return (target: Object, propertyKey: any) => {
    const controllerClass = target.constructor;

    const existingRoutes = Reflect.getMetadata("routes", controllerClass) || [];

    existingRoutes.push({
      method: method,
      path,
      handler: propertyKey,
    });

    Reflect.defineMetadata("routes", existingRoutes, controllerClass);
  };
}
