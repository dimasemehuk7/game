function EventEmitter() {
    this._eventToListeners = {};
}

EventEmitter.prototype.on = function (eventName, listener) {
    this._eventToListeners[eventName] = this._eventToListeners[eventName] || [];
    this._eventToListeners[eventName].push(listener);
    return this;
};

EventEmitter.prototype.emit = function (eventName, data) {
    if (this._eventToListeners[eventName]) {
        this._eventToListeners[eventName].forEach(function (listener) {
            listener(data);
        });
    }
};