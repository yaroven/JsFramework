import "reflect-metadata";

export class Container {
  private static instances = new Map();

  static resolve<T>(target: new (...args: any[]) => T): T {
    if (this.instances.has(target)) {
      return this.instances.get(target);
    }
    const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = tokens.map((token: any) => Container.resolve(token));

    const instance = new target(...injections);
    this.instances.set(target, instance);
    return instance;
  }
}
