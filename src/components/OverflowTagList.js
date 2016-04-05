import React, { Component, PropTypes } from 'react';
import OverflowTag from './OverflowTag';
import TagCollection from '../models/TagCollection';

class OverflowTagList extends Component {

  render() {
    const tags = this.props.tags || [];
    return (<ul className="tag-list overflow-tag-list">
      {tags.filter(t => t.overflow).map((t, i) => <OverflowTag
        tag={t}
        key={`${i}-${t.name}`} />)}
    </ul>);
  }

}

OverflowTagList.displayName = 'OverflowTagList';
OverflowTagList.propTypes = {
  tags: PropTypes.array
};

export default OverflowTagList;
