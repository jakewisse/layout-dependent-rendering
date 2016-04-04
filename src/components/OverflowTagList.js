import React, { Component, PropTypes } from 'react';
import OverflowTag from './OverflowTag';
import TagCollection from '../models/TagCollection';

class TagOverflowList extends Component {

  render() {
    const tags = this.props.tags || [];
    return (<ul className="tag-list overflow-tag-list">
      {tags.filter(t => t.overflow).map((t, i) => <OverflowTag
        tag={t}
        key={`${i}-${t.name}`} />)}
    </ul>);
  }

}

TagOverflowList.displayName = 'TagOverflowList';
TagOverflowList.propTypes = {
  tags: PropTypes.array
};

export default TagOverflowList;
