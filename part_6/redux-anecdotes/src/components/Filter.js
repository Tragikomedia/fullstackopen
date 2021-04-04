import { connect } from "react-redux";
import { filterOut } from "../reducers/filterReducer";

const Filter = ({filterOut}) => {

  const handleChange = (event) => {
    const filter = event.target.value;
    filterOut(filter);
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

const mapDispatchToProps = (dispatch) => ({
  filterOut: value => {
    dispatch(filterOut(value));
  }
});

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
