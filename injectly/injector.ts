
'use strict';

class Injector {

    private resolver: { [name: string]: IProvider };

    constructor() {
        this.resolver = {};
    }

    resolve<T>(name: string): T {
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

    inject(dependencyNames: string[], callback) {
        
        let dependencies = dependencyNames.map(d => {
            return this.resolve(d);
        });
        
        callback(...dependencies);
    }

    bind(provider) {
        this.resolver[provider.name] = provider;
    }
}

export let injector: IInjector = new Injector();

