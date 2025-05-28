import { ParameterDecoratorEnum } from "../../enums/ParameterDecoratorsEnum";
import createParameterDecorator from "./createParameterDecorator";

export default function Body(key?: string) {
  return createParameterDecorator(ParameterDecoratorEnum.BODY, key);
}
