import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonList from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        let add = true
        persons.forEach((pers) => {
            if (pers.name === newName) {
                add = false
            }
        })

        if (add) {
            const personObject = { name: newName, number: newNumber }
            setPersons(persons.concat(personObject))
        } else {
            window.alert(`${newName} is already added to phonebook`)
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearchChange={handleSearchChange} />

            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

            <h3>Numbers</h3>
            <PersonList persons={persons} search={search} />
            {/* <div>debug: {newName} {newNumber}</div> */}
        </div>

    )

}

export default App