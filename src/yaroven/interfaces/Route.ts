import { HttpMethods } from "../enums/HttpMethods";

export interface Route {
  method: HttpMethods;
  path: string;
  handler: string;
  controller: new (...args: any[]) => any;
}
