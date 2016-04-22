import { IProvider } from './provider';
export interface IInjectableConfig {
    useExisting?: boolean;
}
export interface IInjector {
    bind(name: string, dependencies: string[], config?: IInjectableConfig): any;
    bindProvider(provider: IProvider): any;
    inject(dependencyNames: string[], callback: any): any;
    resolve<T>(name: string): T;
}
export interface IResolver {
    [name: string]: IProvider;
}
export declare class Injector implements IInjector {
    private resolver;
    constructor();
    resolve<T>(name: string): T;
    inject(dependencyNames: string[], callback: any): void;
    bindProvider(provider: IProvider): void;
    bind(name: string, dependencies: string[], config?: IInjectableConfig): (target: Function) => void;
}
