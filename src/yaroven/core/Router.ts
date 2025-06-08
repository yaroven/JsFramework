import { HttpMethods } from "../enums/HttpMethods";
import { Route } from "../interfaces/Route";

export class Router {
  private static routes: Route[] = [];
  static register(route: Route) {
    this.routes.push(route);
  }

  static findRoute(method: HttpMethods, path: string): Route | undefined {
    return this.routes.find(
      (route) => route.method === method && route.path === path,
    );
  }

  static getRoutes(): Route[] {
    return this.routes;
  }
}
