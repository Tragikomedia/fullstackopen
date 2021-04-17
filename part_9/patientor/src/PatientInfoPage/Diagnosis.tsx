import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const DiagnosisTile = ({ code }: { code: Diagnosis["code"] }) => {
  const [{ diagnoses }] = useStateValue();
  if (!Object.keys(diagnoses).length)
    return (
      <>
        <li>{code}</li>
      </>
    );
  const name = diagnoses[code].name;

  return (
    <>
      <li>
        <p>{`${code} ${name}`}</p>
      </li>
    </>
  );
};

export default DiagnosisTile;
