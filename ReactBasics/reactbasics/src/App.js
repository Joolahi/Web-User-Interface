import React from 'react';
import './App.css';
import Person from './Person';

const persons = [
  {
    name: "Kirsi Kernel",
    image: "https://randomuser.me/api/portraits/women/31.jpg"
  },
  {
    name: "Matti Mainio",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Matti Merkusson",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];

function App() {

  return (
    <div>
      <h1>Persons</h1>
      <div>
        {
          persons.map((person, index) => (
            <Person key={index} person={person} />
          ))
        }
        {/* 
         Other way to do what is above:

        {
          persons.map((person, index) => {
            return <Person key={index} person={person} />;
          })
        }
        */}
      </div>
    </div>
  )
}

export default App;