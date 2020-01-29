import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/Country'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const handleShowmore = () => {
        console.log("Click!");
    }

    const [search, setSearch] = useState('')
    return (
        <div>
            <Filter search={search} handleSearchChange={handleSearchChange} />

            <CountryList countries={countries} search={search} handleShowmore={handleShowmore}/>
        </div>

    )

}

export default App