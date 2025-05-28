import { routes } from "../core/YarovenFactory";

export default function Controller(basePath = ""): ClassDecorator {
  return (target: any) => {
    routes.forEach((route) => {
      if (route.target === target) route.path = basePath + route.path;
    });
  };
}
