const Searchbox = ({ value, handleChange }) => (
  <div>
    {"Find countries containing: "}
    <input type="text" value={value} onChange={handleChange}></input>
  </div>
);

export default Searchbox;
