import { useDispatch } from "react-redux";
import { filterOut } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterOut(filter));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} type="text" />
    </div>
  );
};

export default Filter;
