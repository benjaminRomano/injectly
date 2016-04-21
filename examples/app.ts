
'use strict';

import {Injector, Provider} from './injectly/injectly';

let injector = new Injector();

injector.bindProvider(new Provider('TestValue', {
    useValue: 'Hello World',
}));

injector.bindProvider(new Provider('PrintFactory', {
    useFactory: (value) => { console.log(`Print Factory: ${value}`); return value; },
    dependencies: ['TestValue']
}));

injector.inject(['PrintFactory'], (value) => {
    console.log(value);
});

@injector.bind('Test', ['A', 'B', 'C'], { useExisting: true })
class Test {
    constructor(a, b, c) {
        console.log('Test was instantiated with', a, b, c);
    }
}

@injector.bind('A', [])
class A {
    constructor() {
        console.log('A was instantiated');
    }
}

@injector.bind('B', [])
class B {
    constructor() {
        console.log('B was instantiated');
    }
}

@injector.bind('C', [])
class C {
    constructor() {
        console.log('C was instantiated');
    }
}

injector.resolve<Test>('Test');

injector.inject(['A', 'Test'], (a, t) => console.log(a, t));
