
'use strict';

import {Injector, Injectable, Provider} from './injectly/injectly';

Injector.bind(new Provider('TestValue', {
    useValue: "Hello World",
}));

Injector.bind(new Provider('PrintFactory', {
    useFactory: (value) => { console.log(`Print Factory: ${value}`); return value; },
    dependencies: ['TestValue']
}));

Injector.inject(['PrintFactory'], (value) => { 
    console.log(value); });

@Injectable('Test', ['A', 'B', 'C'], { useExisting: true })
class Test {
    constructor(a, b, c) {
        console.log('Test was instantiated with', a, b, c);
    }
}

@Injectable('A', [])
class A {
    constructor() {
        console.log('A was instantiated');
    }
}

@Injectable('B', [])
class B {
    constructor() {
        console.log('B was instantiated');
    }
}

@Injectable('C', [])
class C {
    constructor() {
        console.log('C was instantiated');
    }
}

let test = Injector.resolve<Test>('Test');

Injector.inject(['A', 'Test'], (a, t) => console.log(a,t));
