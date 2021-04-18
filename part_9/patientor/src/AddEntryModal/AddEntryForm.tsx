import { Entry } from "../types";
import { TypeOption, SelectField, TextField, NumberField } from "./FormField";
import { Field, Formik, Form } from "formik";
import { Button } from "semantic-ui-react";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.descriptions = requiredError;
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        if (values.type === "Hospital") {
          if (!values.discharge?.date) {
            errors.discharge = requiredError;
          }
          if (!values.discharge?.criteria) {
            errors.discharge = requiredError;
          }
        }
        if (values.type === "HealthCheck") {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ values,dirty, isValid, setFieldTouched, setFieldValue }) => {
        return (
          <Form>
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            {values.type === "Hospital" && (
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
            )}
            {values.type === "Hospital" && (
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            )}
            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />
            )}
            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Sick leave start"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
            )}
            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Sick leave end"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
            )}
            {values.type === "HealthCheck" && (
              <Field
                label="Health check rating"
                placeholder="Health check rating"
                name="healthCheckRating"
                min={0}
                max={4}
                component={NumberField}
              />
            )}
            <Button type="button" onClick={onCancel} color="red">
              Cancel
            </Button>
            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!isValid || !dirty}
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
