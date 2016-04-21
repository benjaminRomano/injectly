declare module "provider" {
    export class Provider implements IProvider {
        name: string;
        useClass: any;
        useExisting: any;
        useValue: any;
        useFactory: any;
        dependencies: string[];
        instance: any;
        constructor(name: string, config: IProviderConfig);
    }
}
declare module "injector" {
    export class Injector {
        private resolver;
        constructor();
        resolve<T>(name: string): T;
        inject(dependencyNames: string[], callback: any): void;
        bindProvider(provider: IProvider): void;
        bind(name: string, dependencies: string[], config?: IInjectableConfig): (target: Function) => void;
    }
}
declare module "injectly" {
    import { Injector } from "injector";
    import { Provider } from "provider";
    export { Injector, Provider };
}
interface IProviderConfig {
    useClass?: any;
    useExisting?: any;
    useValue?: any;
    useFactory?: any;
    dependencies?: string[];
}
interface IProvider {
    useClass: any;
    useExisting: any;
    useValue: any;
    useFactory: any;
    dependencies: string[];
    instance: any;
    name: string;
}
interface IInjector {
    bind(provider: IProvider): any;
    inject(dependencyNames: string[], callback: any): any;
    resolve<T>(name: string): T;
}
interface IInjectableConfig {
    useExisting?: boolean;
}
