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
