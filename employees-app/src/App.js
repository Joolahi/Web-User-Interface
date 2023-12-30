import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function Employee(props) {
  return (
    <div className='card'>
      <h3>{props.employee.last_name} {props.employee.first_name}</h3>
      <img src={props.employee.image} alt='' className='picture'></img>
      <p>{props.employee.title}</p>
      <p>{props.employee.department}</p>
      <p>{props.employee.email}</p>
      <p>{props.employee.phone}</p>
    </div>
  )
}

function App() {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])

  const employeeItem = employees.map((employee, index) =>
    <Employee key={index} employee={employee} />);

  return (
    <div className='App'>
      <div className='employee-container'>
        {employeeItem}
      </div>
    </div>
  )

}
export default App;