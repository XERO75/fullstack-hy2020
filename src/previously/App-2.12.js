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
  const toggleShow = (val) => {
    val.showImg = !val.showImg
    console.log(val);
  };
  return (
    <div>
      <ul>
        {value.map((val) => {
          return (
            <li key={val.name}>
              {val.name} <button onClick={() => val.showImg = !val.showImg}>show</button>
              <br></br>
              {val.showImg ? <img src={val.flag} alt="" width="100px" /> : ''}
            </li>
          );
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
          if (response.data.length > 10) {
            setContries([{ name: 'too many matches, specify another filter' }]);
          } else {
            setContries(response.data.map(item => {
              return {
                showImg: false,
                ...item
              }
            }));
          }
        });
    }
  }, [searchValue]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const onShow = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <Filter searchValue={searchValue} handleChange={onSearch}></Filter>
      <Contry value={contries} handleClick={onShow}></Contry>
    </div>
  );
};

export default App;
