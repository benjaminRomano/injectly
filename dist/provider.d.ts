export declare class Provider implements IProvider {
    name: string;
    useClass: any;
    useExisting: any;
    useValue: any;
    useFactory: any;
    dependencies: string[];
    instance: any;
    constructor(name: string, config: IProviderConfig);
}
