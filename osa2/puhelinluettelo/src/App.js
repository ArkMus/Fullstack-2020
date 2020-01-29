import React, { useState, useEffect } from 'react'
import PersonList from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PhonebookService from './services/PhonebookService'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [Message, setMessage] = useState(null)
    const [className, setClassName] = useState("normalMessage")

    useEffect(() => {
        console.log('effect')
        PhonebookService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        let add = true
        let persId = 0

        persons.forEach((pers) => {
            if (pers.name === newName) {
                add = false
                persId = pers.id
            }
        })

        const personObject = { name: newName, number: newNumber }

        if (add) {
            PhonebookService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                })

            setClassName("normalMessage")
            setMessage(`Added ${newName}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } else {
            let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

            if (result) {
                PhonebookService.update(persId, personObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== persId ? person : response.data))
                    })
                    .catch(error => {
                        setClassName("error")
                        setMessage(
                            `Information of ${newName} has already been removed from the server`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })

                setClassName("normalMessage")
                setMessage(`Updated number for ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)

            }
        }

        setNewName('')
        setNewNumber('')
        setClassName("normalMessage")
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

    const handleDelete = (id, name) => {
        let result = window.confirm(`Delete ${name} ?`);

        if (result) {
            let newPersons = persons.filter((value) => {
                return value.id !== id
            })
            PhonebookService.remove(id)
                .then(setPersons(newPersons))

            setClassName("normalMessage")
            setMessage(`Removed ${newName}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }

        console.log(`Objects id is: ${id}`);

    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={Message} className={className} />

            <Filter search={search} handleSearchChange={handleSearchChange} />

            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

            <h3>Numbers</h3>
            <PersonList persons={persons} search={search} handleDelete={handleDelete} />
        </div>

    )

}

export default App