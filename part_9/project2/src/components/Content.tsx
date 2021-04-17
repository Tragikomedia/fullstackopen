import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <>
      {courseParts.map((part: CoursePart, index: number) => (
        <Part key={index} part={part} />
      ))}
    </>
  );
};

export default Content;
