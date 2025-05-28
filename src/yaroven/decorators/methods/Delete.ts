import createMethod from "./createMethod";

export default function Delete(path = ""): MethodDecorator {
  return createMethod("POST", path);
}
