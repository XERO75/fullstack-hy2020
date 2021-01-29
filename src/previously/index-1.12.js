import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const Statistic = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good + neutral) / (good + neutral + bad);

  return (
    <div>
      <h1>statistics</h1>
      <Statistic text="good" value={good}></Statistic>
      <Statistic text="neutral" value={neutral}></Statistic>
      <Statistic text="bad" value={bad}></Statistic>
      <Statistic text="all" value={all}></Statistic>
      <Statistic text="average" value={average}></Statistic>
      <Statistic text="positive" value={positive}></Statistic>
    </div>
  );
};

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let [selected, setSelected] = useState(0);

  const clickGood = () => {
    setGood(good + 1);
  };
  const clickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const clickBad = () => {
    setBad(bad + 1);
  };
  const clickNext = () => {
    setSelected(
      (selected = Math.floor(Math.random() * props.anecdotes.length))
    );
    console.log(
      selected,
      Math.floor(Math.random() * setSelected.length),
      props.anecdotes
    );
  };

  return (
    <div>
      {props.anecdotes[selected]}
      <Button handleClick={clickNext} text="next"></Button>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good"></Button>
      <Button handleClick={clickNeutral} text="neutral"></Button>
      <Button handleClick={clickBad} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
