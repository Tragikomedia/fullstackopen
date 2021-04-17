import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Header, Icon } from "semantic-ui-react";
import { setPatientInfo, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import axios from "axios";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patientData = patients[id];
  const history = useHistory();

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
      </Container>
    </div>
  );
};

export default PatientInfoPage;
