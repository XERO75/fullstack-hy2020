import React, { useState, useEffect } from 'react';
import phoneService from './services/persons';

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
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [personToShow, setPersonToShow] = useState(persons);

  const hook = () => {
    phoneService
      .getAll()
      .then((res) => {
        setPersonToShow(res);
        setPersons(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(hook, []);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let findIdx = persons.find((item) => item.name === newName);
    if (findIdx) {
      phoneService.update(findIdx.id, newPerson).then((response) => {
        console.log(response);
      });
      return;
    }
    phoneService
      .create(newPerson)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data);
      });
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
