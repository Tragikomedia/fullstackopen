import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    {course.parts.map(({ name, exercises, id }) => (
      <Part name={name} exercises={exercises} key={id} />
    ))}
    <Total parts={course.parts}/>
  </div>
);

export default Course;
