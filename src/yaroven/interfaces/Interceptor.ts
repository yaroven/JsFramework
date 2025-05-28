import { ExecutionContext } from "../ExecutionContext";

export interface Interceptor {
  intercept(context: ExecutionContext, next: () => Promise<any>): Promise<any>;
}
