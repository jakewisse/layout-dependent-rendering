import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import TagCollection from '../models/TagCollection';
import Tag from './Tag';

const _ = window._;

class TagList extends Component {

  constructor(props) {
    super(props);

    /**
     * An object of refs containing measurable DOM elements, stored as a map
     * from tag ID to jQuery-wrapped <li>.
     * @type {Object}
     */
    this._tags = {};
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
    this._measureTags();
  }

  componentDidUpdate() {
    this._measureTags();
  }

  /**
   * A callback passed to the `refSet` prop on Tag. Is invoked each time the
   * tag's `ref` callback is invoked, with both the reference to the component
   * instance and the tag's ID. Maintains the state of all TagList Tags and
   * their DOM nodes. Note that the `ref` prop is called with `null` when a
   * Component is being unmounted.
   * @param  {Number} id  The Tag's ID
   * @param  {HTMLElement} ref A ref to the child Tag's resulting DOM node
   */
  _refSet = (id, ref) => {
    if (!ref) {
      delete this._tags[id];
    } else {
      this._tags[id] = $(ref);
    }
  };

  /**
   * Measure the layout of each tag to determine what tags should remain
   * rendered here, and which should be rendered in overflow components.
   * Trigger an update of the Tag state with this knowledge.
   */
  _measureTags = () => {
    if (!this.props.tags || !this.props.tags.length) {
      return;
    }

    const firstTop = this._tags[this.props.tags[0].id].position().top;
    Object.keys(this._tags)
      .filter(id => this._tags[id].position().top !== firstTop)
      .forEach(id => TagCollection.get(id).set({ overflow: true }));
  };

}

TagList.displayName = 'TagList';
TagList.propTypes = {
  tags: PropTypes.array
};

export default TagList;
