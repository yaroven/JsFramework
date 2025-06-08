import { HttpMethods } from "../../enums/HttpMethods";
import createMethod from "./createMethod";

export default function Get(path = ""): MethodDecorator {
  return createMethod(HttpMethods.GET, path);
}
