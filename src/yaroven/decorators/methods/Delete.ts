import { HttpMethods } from "../../enums/HttpMethods";
import createMethod from "./createMethod";

export default function Delete(path = ""): MethodDecorator {
  return createMethod(HttpMethods.DELETE, path);
}
