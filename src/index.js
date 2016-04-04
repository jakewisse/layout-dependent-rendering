import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TagCollection from './models/TagCollection';

ReactDOM.render(<App tags={TagCollection.toJSON()} />, document.getElementById('root'));
