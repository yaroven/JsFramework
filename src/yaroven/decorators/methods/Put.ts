import createMethod from "./createMethod";

export default function Put(path = ""): MethodDecorator {
  return createMethod("PUT", path);
}
