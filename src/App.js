import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ searchValue, handleChange }) => {
  return (
    <div>
      <form>
        find contries: <input value={searchValue} onChange={handleChange} />
      </form>
    </div>
  );
};

const Contry = ({ value }) => {
  return (
    <div>
      <ul>
        {value.map((val) => {
          return <li key={val.name}>{val.name}</li>;
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [contries, setContries] = useState([]);

  useEffect(() => {
    if (searchValue) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${searchValue}`)
        .then((response) => {
          setContries(response.data);
          console.log('promise fulfilled');
        });
    }
  }, [searchValue]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <Filter searchValue={searchValue} handleChange={onSearch}></Filter>
      <Contry value={contries}></Contry>
    </div>
  );
};

export default App;
