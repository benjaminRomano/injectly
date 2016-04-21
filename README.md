# Injectly

Injectly is a lightweight dependency injector based on Angular 2's dependency injection system.


Similar to angular, Injectly uses providers to store different types of values into the DI container.
Injectly supports classes, factory functions and arbitrary values.


### Injector API
``` ts 
bindProvider(provider: Provider);
bind(name: string, dependencies: string[], config?: IInjectableConfig);
resolve<T>(name: string): T;
inject(dependencyNames: string[], callback: any;
```

### Values
``` ts
import {Injector} from 'injectly';

let injector = new Injector();

injector.bindProvider(new Provider('Value', {
    useValue: "Hello World"
}));

injector.bindProvider(new Provider('function', {
    useValue: () => { return 5; }
}));
```

### Factories
``` ts

import {Provider} from 'injectly';

injector.bindProvider(new Provider('LogFactory', {
    dependencies: ['Value'],
    useFactory: (value) => {
        console.log(`LogFactory: ${value}`); // Hello World
        return value;
    }
}));

```

### Classes
``` ts

import {Injectable} from 'injectly';

// Using decorators

@injector.bind('A', [])
class A {
    constructor() {
        console.log('A was instantiated');
    }
}

// Create singletons by specifiying useExisting
@injector.bind('B', ['A'], { useExisting: true })
class B {
    constructor(a: A) {
        console.log('Test was instantiated with', A);
    }
}

// Without decorators

class A {
    constructor() {
        console.log('A was instantiated');
    }
}

injector.bindProvider(new Provider('A', {
    useClass: A
}));

class B {
    constructor(a: A) {
        console.log('Test was instantiated with', A);
    }
}

injector.bindProvider(new Provider('B', {
    dependencies: ['A'],
    useExisting: B
}));
```

### Retrieving
```ts

// Get dependency from container
let B = injector.resolve<B>('B');

// Inject dependencies into a callback
injector.inject(['A', 'B'], (a, b) => {
    console.log(a); // A { }
    console.log(b); // B { }
});

```
