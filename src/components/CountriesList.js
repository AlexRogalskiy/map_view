import React from "react";

const comp = props => {
    return <ul>{
        props.data.map(country => {
            return <li key={country.id} onClick={() => props.action(country.id, props.present)}>{country.name}</li>
        })
    }</ul>
}

export default comp;