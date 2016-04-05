import TagModel from './TagModel';

const TagCollection = Backbone.Collection.extend({

  model: TagModel

});

export default new TagCollection();
