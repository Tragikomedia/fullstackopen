import { Diagnosis, Entry } from "../types";

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
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryTile;
