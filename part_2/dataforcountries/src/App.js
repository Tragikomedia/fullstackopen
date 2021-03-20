import { useEffect, useState } from "react";
import axios from "axios";
import Searchbox from "./Searchbox";
import Display from "./Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [possibilities, setPossibilities] = useState([]);

  const fetchCountries = async () => {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
    setCountries(data);
    setPossibilities(data);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    setPossibilities(
      countries.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const showSpecific = (country) => {
    setFilter(country.name);
    setPossibilities([country]);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <Searchbox value={filter} handleChange={handleFilterChange} />
      <Display countries={possibilities} handleClick={showSpecific}/>
    </div>
  );
}

export default App;
