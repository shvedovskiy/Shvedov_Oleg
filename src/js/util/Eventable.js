function getEventSubscribers(eventable, eventName, needToCreate) {
  const registry = eventable._eventable_registry;

  if (eventName in registry) {
    return registry[eventName];
  } else if (needToCreate) {
    return registry[eventName] = [];
  }
  return null;
}

export default class Eventable {

  _initEventable() {
    this._eventable_registry = {};
  }

  on(eventName, handler, ctx) {
    let subscribers = getEventSubscribers(this, eventName, true);
    subscribers.push({ handler: handler, ctx: ctx });
    return this;
  }

  off(eventName, handler, ctx) {
    let subscribers = getEventSubscribers(this, eventName);
    if (subscribers) {
      for (let i = 0, l = subscribers.length; i !== l; i++) {
        if ((subscribers[i].handler === handler) && (subscribers[i].ctx === ctx)) {
          subscribers.splice(i, 1);
          return this;
        }
      }
    }
    return this;
  }

  trigger(eventName, data) {
    let subscribers = getEventSubscribers(this, eventName);
    if (subscribers) {
      let subscribersCopy = subscribers.slice();
      for (let i = 0, l = subscribersCopy.length; i !== l; i ++) {
        subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
      }
    }
    return this;
  }
}


