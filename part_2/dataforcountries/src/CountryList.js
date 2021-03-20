import CountryLine from "./CountryLine";

const CountryList = ({ countries, handleClick }) => (
  <>
    <ul>
      {countries.map((country) => (
        <CountryLine country={country} handleClick={handleClick} key={country.name} />
      ))}
    </ul>
  </>
);

export default CountryList;
