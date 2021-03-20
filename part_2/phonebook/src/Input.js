const Input = ({ label, type, value, handleChange }) => (
  <div>
    {label}: <input type={type} value={value} onChange={handleChange} />
  </div>
);

export default Input;
