import $ from 'jquery';

const ResizeListener = _.clone(Backbone.Events);
$(window).resize(() => ResizeListener.trigger('resize'));

export default ResizeListener;
