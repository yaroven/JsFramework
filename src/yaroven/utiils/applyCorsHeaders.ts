import { IncomingMessage, ServerResponse } from "http";
import CorsOptions from "../interfaces/CorsOptions";

export function applyCorsHeaders(
  req: IncomingMessage,
  res: ServerResponse,
  corsPolicy: CorsOptions,
): boolean {
  const requestOrigin = req.headers.origin;

  if (requestOrigin) {
    if (Array.isArray(corsPolicy.origin)) {
      if (corsPolicy.origin.includes(requestOrigin)) {
        res.setHeader("Access-Control-Allow-Origin", requestOrigin);
      }
    } else {
      res.setHeader("Access-Control-Allow-Origin", corsPolicy.origin!);
    }

    if (corsPolicy.credentials) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (corsPolicy.exposedHeaders!.length > 0) {
      res.setHeader(
        "Access-Control-Expose-Headers",
        corsPolicy.exposedHeaders!.join(", "),
      );
    }
  }

  if (req.method === "OPTIONS") {
    const methods = Array.isArray(corsPolicy.methods)
      ? corsPolicy.methods.join(",")
      : corsPolicy.methods;

    const allowedHeaders =
      corsPolicy.allowedHeaders!.length > 0
        ? corsPolicy.allowedHeaders!.join(",")
        : (req.headers["access-control-request-headers"] as string) || "";

    res.setHeader("Access-Control-Allow-Methods", methods!);
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders);
    res.setHeader("Access-Control-Max-Age", corsPolicy.maxAge!.toString());
    res.writeHead(corsPolicy.optionsSuccessStatus || 204);
    res.end();
    return true;
  }

  return false;
}
