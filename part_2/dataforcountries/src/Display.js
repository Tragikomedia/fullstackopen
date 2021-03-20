import CountryList from "./CountryList";
import CountryView from "./CountryView";

const Display = ({ countries, handleClick }) => {
  let toShow;
  if (countries.length > 10) {
    toShow = <p>Too many matches, please be more specific</p>;
  } else if (countries.length > 1) {
    toShow = <CountryList countries={countries} handleClick={handleClick}/>;
  } else if (countries.length === 1) {
   toShow = <CountryView country={countries[0]}/>   
  }else {
    toShow = <p>Such country doesn't exist</p>;
  }
  return <>
    {toShow}
  </>
};

export default Display;
