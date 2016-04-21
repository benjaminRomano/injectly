'use strict';
var Provider = (function () {
    function Provider(name, config) {
        this.name = name;
        this.useClass = config.useClass;
        this.useExisting = config.useExisting;
        this.useValue = config.useValue;
        this.useFactory = config.useFactory;
        this.dependencies = config.dependencies || [];
    }
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map