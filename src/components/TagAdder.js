import React, { Component } from 'react';
import TagCollection from '../models/TagCollection';
import generateID from '../utility/generateID';

class TagAdder extends Component {

  render() {
    return (<form onSubmit={this._handleSubmit}>
      <label>
        <span style={{'marginRight': '10px'}}>Enter a new tag:</span>
        <input type="text" ref={c => { this._input = c; }} />
      </label>
    </form>);
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    TagCollection.add({
      id: generateID(),
      name: this._input.value,
      overflow: !!TagCollection.findWhere({ overflow: true })
    });
    this._input.value = '';
  };

}

TagAdder.displayName = 'TagAdder';

export default TagAdder;
