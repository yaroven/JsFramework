import { ServerResponse } from "http";

export class ResponseHandler {
  static send(res: ServerResponse, data: any, status: number = 200) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }

  static notFound(res: ServerResponse) {
    res.writeHead(404);
    res.end("Not found");
  }

  static forbidden(res: ServerResponse) {
    res.writeHead(403);
    res.end("Forbidden");
  }
}
