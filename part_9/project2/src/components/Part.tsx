import { CoursePart } from "../types";
import { assertNever } from "../helpers";

const Part = ({ part }: { part: CoursePart }) => {
  const toReturn: JSX.Element[] = [
    <p key={"name"}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
    </p>,
  ];
  switch (part.type) {
    case "normal": {
      toReturn.push(
        <p key={"desc"}>
          <em>{part.description}</em>
        </p>
      );
      break;
    }
    case "groupProject": {
      toReturn.push(
        <p key={"group"}>{`Project exercises ${part.groupProjectCount}`}</p>
      );
      break;
    }
    case "submission": {
      toReturn.push(
        <p key={"desc"}>
          <em>{part.description}</em>
        </p>
      );
      toReturn.push(
        <p key={"submit"}>{`Submit to ${part.exerciseSubmissionLink}`}</p>
      );
      break;
    }
    case "special": {
      toReturn.push(
        <p key={"desc"}>
          <em>{part.description}</em>
        </p>
      );
      toReturn.push(
        <p key={"skills"}>
          {`Required skills: ${part.requirements.join(", ")}`}
        </p>
      );
      break;
    }
    default: {
      return assertNever(part);
    }
  }

  return <div>{toReturn}</div>;
};

export default Part;
