import { ParameterDecoratorEnum } from "../../enums/ParameterDecoratorsEnum";
import createParameterDecorator from "./createParameterDecorator";

export default function RawBody(){
    return createParameterDecorator(ParameterDecoratorEnum.RAW_BODY)
}