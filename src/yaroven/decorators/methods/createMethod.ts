import { routes } from "../../core/YarovenFactory";

export default function createMethod(method: string, path: string) {
  return (target: any, propertyKey: any) => {
    routes.push({
      method,
      path,
      handler: propertyKey,
      target: target.constructor,
    });
  };
}
