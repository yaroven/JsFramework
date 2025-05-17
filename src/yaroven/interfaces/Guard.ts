import { ExecutionContext } from "../ExecutionContext";

export interface Guard {
    canActivate(context: ExecutionContext): boolean
}