import { getGuards } from "../utiils/getGuards";
import { ExecutionContext } from "../interfaces/ExecutionContext";
import { Route } from "../interfaces/Route";

export class GuardExecutor {
  static async run(context: ExecutionContext): Promise<boolean> {
    const guards = getGuards(context.controller, context.handler).map(
      (GuardClass: any) => new GuardClass(),
    );

    for (const guard of guards) {
      const canActivate = await guard.canActivate(context);
      if (!canActivate) return false;
    }
    return true;
  }
}
