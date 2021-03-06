import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Filter = ({ searchValue, handleChange }) => {
  return (
    <div>
      <form>
        filter shown with: <input value={searchValue} onChange={handleChange} />
      </form>
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  nameValue,
  numValue,
  nameChange,
  numChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameChange} />
          <br></br>
          number: <input value={numValue} onChange={numChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ value }) => {
  return (
    <div>
      <ul>
        {value.map((person) => {
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

const App = () => {
  const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [personToShow, setPersonToShow] = useState(persons);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/db').then((res) => {
      console.log('promise fulfilled');
      setNotes(res.data);
    });
  };

  useEffect(hook, []);

  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then((response) => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // }, []);
  console.log('render', notes.length, 'notes');

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let findIdx = persons.findIndex((item) => item.name === newName);
    if (findIdx >= 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    axios
    .post('http://localhost:3001/db', newPerson)
    .then(response => {
      console.log(response)
    })
    setPersons(persons.concat(newPerson));
    setPersonToShow(JSON.parse(JSON.stringify(persons.concat(newPerson))));
    setNewName('');
    setNewNumber('');
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      setPersonToShow(
        persons.filter(
          (person) =>
            event.target.value.toLowerCase() === person.name.toLowerCase()
        )
      );
    } else {
      setPersonToShow(persons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} handleChange={handleSearchValue}></Filter>

      <h2>add a new</h2>
      <PersonForm
        handleSubmit={onSubmit}
        nameValue={newName}
        numValue={newNumber}
        nameChange={handleNameChange}
        numChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons value={personToShow}></Persons>
    </div>
  );
};

export default App;
