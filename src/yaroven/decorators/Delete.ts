import { routes } from "../YarovenFactory";

export default function Delete(path = ""): MethodDecorator {
  return (target: any, propertyKey: any) => {
    routes.push({
      method: "DELETE",
      path,
      handler: propertyKey,
      target: target.constructor,
    });
  };
}
