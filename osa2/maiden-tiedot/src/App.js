import React, { useState, useEffect } from 'react'
import CountryList from './components/Country'
import Filter from './components/Filter'
import dataService from './services/dataService'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('effect')
        dataService
            .getCountries()
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const handleShowmore = (name) => {
        setSearch(name)
    }

    return (
        <div>
            <Filter search={search} handleSearchChange={handleSearchChange} />

            <CountryList countries={countries} search={search} handleShowmore={handleShowmore}/>
        </div>

    )

}

export default App