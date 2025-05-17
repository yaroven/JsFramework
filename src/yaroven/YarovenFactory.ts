import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { Container } from "./Container";
import { ModuleMetadata } from "./decorators/Module";
import { ExecutionContext } from "./ExecutionContext";
import { getGuards } from "./getGuards";
import { getInterceptors } from "./getInterceptors";

export const routes: any[] = [];
const controllerInstances = new Map<any, any>();

export default class YarovenFactory {
	static create(target: new (...args: any[]) => any) {
		const imports = ModuleMetadata.get(target).imports;

		imports.forEach((element: new (...args: any[]) => unknown) => {
			const instance = Container.resolve(element);
			controllerInstances.set(element, instance);
		});
		return new YarovenServer();
	}
}

class YarovenServer {
	private port: unknown;
	private hostname: unknown;
	private server: http.Server;
	constructor(private callback?: (req: IncomingMessage, res: ServerResponse) => void) {
		this.server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
			this.handleRoutes(req, res);
		});
	}
	listen(port = 3000, hostname = "localhost", callback?: () => void): void {
		this.port = port;
		this.hostname = hostname;
		this.server.listen(port, hostname, () => {
			console.log(`🚀 YarovenServer is running at http://${hostname}:${port}`)
			if (callback) callback();
		})
	}
	async handleRoutes(req: any, res: ServerResponse) {
		const parsedUrl = url.parse(req.url, true);
		const method = req.method;
		const pathname = parsedUrl.pathname;

		for (const route of routes) {
			if (route.method === method && route.path === pathname) {
				const ControllerClass = route.target;
				const controllerInstance: any = Container.resolve(ControllerClass);
				const executionContext = {
					args: { req, res },
					handler: route.handler,
					controller: ControllerClass
				};
				const canActivate = await this.executeGuards(ControllerClass, route.handler, executionContext);
				if (!canActivate) {
					res.statusCode = 403;
					res.end("Forbidden");
					return;
				}
				const result = await this.executeInterceptors(ControllerClass, route.handler, controllerInstance, executionContext);

				if (!res.writableEnded && result !== undefined) {
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify(result));
				}
				return;
			}
		}

		res.writeHead(404);
		res.end("Not found");
	}
	private async executeGuards(controllerClass: any, handler: any, context: ExecutionContext) {
		const guards = getGuards(controllerClass, handler).map((GuardClass: any) => new GuardClass());
		for (const guard of guards) {
			const canActivate = await guard.canActivate(context);
			if (!canActivate) return false;
		}
		return true;
	}

	private async executeInterceptors(controllerClass: any, handler: any, controllerInstance: any, context: ExecutionContext) {
		const interceptors = getInterceptors(controllerClass, handler)
			.map((InterceptorClass: any) => new InterceptorClass());
		let interceptorIndex = -1;

		const next = async (): Promise<any> => {
			interceptorIndex++;
			if (interceptorIndex < interceptors.length) {
				return await interceptors[interceptorIndex].intercept(context, next);
			}
			//@ts-ignore
			return await controllerInstance[handler](context.args.req, context.args.res);
		};
		return next();
	}
}