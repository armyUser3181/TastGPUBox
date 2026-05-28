export default class EventManager {
    /** @param {HTMLElement} element */
    constructor(element) {
        this.element = element;
        this.eventMap = new Map();
    }
    
    /** @param {string} eventType @param {EventListener} handler */
    #push(eventType, handler) {
        if (!this.eventMap.has(eventType)) {
            this.eventMap.set(eventType, []);
        }
        this.eventMap.get(eventType).push(handler);
    }

    /** @param {string} eventType @param {EventListener} handler */
    add(eventType, handler) {
        this.#push(eventType, handler);
        this.element.addEventListener(eventType, handler);
    }
    
    /** @param {string} eventType @param {EventListener} handler */
    remove(eventType, handler) {
        this.eventMap.get(eventType).splice(this.eventMap.get(eventType).indexOf(handler), 1);
        this.element.removeEventListener(eventType, handler);
    }

    destroy() {
        this.eventMap.forEach((handlers, eventType) => {
            handlers.forEach(handler => {
                this.element.removeEventListener(eventType, handler);
            });
        });
    }
    
    getEvents() {
        return this.eventMap;
    }
    
    clear() {
        this.eventMap.clear();
    }

}
