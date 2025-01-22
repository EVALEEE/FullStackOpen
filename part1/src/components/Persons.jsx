import React from 'react'

const Persons = ({ result, persons, deletePerson }) => {
    const displayPersons = result.length === 0
        ? persons.map(person =>
            <div key={person.id}>
                <p>
                    {person.name} {person.number}
                </p>
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
        )
        : result.map(person =>
            <div key={person.id}>
                <p>
                    {person.name} {person.number}
                </p>
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
        )

    return (
        <div>
            {displayPersons}
        </div>
    )
}

export default Persons