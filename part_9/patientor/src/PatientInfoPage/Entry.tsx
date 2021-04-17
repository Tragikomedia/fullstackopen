import { Diagnosis, Entry } from "../types";
import DiagnosisTile from "./Diagnosis";

const EntryTile = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>
        {`${entry.date} `}
        <em>{entry.description}</em>
      </p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
            <DiagnosisTile key={code} code={code} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryTile;
