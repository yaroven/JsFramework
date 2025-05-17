import { Guard } from "../interfaces/Guard"
import { GUARD_KEY } from "../config"
export function useGuards(...guards: { new(...args: any[]): Guard }[]) {
    return (target: any, propertyKey?: any) => {
        if (propertyKey)
            Reflect.defineMetadata(GUARD_KEY, guards, target, propertyKey)
        else
            Reflect.defineMetadata(GUARD_KEY, guards, target)
    }
}