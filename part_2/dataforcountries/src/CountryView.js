import Weather from "./Weather";

const CountryView = ({country}) => {
    const {name, capital, population, languages, flag} = country;
    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>
                {languages.map(({name}) => <li key={name}>{name}</li>)}
            </ul>
            <img src={flag} alt={`Flag of ${name}`} width="300px"/>
            <Weather capital={capital}/>
        </div>
    );
}

export default CountryView;