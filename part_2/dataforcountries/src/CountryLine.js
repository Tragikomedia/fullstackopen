const CountryLine = ({ country, handleClick }) => <><li>{country.name} <button onClick={() => handleClick(country)}>show</button></li></>;

export default CountryLine;
