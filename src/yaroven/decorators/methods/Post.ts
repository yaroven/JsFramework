import { HttpMethods } from "../../enums/HttpMethods";
import createMethod from "./createMethod";

export default function Post(path = ""): MethodDecorator {
  return createMethod(HttpMethods.POST, path);
}
