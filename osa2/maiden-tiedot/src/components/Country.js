import React from "react"

const CountryList = ({ countries, search, handleShowMore }) => {
    let newCountries = []

    if (search !== '') {
        countries.forEach(element => {
            if (element.name.toLowerCase().includes(search.toLowerCase())) {
                newCountries.push(element)
            }
        });
    }


    if (newCountries.length === 1) {
        return (
            <div>
                {newCountries.map((newCountries, i) =>
                    <Country key={i} name={newCountries.name} capital={newCountries.capital}
                        population={newCountries.population} flag={newCountries.flag} languages={newCountries.languages} />)}
            </div>
        )
    }

    if (newCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }

    if (newCountries.length <= 10 && newCountries !== 0) {
        return (
            <div>
                {newCountries.map((newCountries, i) =>
                    <SimpleCountry key={i} name={newCountries.name} handleShowMore={handleShowMore} />)}
            </div>
        )
    }
    return (
        <div></div>
    )
}

const Language = (props) => {
    return (
        <li>
            {props.name}
        </li>
    )
}

const Languages = (languages) => {
    let langs = languages.languages.concat()
    return (
        <div>
            {langs.map((langs, i) =>
                <Language key={i} name={langs.name} />)}
        </div>
    )
}

const SimpleCountry = (props) => {
    return (
        <div>
            {props.name} <button onClick={props.handleShowMore}>show</button>
        </div>
    )
}

const Country = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>

            <div>capital {props.capital}</div>
            <div>population {props.population}</div>

            <h3>languages</h3>
            <Languages languages={props.languages} />
            <img src={props.flag} alt="Flag" width="100" height="100" />
        </div>
    )
}

export default CountryList