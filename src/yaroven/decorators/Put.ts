import { routes } from "../YarovenFactory";

export default function Put(path = ""): MethodDecorator {
    return (target: any, propertyKey: any) => {
        routes.push({ method: "PUT", path, handler: propertyKey, target: target.constructor })
    }
}