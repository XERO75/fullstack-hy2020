import React from 'react';
const baseUrl = 'http://localhost:3001/api/notes';
const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

export default Note;
