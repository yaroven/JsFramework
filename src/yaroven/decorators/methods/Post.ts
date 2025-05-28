import createMethod from "./createMethod";

export default function Post(path = ""): MethodDecorator {
  return createMethod("POST", path);
}
