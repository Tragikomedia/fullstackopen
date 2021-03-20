import CountryLine from "./CountryLine";

const CountryList = ({ countries }) => (
  <>
    <ul>
      {countries.map((country) => (
        <CountryLine country={country} key={country.name} />
      ))}
    </ul>
  </>
);

export default CountryList;
