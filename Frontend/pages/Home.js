import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [employees, setEmployees] = useState([])
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [newName, setNewName] = useState('')

    // FETCHING EMPLOYEES
    useEffect(() => {
        fetchEmployees();
    }, [])

    const fetchEmployees = () => {
        axios
        .get('http://localhost:3001/employees')
        .then((res) => {
            setEmployees(res.data)
            console.log(res.data)
        })
    }

    //SUBMITTING FORM
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/create', { name, age })
        .then(() => {
            console.log('Employee Added')
            setName('')
            setAge('')
            fetchEmployees();
        })
        .catch((error) => {
            console.log('Unable to add employee')
        })
    }


    //UPDATE Employee NAME
    const updateName = (id) => {
        axios
        .put('http://localhost:3001/employees', { name: newName, id: id })
        .then(() => {
            console.log('Employee was updated')
            fetchEmployees();
        })
        .catch((error) => {
            console.log('Unable to update employee Name')
        })
    }


    //DELETING EMPLOYEE
    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:3001/employees/${id}`)
        .then(() => {
            console.log('employee deleted')
            fetchEmployees();
        })
        .catch((error) => {
            console.log('Unable to delete employee')
        })
    }



  return (
    <div className='w-full h-[1200px]'>
        <h1 className='text-center text-zinc-300 p-5 text-3xl'>EMPLOYEE FORM</h1>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
                {/* Employee Name Input */}
                <label className='text-white'>Employee Name</label>
                <br />
                <input className='w-[400px] h-[50px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                {/* Employee Age Input */}
                <label className='text-white'>Employee Age</label>
                <br />
                <input className='w-[400px] h-[50px] bg-zinc-600 p-2 text-white rounded-lg border-orange-600 border'
                type='number'
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(e.target.value)} />
                <br />
                <br />
                <button className='w-[400px] h-[50px] text-white border bg-[#1a1a1a] hover:bg-zinc-800'
                type='submit'>Submit Form</button>
            </form>
        </div>
        <br />
        <br />
        <hr />
        <br />
         <div className='text-white text-center p-5'>
            <h1 className='text-3xl'>EMPLOYEES</h1>
            <div>
                {
                    employees.map(employee => 
                        <div key={employee.id}>
                            <ul>
                                <li className='p-4'>
                                    <button className='translate-x-[-20px] font-bold hover:text-zinc-700'
                                    onClick={() => handleDelete(employee.id)}>X</button>{employee.name}
                                    <input className='bg-zinc-600 p-1'
                                    type='text'
                                    placeholder='Update Name'
                                    onChange={(e) => setNewName(e.target.value)}/>
                                    <button className='border hover:bg-teal-900/80'
                                    onClick={() => updateName(employee.id)}>Update</button></li>
                                <li>{employee.age}</li>
                            </ul>
                        </div>)
                }
            </div>
        </div>   
    </div>
  )
}

export default Home