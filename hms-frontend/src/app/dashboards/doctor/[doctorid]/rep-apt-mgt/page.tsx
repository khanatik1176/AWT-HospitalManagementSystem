'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast'

const Page = () => {
    const [repId, setRepId] = useState('');
    const [appDate, setAppDate] = useState('');
    const [appTime, setAppTime] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [viewTable, setViewTable] = useState(false);
    const [repAppId, setRepAppId] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const token = Cookies.get('token');
    const [showSearch, setShowSearch] = useState(false);
    const [searchId, setSearchId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const docId = Cookies.get('id');
        const appStatus = 'confirmed';
        const appCreated = new Date().toISOString();

        const data = {
            rep_id: repId,
            app_date: appDate,
            app_time: appTime,
            doc_id: docId,
            app_status: appStatus,
            app_created: appCreated,
        };

        try {
        const response = await axios.post(`http://localhost:4000/rep-mgt/AddRepAppointment`, data, {
            headers: {
            'Authorization': `Bearer ${token}` // replace with your token
            }
        });
        console.log(response.data);
        if (response.data) {
            setAppDate(response.data);
            //setViewAppointments(true);
            toast.success('Rep Appointment Added Successfully!');
            setFormOpen(false);
        } else {
            toast.error('Failed to add appointment');
        }
        } catch (error) {
        console.error(error);
        toast.error('Failed to add appointment');
        }
    };

    const handleSearch = async () => {
        try {
          const result = await axios.get(`http://localhost:4000/rep-mgt/SearchRepAppointment/${searchId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          setSearchResults(result.data);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className='appointment-main-area bg-gray-600 h-screen'>
          <div className="appointment-area bg-indigo-400 h-auto">
            <div className='appointment-title '>
              <p className='appointment-text text-4xl text-black p-14 font-bold'>Representative Appointment Management</p>
            </div>
            <div className='search-bar-area flex justify-end pr-10'>
            </div>
            <button className="bg-green-500 text-white rounded px-6 py-1 ml-16" onClick={() => setFormOpen(!formOpen)}>Create</button>
            <button className="bg-white text-black rounded px-6 py-1 ml-5 mb-5" onClick={() => setShowSearch(true)}>Search</button>
            {formOpen && (
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" onSubmit={handleSubmit}>
                <input type="text" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' placeholder="Rep ID" value={repId} onChange={e => setRepId(e.target.value)} />
                <input type="date" placeholder="Appointment Date" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3' value={appDate} onChange={e => setAppDate(e.target.value)} />
                <input type="time" placeholder="Appointment Time" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3' value={appTime} onChange={e => setAppTime(e.target.value)} />
                <button type="submit" className='bg-green-500 text-white rounded px-2 py-1 w-32'>Add</button>
              </form>
            )}
            {showSearch && (
                <div className='search-bar-area flex justify-end pr-10'>
                <div className='flex justify-start items-center space-x-4 pr-10'>
                    <input type="text" className='bg-white border-collapse pb-1 pt-1 pl-2 rounded-xl text-start text-black placeholder-black' placeholder='Search' name="" id="" value={searchId} onChange={e => setSearchId(e.target.value)} />
                    <button type="button" className="bg-gray-500 text-white rounded px-6 py-1" onClick={handleSearch}>Find</button>
                </div>
                </div>
            )}
            {searchResults && (
              <div className="rep-details">
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr className='text-white text-xl'>
                        <th>Rep App ID</th>
                        <th>Rep ID</th>
                        <th>Doc ID</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Created</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='hover:bg-blue-500 text-white text-lg'>
                        <td>{searchResults.rep_app_id}</td>
                        <td>{searchResults.rep_id}</td>
                        <td>{searchResults.doc_id}</td>
                        <td>{searchResults.app_date}</td>
                        <td>{searchResults.app_time}</td>
                        <td>{searchResults.app_note}</td>
                        <td>{searchResults.app_status}</td>
                        <td>{searchResults.app_created}</td>
                        {/* <td>
                            <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => {setShowUpdateForm(true); populateForm();}}>Update</button>
                        </td> */}
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