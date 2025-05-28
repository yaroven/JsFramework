import { routes } from "../YarovenFactory";

export default function Post(path = ""): MethodDecorator {
    return (target: any, propertyKey: any) => {
        routes.push({ method: "POST", path, handler: propertyKey, target: target.constructor })
    }
}