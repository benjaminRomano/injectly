# Injectly

Injectly is a lightweight dependency injector based on Angular 2's dependency injection system.


Similar to angular, Injectly uses providers to store different types of values into the DI container.
Injectly supports classes, factory functions and arbitrary values.


### Injector API
``` ts 
bind(name: string, provider: Provider);
resolve<T>(name: string): T;
inject(dependencyNames: string[], callback: any;
```

### Values
``` ts
import {Injector} from 'injectly';

Injector.bind(new Provider('Value', {
    useValue: "Hello World"
}));

Injector.bind(new Provider('function', {
    useValue: () => { return 5; }
}));
```

### Factories
``` ts

import {Provider} from 'injectly';

Injector.bind(new Provider('LogFactory', {
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

@Injectable('A', [])
class A {
    constructor() {
        console.log('A was instantiated');
    }
}

// Create singletons by specifiying useExisting
@Injectable('B', ['A'], { useExisting: true })
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

Injector.bind(new Provider('A', {
    useClass: A
}));

class B {
    constructor(a: A) {
        console.log('Test was instantiated with', A);
    }
}

Injector.bind(new Provider('B', {
    dependencies: ['A'],
    useExisting: B
}));
```

### Retrieving
```ts

// Get dependency from container
let B = Injector.resolve<B>('B');

// Inject dependencies into a callback
Injector.inject(['A', 'B'], (a, b) => {
    console.log(a); // A { }
    console.log(b); // B { }
});

```
