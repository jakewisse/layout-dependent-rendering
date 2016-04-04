# layout-dependent-rendering
An example of how to render data in different parts of the component tree,
depending on layout constraints.

For this example, we're going to render data from an ordered Backbone
collection into two different lists. The first list, `TagList`, has the first
priority for receiving rendered `Tag`s. The second list, `OverflowTagList`,
will only receive whatever data overflows the width of the `TagList`. The
approach taken here is to render the entire Tag collection into the primary
`TagList`, and then to update our Tag models with state to indicate which
component they should be rendered into; `{ overflow: true }` for Tags that
should be placed in the overflow component, and a falsy `overflow` attribute
for those that should be rendered in the primary `TagList`. This recursion terminates
when after DOM measurements (in the primary list's
`componentDidMount()` and `componentDidUpdate()`) no models overflow, and
therefore no models need to be updated. This should always happen after at most
2 render cycles.

(_This example uses Backbone for state persistence and a `connectBB()` higher-order
component wrapper to listen for state changes, but it could just as easily be redone
in Redux or any Flux implementation._)

To demo, `npm install` and `npm start`.

--

<small>Forked from the awesome [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)</small>
