import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const notes = [
  {
    content: 'newNote',
    date: 2019,
    important: Math.random() < 0.5,
    id: 1,
  },
];

ReactDOM.render(<App notes={notes} />, document.getElementById('root'));
