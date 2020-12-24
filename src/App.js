import React from "react";
import ReactDOM from "react-dom";
import SelectedCountry from "./components/SelectedCountry";
import CountriesList from "./components/CountriesList";
import {STATUS, URL, REGION, INIT_COUNTRY} from "./configurations/Config";

const model = {
    status: STATUS.INIT,
    selectedCountryID: "",
    countries: [],
    present: data => {
        if(data.selectedID !== "" || model.status === STATUS.INIT){
            model.status = STATUS.SELECT_COUNTRY;
            model.selectedCountryID = data.selectedID;
        }

        if(Array.isArray(data)){
            model.status = STATUS.INIT;
            model.countries = data;
        }

        state.render(model)
    }
};

const normaliseData = data => {
     return data.map(country => {
        return {
            id: country.alpha2Code,
            name: country.name,
            lat: country.latlng[0],
            lng: country.latlng[1],
            flag: country.flag,
            capital: country.capital,
            population: country.population
        }
    })
}

const actions = {
    selectCountry: (id, present) => {
        present({selectedID: id});
    },
    getCountries: (region, present) => {
        fetch(URL + region)
            .then(response => response.json())
            .then(data => {
                const countries = normaliseData(data);
                present(countries);
            })
    }
}

const nap = model => {
    if (model.status === STATUS.INIT) {
        actions.selectCountry(INIT_COUNTRY, model.present);
    }
}

const view = {
    init: model => {
        return <div>
            <CountriesList data={model.countries}/>
            <SelectedCountry />
        </div>
    },
    selectCountry: model => {
        const index = model.countries.findIndex( contry => contry.id === model.selectedCountryID);
        const country = model.countries[index];
        return <div>
                    <CountriesList data={model.countries} action={actions.selectCountry} present={model.present}/>
                    <SelectedCountry country={country}/>
               </div>
    }
}

const state = {
    init: model => (model.status === STATUS.INIT && model.countries.length > 0 && model.selectedCountryID == ""),
    selectCountry: model => (model.status === STATUS.SELECT_COUNTRY && model.selectedCountryID !== ""),
    render: model => {
        stateRepresentation(model);
        nap(model);
    }
}

const stateRepresentation = model => {
    let representation = <div>something went wrong!</div>

    if(state.selectCountry(model))
        representation = view.selectCountry(model);
    
    if(state.init(model))
        representation = view.init(model);

    display(representation);
};

const display = view => {
    const app = document.getElementById("app");
    ReactDOM.render(view, app);
}

document.addEventListener("DOMContentLoaded", function(event) {
    actions.getCountries(REGION, model.present)
});