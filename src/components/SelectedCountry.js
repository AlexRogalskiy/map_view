import React from "react";
import getMap from "./GMap";

const comp = props => {
    return !props.country ? <div>no country selected</div> : getSelectedCountry(props.country)
}

const getSelectedCountry = country => {
    return <div id="country">
        <div>
            <h2>{country.name}</h2>
            <img src={country.flag} height="70px" width="100px"/>
            <p>{`population: ${country.population} - capital: ${country.capital}`}</p>
        </div>
        {getMap(country.lat, country.lng)}
    </div>
}


export default comp;