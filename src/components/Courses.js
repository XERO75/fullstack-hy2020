import React from 'react';

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((a, c) => a + c.exercises, 0);
  return (
    <div>
      <p>total of {sum} exercises</p>
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total course={course}></Total>
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
