import { ExecutionContext } from "../interfaces/ExecutionContext";
import { Route } from "../interfaces/Route";
import { getInterceptors } from "../utiils/getInterceptors";

export class InterceptorExecutor {
  static async run(context: ExecutionContext, next: Function) {
    const interceptors = getInterceptors(
      context.controller,
      context.handler,
    ).map((Interceptor) => new Interceptor());

    let index = -1;

    const invokeNext = async (): Promise<any> => {
      index++;
      if (index < interceptors.length) {
        return await interceptors[index].intercept(context, invokeNext);
      }
      return await next();
    };
    return invokeNext();
  }
}
