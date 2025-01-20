import React from 'react'

const Persons = ({ result, persons }) => {
    const displayPersons = result.length === 0
        ? persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
        : result.map(person => <p key={person.name}>{person.name} {person.number}</p>);

    return (
        <div>
            {displayPersons}
        </div>
    )
}

export default Persons