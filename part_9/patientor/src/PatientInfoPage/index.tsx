import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { setPatientInfo, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import axios from "axios";
import EntryTile from "./Entry";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientData = patients[id];
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = (values: EntryFormValues) => {
    try {
      console.log(values);
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  useEffect(() => {
    const updatePatient = async (id: string): Promise<void> => {
      try {
        const { data: updatedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(updatedPatient));
      } catch (e) {
        history.push("/");
      }
    };
    if (!patientData?.ssn) void updatePatient(id);
  }, []);

  if (!patientData?.ssn) return null;

  const getIcon = (gender: string): JSX.Element => {
    if (gender === "male") return <Icon name="mars" />;
    else if (gender === "female") return <Icon name="venus" />;
    return <Icon name="genderless" />;
  };

  const icon: JSX.Element = getIcon(patientData.gender);

  return (
    <div>
      <Container>
        <Header as="h2">
          {`${patientData.name} `}
          {icon}
        </Header>
        <Container>
          <p>
            ssn: {patientData.ssn}
            <br />
            occupation: {patientData.occupation}
          </p>
        </Container>
        <Container>
          <Header as="h3">entries</Header>
        </Container>
        <Container>
          {patientData.entries.length
            ? patientData.entries.map((entry: Entry) => (
                <EntryTile key={entry.id} entry={entry} />
              ))
            : "No entries"}
        </Container>
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfoPage;
