import { PARAMS_KEY } from "../../config";

export default function createParameterDecorator(type: string, key?: string) {
	return (
		target: Object,
		propertyKey: string | symbol,
		parameterIndex: number,
	) => {
		const existingParams: any[] =
			Reflect.getOwnMetadata(PARAMS_KEY, target.constructor, propertyKey) || [];

		existingParams.push({ index: parameterIndex, type, key });
		Reflect.defineMetadata(PARAMS_KEY, existingParams, target.constructor, propertyKey);
	};
}
