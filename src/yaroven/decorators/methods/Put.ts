import { HttpMethods } from "../../enums/HttpMethods";
import createMethod from "./createMethod";

export default function Put(path = ""): MethodDecorator {
  return createMethod(HttpMethods.PUT, path);
}
