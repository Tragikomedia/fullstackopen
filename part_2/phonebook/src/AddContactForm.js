import Input from "./Input";

const AddContactForm = ({ handleSubmit, inputData }) => (
  <>
    <form onSubmit={handleSubmit}>
      {inputData.map(({ label, type, value, handleChange }) => (
        <Input
          label={label}
          type={type}
          value={value}
          handleChange={handleChange}
          key={label}
        />
      ))}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default AddContactForm;
