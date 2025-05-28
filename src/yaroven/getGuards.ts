import { GUARD_KEY } from "./config";

export function getGuards(target: any, propertyKey: any) {
  const classGuards = Reflect.getMetadata(GUARD_KEY, target) || [];
  const methodGuards =
    Reflect.getMetadata(GUARD_KEY, target.prototype, propertyKey) || [];
  return [...classGuards, ...methodGuards];
}
