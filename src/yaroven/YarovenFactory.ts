import { Container } from "./Container";
import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { ModuleMetadata } from "./decorators/Module";

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
	handleRoutes(req: any, res: ServerResponse) {
		const parsedUrl = url.parse(req.url, true);
		const method = req.method;
		const pathname = parsedUrl.pathname;
		for (const route of routes) {
			if (route.method === method && route.path === pathname) {
				const ControllerClass = route.target;
				const controllerInstance: any[] = Container.resolve(ControllerClass);

				const result = controllerInstance[route.handler](req, res);

				if (!res.writableEnded) {
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify(result));
				}
				return;
			}
		}
		res.writeHead(404);
		res.end("Not found");
	}
}