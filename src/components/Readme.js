import React, { Component } from 'react';

class Readme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this._text = (<div>
      <a href="#" onClick={this._hide}>Hide README</a>
      <p className="readme">In React, how should we handle situations where the resulting layout dictates what data should be rendered in what part of the component tree? This is one example of how to handle this problem.</p>
      <p className="readme">The issue here is that usually the layout is a function of the state, but if we want to declare a different component structure dependent on the layout, all of a sudden state becomes a function of the resulting layout. My first thought was to prevent this self-referential problem entirely, by defining some kind of a layout model in JavaScript, so that the decision of what data is rendered in what component can be built into the state itself. But, I'm sure that this would be hard to get really accurate across all platforms.</p>
      <p className="readme">This solution is a variant of one that I've read about on the web, where the data is first rendered as a test to see what the layout will look like. In <code>componentDidMount</code>, we can probe the DOM to see where elements break to the next line, etc., and adjust accordingly. In this example, the state, i.e. the Tags collection, takes on more of a view-model role and is augmented with an <code>overflow</code> property to indicate that it should be rendered in an overflow component, as opposed to the main Tag list. When our state is updated, the view re-renders with each tag in the correct component.</p>
    </div>);
    this._link = (<div><a href="#" onClick={this._show}>Show README</a></div>);
  }

  _hide = () => { this.setState({ show: false }); };
  _show = () => { this.setState({ show: true }); };

  render() {
    return this.state.show ? this._text : this._link;
  }

}

Readme.displayName = 'Readme';

export default Readme;
