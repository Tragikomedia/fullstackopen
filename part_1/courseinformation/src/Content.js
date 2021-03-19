import Part from "./Part";

const Content = ({ content }) => {
  const parts = content.map((el) => (
    <Part part={el.name} exercises={el.exercises} />
  ));
  return <>{parts}</>;
};

export default Content;
