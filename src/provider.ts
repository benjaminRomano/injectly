
'use strict';

export interface IProviderConfig {
    useClass?: any;
    useExisting?: any;
    useValue?: any;
    useFactory?: any;
    dependencies?: string[];
}

export interface IProvider {
    useClass: any;
    useExisting: any;
    useValue: any;
    useFactory: any;
    dependencies: string[];
    instance: any;
    name: string;
}

export class Provider implements IProvider {
    
    public useClass: any;
    public useExisting: any;
    public useValue: any;
    public useFactory: any;
    public dependencies: string[];
    public instance: any;
    
    constructor(public name: string, config: IProviderConfig) {
        this.useClass = config.useClass;
        this.useExisting = config.useExisting;
        this.useValue = config.useValue;
        this.useFactory = config.useFactory;
        this.dependencies = config.dependencies || [];
    }
}
