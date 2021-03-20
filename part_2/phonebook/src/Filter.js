import Input from "./Input";

const Filter = ({ value, handleChange }) => (
  <>
    <Input
      label={"Show names starting with"}
      type={"text"}
      value={value}
      handleChange={handleChange}
    />
  </>
);

export default Filter;
