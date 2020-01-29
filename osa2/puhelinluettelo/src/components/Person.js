import React from "react"

const PersonList = ({ persons, search, handleDelete }) => {
    console.log(persons);
    console.log(search);
    let newPersons = []
    if(search === ''){
        newPersons = persons.concat()
    }else{
        persons.forEach(element => {
            if(element.name.toLowerCase().includes(search.toLowerCase())){
                newPersons.push(element)
            }        
        });
    }

    return (
        <div>
            {newPersons.map((newPersons, i) =>
                <Person key={i} name={newPersons.name} number={newPersons.number} handleDelete={() => handleDelete(newPersons.id, newPersons.name)}/>)}
        </div>
    )
}

const Person = (props) => {
    return (
        <div>
            {props.name} {props.number}
            <button onClick={props.handleDelete}>delete</button>
        </div>
    )
}

export default PersonList