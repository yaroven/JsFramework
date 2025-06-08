export interface ExecutionContext {
  request: any;
  response: any;
  handler: string;
  controller: new (...args: any[]) => any;
}
