import { Interceptor } from "../interfaces/Interceptor";
import { INTERCEPTOR_KEY } from "../config";

export function useInterceptors(
  ...interceptors: { new (...args: any[]): Interceptor }[]
) {
  return (target: any, propertyKey?: any) => {
    if (propertyKey) {
      Reflect.defineMetadata(
        INTERCEPTOR_KEY,
        interceptors,
        target,
        propertyKey,
      );
    } else {
      Reflect.defineMetadata(INTERCEPTOR_KEY, interceptors, target);
    }
  };
}
