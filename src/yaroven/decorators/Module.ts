export const ModuleMetadata = new Map();

export default function Module(payload: {
  imports?: Array<new (...args: any) => any>;
  controllers?: Array<new (...args: any) => any>;
  providers?: Array<new (...args: any) => any>;
}) {
  return function (target: any) {
    ModuleMetadata.set(target, payload);
  };
}
