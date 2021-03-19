import Part from "./Part";

const Content = ({ parts }) => {
  const content = parts.map((part) => (
    <Part part={part.name} exercises={part.exercises} />
  ));
  return <>{content}</>;
};

export default Content;
