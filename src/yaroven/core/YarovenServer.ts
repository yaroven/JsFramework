import http, { IncomingMessage, ServerResponse } from "http";
import url from "url";
import { ExecutionContext } from "../interfaces/ExecutionContext";
import getParameters from "../utiils/getParametes";
import { Container } from "./Container";
import { GuardExecutor } from "./GuardExecutor";
import { InterceptorExecutor } from "./InterceptorExecutor";
import { ResponseHandler } from "./ResponseHandler";
import { Router } from "./Router";
import CorsOptions from "../interfaces/CorsOptions";
import { applyCorsHeaders } from "../utiils/applyCorsHeaders";

export default class YarovenServer {
  private server: http.Server;
  private corsPolicy: CorsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Access-Control-Request-Headers"],
    exposedHeaders: [],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 0,
  };
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  listen(port = 3000, hostname = "localhost", callback?: () => void): void {
    this.server.listen(port, hostname, () => {
      console.log(`🚀 YarovenServer is running at http://${hostname}:${port}`);
      callback?.();
    });
  }
  enableCors(options?: CorsOptions) {
    this.corsPolicy = { ...this.corsPolicy, ...options };
  }
  private handleRequest(req: any, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk: any) => (body += chunk));
    req.on("end", () => {
      req.body = body;
      const isPreflightHandled = applyCorsHeaders(req, res, this.corsPolicy);
      if (isPreflightHandled) return;
      this.handleRoutes(req, res);
    });
  }
  async handleRoutes(req: any, res: ServerResponse) {
    const parsedUrl = url.parse(req.url, true);
    const route = Router.findRoute(req.method, parsedUrl.pathname || "");
    if (!route) return ResponseHandler.notFound(res);

    const context: ExecutionContext = {
      request: req,
      response: res,
      handler: route.handler,
      controller: route.controller,
    };
    const canActivate = await GuardExecutor.run(context);
    if (!canActivate) return ResponseHandler.forbidden(res);
    if (!res.writableEnded) {
      const controllerInstance = Container.resolve(route.controller);

      const result = await InterceptorExecutor.run(context, async () => {
        const args = getParameters(context);
        return await controllerInstance[route.handler](...args);
      });

      if (!res.writableEnded && result !== undefined) {
        return ResponseHandler.send(res, result);
      }
    }
    return ResponseHandler.notFound(res);
  }
}
