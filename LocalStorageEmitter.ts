"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var LocalStorageEmitter = (function () {
    function LocalStorageEmitter() {
    }
    LocalStorageEmitter.register = function (ngZone) {
        LocalStorageEmitter.subscribed[ngZone] = ngZone.onTurnDone.subscribe(function () {
            for (var _i = 0, _a = LocalStorageEmitter.subscribers; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback();
            }
        });
    };
    LocalStorageEmitter.subscribe = function (callback) {
        LocalStorageEmitter.subscribers.push(callback);
    };
    LocalStorageEmitter.unregister = function (ngZone) {
        LocalStorageEmitter.subscribed[ngZone].unsubscribe();
    };
    LocalStorageEmitter.subscribed = {};
    LocalStorageEmitter.subscribers = [];
    return LocalStorageEmitter;
}());
exports.LocalStorageEmitter = LocalStorageEmitter;
var LocalStorageService = (function () {
    function LocalStorageService(ngZone) {
        this.ngZone = ngZone;
        LocalStorageEmitter.register(this.ngZone);
    }
    LocalStorageService.prototype.ngOnDestroy = function () {
        LocalStorageEmitter.unregister(this.ngZone);
    };
    LocalStorageService = __decorate([
        core_1.Injectable()
    ], LocalStorageService);
    return LocalStorageService;
}());
function LocalStorageSubscriber(appPromise) {
    appPromise.then(function (bla) {
        console.log('app booted', bla);
        console.log(bla.injector.resolveAndInstantiate(LocalStorageService));
    });
}
exports.LocalStorageSubscriber = LocalStorageSubscriber;
