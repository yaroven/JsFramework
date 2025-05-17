import { INTERCEPTOR_KEY } from "./config"

export function getInterceptors(target: any, propertyKey: string) {
    const classInterceptors = Reflect.getMetadata(INTERCEPTOR_KEY, target) || [];
    const methodInterceptors = Reflect.getMetadata(INTERCEPTOR_KEY, target.prototype, propertyKey) || [];
    return [...classInterceptors, ...methodInterceptors]
}