import { routes } from "../YarovenFactory";

export default function Get(path = ""): MethodDecorator {
    return (target: any, propertyKey: any) => {
        routes.push({ method: "GET", path, handler: propertyKey, target: target.constructor })
    }
}