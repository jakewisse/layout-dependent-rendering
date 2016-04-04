import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import TagCollection from '../models/TagCollection';
import Tag from './Tag';

const _ = window._;

class TagList extends Component {

  constructor(props) {
    super(props);
    this._tags = [];
  }

  render() {
    const tags = this.props.tags || [];
    return (<ul className="master-tag-list tag-list">
      {tags.filter(t => !t.overflow).map((t, i) => (<Tag
        tag={t}
        key={`${i}-${t.name}`}
        refSet={this._refSet} />))}
    </ul>);
  }

  componentDidMount() {
    this._removeOldRefs();
    this._measureTags();
  }

  componentDidUpdate() {
    this._removeOldRefs();
    this._measureTags();
  }

  _refSet = (obj) => {
    const { ref, id } = obj;
    this._tags.push({
      $elem: $(ref),
      id
    });
  };

  /**
   * Since the `ref` attribute callback is only invoked when new Tags are
   * rendered, we need to remove refs that are no longer rendered.
   * @return {[type]} [description]
   */
  _removeOldRefs = () => {
    const mainTagsOnProps = this.props.tags.filter(tag => !tag.overflow);
    this._tags = this._tags.filter(tag => _.findWhere(mainTagsOnProps, { id: tag.id }));
  };

  /**
   * Measure the layout of each tag to determine what tags should remain
   * rendered here, and which should be rendered in overflow components.
   */
  _measureTags = () => {
    const firstTop = this._tags.length && this._tags[0].$elem.position().top;
    const notTopIDs = this._tags.map(tag => ({
      ...tag,
      top: tag.$elem.position().top
    })).filter(tag => tag.top !== firstTop).map(obj => obj.id);

    // For each model that doesn't fit in the first row, set an property on
    // the tag model indicating that it should be in the overflow component.
    const overflowModels = TagCollection.filter(model => !!~notTopIDs.indexOf(model.id)).forEach(model => {
      model.set({ overflow: true });
    });
  };

}

TagList.displayName = 'TagList';
TagList.propTypes = {
  tags: PropTypes.array
};

export default TagList;
