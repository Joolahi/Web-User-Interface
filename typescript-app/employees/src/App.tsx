import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

interface EmployeeData {
  employee: {
    last_name: string;
    first_name: string;
    title: string;
    email: string;
    department: string;
    phone: string;
    image: string;
  }
}

function Employee(props: EmployeeData){
  return(
    <div className='card'>
      <h3>
        {props.employee.last_name}, {props.employee.first_name}
      </h3>
      <img src={props.employee.image} alt='' className='picture'></img>
      <p>{props.employee.title}</p>
      <p>{props.employee.department}</p>
      <p>{props.employee.phone}</p>
      <p>{props.employee.email}</p>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState<Array<EmployeeData['employee']>>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/employees')
    .then((response) => {
      setEmployees(response.data);
    })
  }, []);

  const employeeCards = employees.map((employee, index) => {
    return(
      <Employee key={index} employee={employee}/>
    );
  }) as React.ReactNode


  return (
    <div className='app'>
      <div className='employee-container'>{employeeCards}</div>
    </div>
  );
}

export default App;
