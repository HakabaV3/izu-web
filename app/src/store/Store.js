import { EventEmitter } from 'events';

const DISPATCH_EVENT = 'dispatch';

export default class Store extends EventEmitter {
    update(newState) {
        Object.assign(this.state, newState);

        this.dispatch();
    }

    dispatch() {
        this.emit(DISPATCH_EVENT, this);
    }

    subscribe(callback) {
        this.on(DISPATCH_EVENT, callback);
    }

    unsubscribe(callback) {
        this.off(DISPATCH_EVENT, callback);
    }
}
