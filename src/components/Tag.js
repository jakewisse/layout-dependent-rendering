import React, { Component, PropTypes } from 'react';
import TagCollection from '../models/TagCollection';

class Tag extends Component {

  /**
   * `ref` callback for the `<li>`.
   * @param  {HTMLElement} c
   */
  _refSet = (c) => {
    this.props.refSet && this.props.refSet(this.props.tag.id, c);
  };

  /**
   * Click handler to remove a tag.
   */
  _handleRemoveClick = () => {
    // Silent to avoid repeated rerenders. We only need to have one event
    // triggered.
    const removed = TagCollection.remove(this.props.tag.id, { silent: true });
    TagCollection.reset(TagCollection.models.map(m => ({ ...m.attributes, overflow: false })));
  };

  render() {
    return (<li ref={this._refSet}>{this.props.tag.name}
      <img className="tag-close" src="assets/circle-close.svg" onClick={this._handleRemoveClick} />
    </li>);
  }

}

Tag.displayName = 'Tag';
Tag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.any
  }),
  refSet: PropTypes.func
};

export default Tag;
