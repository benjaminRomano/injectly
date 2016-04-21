'use strict';
var provider_1 = require('./provider');
var Injector = (function () {
    function Injector() {
        this.resolver = {};
    }
    Injector.prototype.resolve = function (name) {
        var _this = this;
        var provider = this.resolver[name];
        if (!provider) {
            throw new Error("Could not find provider for " + name);
        }
        if (provider.useValue) {
            return provider.useValue;
        }
        else if (provider.useExisting && provider.instance) {
            return provider.instance;
        }
        var instance;
        var dependencies = provider.dependencies.map(function (d) {
            return _this.resolve(d);
        });
        if (provider.useExisting) {
            instance = new ((_a = provider.useExisting).bind.apply(_a, [void 0].concat(dependencies)))();
            provider.instance = instance;
        }
        else if (provider.useFactory) {
            instance = provider.useFactory.apply(provider, dependencies);
        }
        else if (provider.useClass) {
            instance = new ((_b = provider.useClass).bind.apply(_b, [void 0].concat(dependencies)))();
        }
        else {
            throw new Error("Provider " + name + " is improperly formatted");
        }
        return instance;
        var _a, _b;
    };
    Injector.prototype.inject = function (dependencyNames, callback) {
        var _this = this;
        var dependencies = dependencyNames.map(function (d) {
            return _this.resolve(d);
        });
        callback.apply(void 0, dependencies);
    };
    Injector.prototype.bindProvider = function (provider) {
        this.resolver[provider.name] = provider;
    };
    Injector.prototype.bind = function (name, dependencies, config) {
        var _this = this;
        config = config || {};
        var provider = new provider_1.Provider(name, {
            dependencies: dependencies
        });
        return function (target) {
            if (config.useExisting) {
                provider.useExisting = target;
            }
            else {
                provider.useClass = target;
            }
            _this.bindProvider(provider);
        };
    };
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map