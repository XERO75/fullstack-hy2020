import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Note from './components/Note';

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
  let [points, setPoints] = useState([1, 2, 3, 4, 5, 6]);

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
  };
  const clickVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    console.log(copy);
    setPoints(Array.apply(null, copy));
  };

  const mostVotes = () => {
    let max = Math.max(...points);
    let idx = points.indexOf(max);
    return idx;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes()]}
      <p>has {points[mostVotes()]} votes</p>
      <Button handleClick={clickVote} text="vote"></Button>
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
