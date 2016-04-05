import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import TagAdder from './components/TagAdder';
import TagList from './components/TagList';
import OverflowTagList from './components/OverflowTagList';
import TagCollection from './models/TagCollection';
import connectBB from './hoc/connectBB';

class App extends Component {

  componentDidMount() {
    $(window).on('resize', this._onResize);
  }

  render() {
    const tags = this.props.tags || [];
    return (
      <div>
        <h1>Rendering content based on view constraints</h1>
        <TagAdder />
        <TagList tags={tags} />
        <hr />
        <OverflowTagList tags={tags} />
      </div>
    );
  }

  componentWillUnmount() {
    $(window).off('resize', this._onResize);
  }

  /**
   * Window resize handler. All we need to do is set `overflow` to false, so
   * that everything will be rendered in the the main TagList, which will
   * cause a recalculation.
   */
  _onResize = () => {
    TagCollection.reset(TagCollection.models.map(m => ({ ...m.attributes, overflow: false })));
  };

}

App.propTypes = {
  tags: PropTypes.array
};

/**
 * Get the next props for this component whenever the Tag collection changes.
 * @return {Object} The next set of props, which is always an array of the tag
 *                  models.
 */
const getNextProps = () => ({ tags: TagCollection.toJSON() });

export default connectBB(App, [{
  getEmitter: () => TagCollection,
  // TODO: Definitely add support for an array of events.
  events: [{
    name: 'add',
    replaceProps: getNextProps
  }, {
    name: 'remove',
    replaceProps: getNextProps
  }, {
    name: 'update',
    replaceProps: getNextProps
  }, {
    name: 'change',
    replaceProps: getNextProps
  }, {
    name: 'reset',
    replaceProps: getNextProps
  }]
}]);
