import React, { PropTypes, Component } from 'react'
import TagCollection from '../models/TagCollection';

class OverflowTag extends Component {

  /**
   * Same remove click handler from the Tag component. Any time a tag is removed, we need to recalculate.
   */
  _handleRemoveClick = () => {
    const removed = TagCollection.remove(this.props.tag.id, { silent: true });
    TagCollection.reset(TagCollection.models.map(m => ({ ...m.attributes, overflow: false })));
  };

  render() {
    return (<li>
      {this.props.tag.name}
      <img className="tag-close" src="assets/circle-close.svg" onClick={this._handleRemoveClick} />
    </li>);
  }
}

OverflowTag.displayName = 'OverflowTag';
OverflowTag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number
  })
};

export default OverflowTag;
