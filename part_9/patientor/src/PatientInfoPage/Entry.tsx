import { Diagnosis, Entry } from "../types";
import DiagnosisTile from "./Diagnosis";
import { assertNever } from "../helpers";
import { Container, Header, Icon } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";

const containerStyle = {
  border: "1px solid black",
  margin: "0.3rem 0",
  padding: "0.5rem 0.3rem"
};

const EntryTile = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck": {
      return (
        <Container
          style={containerStyle}
        >
          <Header as="h4">
            {entry.date}
            <Icon name="user md" />
          </Header>
          <p>
            <em>{entry.description}</em>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
                <DiagnosisTile key={code} code={code} />
              ))}
            </ul>
          )}
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        </Container>
      );
    }
    case "OccupationalHealthcare": {
      return (
        <Container style={containerStyle}>
          <Header as="h4">
            {entry.date}
            <Icon name="stethoscope" />
            {` ${entry.employerName}`}
          </Header>
          <p>
            <em>{entry.description}</em>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
                <DiagnosisTile key={code} code={code} />
              ))}
            </ul>
          )}
          {entry.sickLeave && (
            <p>
              <strong>Sick leave</strong>
              <br />
              {`Start: ${entry.sickLeave.startDate}`}
              <br />
              {`End: ${entry.sickLeave.endDate}`}
            </p>
          )}
        </Container>
      );
    }
    case "Hospital": {
      return (
        <Container style={containerStyle}>
          <Header as="h4">
            {entry.date}
            <Icon name="hospital" />
          </Header>
          <p>
            <em>{entry.description}</em>
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code: Diagnosis["code"]) => (
                <DiagnosisTile key={code} code={code} />
              ))}
            </ul>
          )}
          {entry.discharge && (
            <p>
              <strong>Discharge</strong>
              <br />
              {`Date: ${entry.discharge.date}`}
              <br />
              {`Criteria: ${entry.discharge.criteria}`}
            </p>
          )}
        </Container>
      );
    }
    default: {
      assertNever(entry);
    }
  }
  return null;
};

export default EntryTile;
