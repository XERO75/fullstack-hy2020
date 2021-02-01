import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

const promise = axios.get('http://localhost:3001/notes');
console.log(promise);

const promise2 = axios.get('http://localhost:3001/foobar');
console.log(promise2);

const notes = [
  {
    content: 'newNote',
    date: 2019,
    important: Math.random() < 0.5,
    id: 1,
  },
];

ReactDOM.render(<App notes={notes} />, document.getElementById('root'));
