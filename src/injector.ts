
'use strict';

import {Provider, IProvider} from './provider';

export interface IInjectableConfig {
    useExisting?: boolean;
}

export interface IInjector {
    bind(name: string, dependencies: string[], config?: IInjectableConfig);
    bindProvider(provider: IProvider);
    inject(dependencyNames: string[], callback: any);
    resolve<T>(name: string): T;
}

export interface IResolver {
    [name: string]: IProvider;
}

export class Injector implements IInjector {

    private resolver: IResolver;

    constructor() {
        this.resolver = {};
    }

    public resolve<T>(name: string): T {
        let provider = this.resolver[name];

        if (!provider) {
            throw new Error(`Could not find provider for ${name}`);
        }

         if (provider.useValue) {
            return provider.useValue;
        } else if (provider.useExisting && provider.instance) {
            return provider.instance;
        }
        
        let instance;
        
        let dependencies = provider.dependencies.map(d => {
            return this.resolve(d);
        });
            
        if (provider.useExisting) {
            instance = new provider.useExisting(...dependencies);
            provider.instance = instance;
        } else if (provider.useFactory) {
            instance = provider.useFactory(...dependencies);
        } else if (provider.useClass) {
            instance = new provider.useClass(...dependencies);
        } else {
            throw new Error(`Provider ${name} is improperly formatted`);
        }
        
        return instance;
    }

    public inject(dependencyNames: string[], callback) {

        let dependencies = dependencyNames.map(d => {
            return this.resolve(d);
        });

        callback(...dependencies);
    }

    public bindProvider(provider: IProvider) {
        this.resolver[provider.name] = provider;
    }

    public bind(name: string, dependencies: string[], config?: IInjectableConfig) {
        config = config || {};

        let provider = new Provider(name, {
            dependencies: dependencies
        });

        return (target: Function) => {
            if (config.useExisting) {
                provider.useExisting = target;
            } else {
                provider.useClass = target;
            }

            this.bindProvider(provider);
        };
    }
}
