'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const cookie_id = Cookies.get('id');
  const token = Cookies.get('token'); 
  const [commissionData, setCommissionData] = useState({ todaysCommission: '0', last7DaysCommission: '0' });
  const [earningsData, setEarningsData] = useState([
    {
      "id": 0,
      "doctor_id": 0,
      "date": "",
      "number_of_patients": 0,
      "total_earnings": 0,
      "doctors_commision": 0
    }
  ]);
  const [newRow, setNewRow] = useState({ start_date: '', end_date: '' });
  
    const fetchCommissionData = async () => {
      console.log('Fetching commission data of Doctor ID: ', cookie_id);
      const result = await axios.get(`http://localhost:4000/doc-financials/ViewDocCommission/${cookie_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(result.data);
      setCommissionData(result.data);
    };

    const fetchEarningsData = async () => {
        const result = await axios.get(`http://localhost:4000/doc-financials/ViewDocEarnings/${cookie_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEarningsData(result.data); // Assuming you have a similar state for earnings data
      };

      const fetchEarningsDataRanged = async (startDate, endDate) => {
        const result = await axios.get(`http://localhost:4000/doc-financials/ViewDocEarnings/${cookie_id}/${startDate}/${endDate}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEarningsData(result.data);
      };
    
      const handleAdd = () => {
        fetchEarningsDataRanged(newRow.start_date, newRow.end_date);
      };

  const handleViewCommission = () => {
    fetchCommissionData();
    setViewTable(true);
    setFormOpen(false);
  }

  const handleViewEarnings = () => {
    fetchEarningsData();
    setFormOpen(true);
    setViewTable(false);
  }

  return (
    <div className='doc-financials-main-area bg-gray-600 h-screen'>
      <div className="doc-financials-area bg-indigo-400 h-auto">
        <div className='doc-financials-title '>
          <p className='doc-financials-text text-4xl text-black p-14 font-bold'>Doctor Financials</p>
        </div>
        <div className='search-bar-area flex justify-end pr-10'>
        <form action="" className="search">
        <input type="text" className='bg-white border-collapse pb-1 pt-1 pl-2 rounded-xl text-start text-black placeholder-black' placeholder='Search' name="" id="" />
        </form>
        </div>
        <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={handleViewCommission}>View Commission</button>
        <button className="bg-green-500 text-white rounded px-6 py-1 ml-5 mb-5" onClick={handleViewEarnings}>View Earnings</button>
        {formOpen && (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
                <label htmlFor="start_date" className='mb-2'>Start Date</label>
                <input type="date" placeholder="Start Date" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3' value={newRow.start_date} onChange={e => setNewRow({ ...newRow, start_date: e.target.value })} />
                <label htmlFor="end_date" className='mb-2'>End Date</label>
                <input type="date" placeholder="End Date" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3' value={newRow.end_date} onChange={e => setNewRow({ ...newRow, end_date: e.target.value })} />
                <button type="submit" className='bg-green-500 text-white rounded px-2 py-1 w-32'>Search Earnings</button>
            </form>
            <div className="commission-data">
            <div className="overflow-x-auto">
                <table className="table">
                <thead>
                    <tr className='text-white text-xl'>
                    <th>ID</th>
                    <th>Doctor ID</th>
                    <th>Date</th>
                    <th>Number of Patients</th>
                    <th>Total Earnings</th>
                    <th>Doctor's Commission</th>
                    </tr>
                </thead>
                <tbody>
                {earningsData.map((row, index) => (
                    <tr className='hover:bg-blue-500 text-white text-lg' key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.doctor_id}</td>
                    <td>{row.date}</td>
                    <td>{row.number_of_patients}</td>
                    <td>{row.total_earnings}</td>
                    <td>{row.doctors_commision}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </div>
        </>
        )}
        {viewTable && (
          <div className="commission-data">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className='text-white text-xl'>
                    <th></th>
                    <th>Today's Commission</th>
                    <th>Last 7 Day's Commission</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='hover:bg-blue-500 text-white text-lg'>
                    <td></td>
                    <td>{commissionData.todaysCommission}</td>
                    <td>{commissionData.last7DaysCommission}</td>
                    </tr>
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