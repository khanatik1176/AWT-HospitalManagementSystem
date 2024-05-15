'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const cookie_email = Cookies.get('email');
  const token = Cookies.get('token'); 
  const [newRow, setNewRow] = useState({ id: '', patient_email: cookie_email, doctor_name: '', appointment_date: '', appointment_time: '' });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:4000/appointment/viewAppointmentDetails/${cookie_email}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setTableData(result.data);
      console.log(result.data)
    };

    fetchData();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/appointment/cancel/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.status === 200) {
        setTableData(tableData.filter(row => row.id !== id));
        window.location.reload();
      } else {
        console.error('Error cancelling appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment', error.message);
    }
  }

  const handleAdd = async () => {
    const data = { ...newRow, id: tableData.length + 1, patient_email: cookie_email };
    try {
      const response = await axios.post('http://localhost:4000/appointment/schedule', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(response); // Log the entire response object
      if(response.status === 201) {
        setTableData([...tableData, data]);
        setNewRow({ id: '', patient_email: cookie_email, doctor_name: '', appointment_date: '', appointment_time: '' });
        setFormOpen(false);
        window.location.reload(); // Add this line
      } else {
        console.error('Error adding appointment');
      }
    } catch (error) {
      console.error('Error adding appointment', error.message);
    }
  }
  return (
    <div className='appointment-main-area bg-gray-600 h-screen'>
      <div className="appointment-area bg-indigo-400 h-auto">
        <div className='appointment-title '>
          <p className='appointment-text text-4xl text-black p-14 font-bold'>Appointment</p>
        </div>
        <div className='search-bar-area flex justify-end pr-10'>
        <form action="" className="search">
        <input type="text" className='bg-white border-collapse pb-1 pt-1 pl-2 rounded-xl text-start text-black placeholder-black' placeholder='Search' name="" id="" />
        </form>
        </div>
        <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => setViewTable(!viewTable)}>View</button>
        <button className="bg-green-500 text-white rounded px-6 py-1 ml-5 mb-5" onClick={() => setFormOpen(!formOpen)}>Add</button>
        {formOpen && (
        <form className="bg-indigo-300 shadow-md rounded px-8 pt-6 pb-8 ml-5 mb-4 flex flex-col w-2/6 items-center" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
          <label htmlFor="" className='text-black font-bold text-xl mb-2'> Your Doctor Name :</label>
        <input type="text" className='w-72 h-10 rounded text-black bg-stone-400 mb-5 pl-3 pr-5 placeholder:text-black font-bold' placeholder="Doctor Name" value={newRow.doctor_name} onChange={e => setNewRow({ ...newRow, doctor_name: e.target.value })} />
        <label htmlFor="" className='text-black font-bold text-xl mb-2'> Appointment Date:</label>
        <input type="date" placeholder="Appointment Date" className='w-72 h-10 rounded text-black bg-stone-400 mb-5 pl-3 pr-5 font-bold' value={newRow.appointment_date} onChange={e => setNewRow({ ...newRow, appointment_date: e.target.value })} />
        <label htmlFor="" className='text-black font-bold text-xl mb-2'> Appointment Time:</label>
        <input type="time" placeholder="Appointment Time" className='w-72 h-10 rounded text-black bg-stone-400 mb-5 pl-3 pr-5 font-bold'  value={newRow.appointment_time} onChange={e => setNewRow({ ...newRow, appointment_time: e.target.value })} />
        <button type="submit" className='bg-green-500 text-white rounded px-2 py-1 w-32'>Add</button>
        </form>
      )}
        {viewTable && (
          <div className="appointment-details">
            <div className="overflow-x-auto">
              <table className="table bg-indigo-300 text-black w-11/12 mx-10 my-10">
                <thead>
                  <tr className='text-black text-xl'>
                    <th></th>
                    <th>Patient Email</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(row => (
                    <tr className='hover:bg-blue-500 text-black text-lg' key={row.id}>
                      <th></th>
                      <td>{row.patient_email}</td>
                      <td>{row.doctor_name}</td>
                      <td>{row.appointment_date}</td>
                      <td>{row.appointment_time}</td>
                      <td><button className="bg-red-500 text-white rounded px-2 py-1" onClick={() => handleCancel(row.id)}>Cancel</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page;