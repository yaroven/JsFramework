import { PARAMS_KEY } from "../core/config";
import { ParameterDecoratorEnum } from "../enums/ParameterDecoratorsEnum";
import { ExecutionContext } from "../interfaces/ExecutionContext";

export default function getParameters(context: ExecutionContext) {
  const { controller, handler, request, response } = context;
  let paramMetadata: any[] =
    Reflect.getOwnMetadata(PARAMS_KEY, controller, handler) || [];
  paramMetadata.sort((param1, param2) => param1.index - param2.index);
  const rawBody = request.body;
  const parsedBody = rawBody ? JSON.parse(rawBody) : rawBody;
  return paramMetadata.map((param) => {
    const key = param.key;
    switch (param.type) {
      case ParameterDecoratorEnum.BODY:
        return key ? parsedBody[key] : parsedBody;
      case ParameterDecoratorEnum.RAW_BODY:
        return rawBody;
      case ParameterDecoratorEnum.REQUEST:
        return key ? request[key] : request;
      case ParameterDecoratorEnum.RESPOSE:
        return key ? response[key] : response;
    }
  });
}
