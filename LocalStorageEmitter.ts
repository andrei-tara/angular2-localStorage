import {Injectable, OnDestroy} from 'angular2/core';
import {NgZone} from 'angular2/src/core/zone';

export class LocalStorageEmitter {

    protected static subscribed = {};
    protected static subscribers = [];

    public static register(ngZone:any) {
        LocalStorageEmitter.subscribed[ngZone] = ngZone.onTurnDone.subscribe(() => {
            for (let callback of LocalStorageEmitter.subscribers) {
                callback();
            }
        });
    }


    public static subscribe(callback:Function) {
        LocalStorageEmitter.subscribers.push(callback);
    }

    public static unregister(ngZone:any) {
        LocalStorageEmitter.subscribed[ngZone].unsubscribe();
    }
}

@Injectable()
class LocalStorageService implements OnDestroy {
    constructor(private ngZone:NgZone) {
        LocalStorageEmitter.register(this.ngZone);
    }

    ngOnDestroy() {
        LocalStorageEmitter.unregister(this.ngZone);
    }
}

import {Type} from 'angular2/src/facade/lang';
import {provide} from 'angular2/src/core/di';

export function LocalStorageSubscriber(appPromise:Promise<any>) {
    appPromise.then((bla) => {
        console.log('app booted', bla);
        console.log(bla.injector.resolveAndInstantiate(<Type>LocalStorageService));
    });
}
