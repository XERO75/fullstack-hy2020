import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [personToShow, setPersonToShow] = useState([]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let findIdx = persons.findIndex((item) => item.name === newName);
    console.log('findIdx', findIdx);
    if (findIdx >= 0) {
      alert(`${newName} is already added to phonebook`);
      return false;
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const onSearch = () => {};

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    setPersonToShow(
      persons.filter(
        (person) =>
          event.target.value.toLowerCase() === person.name.toLowerCase()
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSearch}>
        filter shown with:{' '}
        <input value={searchValue} onChange={handleSearchValue} />
      </form>
      <h2>add a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br></br>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
