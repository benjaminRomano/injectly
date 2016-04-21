
'use strict';

import {injector} from './injector';
import {Provider} from './provider';

export function Injectable(name: string, dependencies: string[], config?: IInjectableConfig) {
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
        
        injector.bind(provider);
    };
}
