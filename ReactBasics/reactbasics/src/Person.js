import React from 'react';

export default function Person({ person }) {
    return (
        <div>
            <img src={person.image}/>
            <p>{person.name}</p>
        </div>
    )
}