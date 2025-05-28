import createMethod from "./createMethod";

export default function Get(path = ""): MethodDecorator {
  return createMethod("GET", path);
}
