export default class EventEmitter {
    static events = {};

    static dispatch(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data))
    }

    static subscribe(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
        console.log(this.events);
    }

}

