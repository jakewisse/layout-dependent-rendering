import React, { Component } from 'react';

/**
 * Just like react-redux's `connect()`, but for listening to state changes via
 * Backbone/Underscore events
 *
 * @example
 * export default connectBB(MyComponent, [{
 *   // The emitter won't be defined at the time that the components bundle is
 *   // loaded, so a function that will retrieve the emitter needs to be used.
 *   getEmitter: () => favorites,
 *   events: [{
 *     name: 'add',
 *     // A function that will be called whenever the event is triggered, and is
 *     // expected to return props that the component will be re-rendered with.
 *     // Passed the current props as the first arg., and the remaining arguments
 *     // will be those that are passed to handler of the specific event.
 *     replaceProps: (props, ...eventArgs) => {
 *     }
 *   }]
 * }]);
 *
 * @param  {ReactClass} WrappedComponent
 * @param  {Array<Object>} subscriptions
 * @return {ReactClass}
 */
export default function connectBB(WrappedComponent, subscriptions) {

  class ConnectedComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        props: { ...this.props }
      };

      /**
       * A cache of the attached event handlers for each emitter. Used to
       * detach handlers on `componentWillUnmount()`
       * @type {Array<Object>}
       * @property {Backbone.Events} emitter
       * @property {String} name
       * @property {Function} handler
       */
      this._handlers = [];
    }

    /**
     * Attach event handlers according to the provided `subscriptions`
     */
    componentDidMount() {
      subscriptions.forEach(s => {
        const emitter = s.getEmitter();
        s.events.forEach(e => {
          const handler = this._getHandleEvent(e);
          this._handlers.push({ emitter, name: e.name, handler });
          emitter.on(e.name, handler);
        });
      });
    }

    /**
     * Detach event handlers using cached references in `this._handlers`
     */
    componentWillUnmount() {
      this._handlers.forEach(h => {
        const { emitter, name, handler} = h;
        emitter.off(name, handler);
      });
      this._handlers = [];
    }

    /**
     * Higher-order function that returns the handler for an event subscription
     * @param  {Object} eventObj
     * @return {Function}          The event handler that will be passed
     *     whatever args. are passed by the specific Backbone event.
     */
    _getHandleEvent = (eventObj) => (...args) => {
      if (eventObj.replaceProps) {
        const newProps = eventObj.replaceProps(this.state.props, ...args);
        if (newProps) {
          this.setState({ props: newProps });
        }
      }
    };

    render = () => <WrappedComponent {...this.state.props} />;

  }

  ConnectedComponent.displayName = `ConnectBB (${WrappedComponent.displayName})`;

  return ConnectedComponent;
}
