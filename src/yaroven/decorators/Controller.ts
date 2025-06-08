import { Router } from "../core/Router";

export default function Controller(prefix = ""): any {
  return (target: new (...args: any[]) => any) => {
    Reflect.defineMetadata("prefix", prefix, target);

    const routes = Reflect.getMetadata("routes", target) || [];

    routes.forEach((route: any) => {
      const fullPath = `${prefix}${route.path}`.replace(/\/+/g, "/");

      Router.register({
        method: route.method,
        path: fullPath,
        handler: route.handler,
        controller: target,
      });
    });
  };
}
