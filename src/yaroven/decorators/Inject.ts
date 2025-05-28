// import { Container } from "../Container";

// export function Inject(): PropertyDecorator {
// 	return function (target: any, propertyKey: string | symbol) {
// 		const type = Reflect.getMetadata("design:type", target, propertyKey);
// 		Object.defineProperty(target, propertyKey, {
// 			get() {
// 				return Container.resolve(type);
// 			},
// 			enumerable: true,
// 			configurable: true,
// 		});
// 	};
// }
