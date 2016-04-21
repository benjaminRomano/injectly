export declare class Injector {
    private resolver;
    constructor();
    resolve<T>(name: string): T;
    inject(dependencyNames: string[], callback: any): void;
    bindProvider(provider: IProvider): void;
    bind(name: string, dependencies: string[], config?: IInjectableConfig): (target: Function) => void;
}
