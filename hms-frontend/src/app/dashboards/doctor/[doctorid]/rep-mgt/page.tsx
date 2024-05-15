'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast'

const Page = () => {
    //const cookie_id = Cookies.get('id');
    const token = Cookies.get('token');
    const [searchId, setSearchId] = useState('');
    const [repData, setRepData] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [viewTable, setViewTable] = useState(false);
    const [appData, setAppData] = useState(null);
    const [viewAppointments, setViewAppointments] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [repName, setRepName] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [repPhone, setRepPhone] = useState('');
    const [repAddress, setRepAddress] = useState('');
    const [repCompany, setRepCompany] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [repStatus, setRepStatus] = useState(repData ? repData.rep_status : 'active');
    const [showRepSearch, setShowRepSearch] = useState('');

    const fetchRepData = async (id) => {
        const result = await axios.get(`http://localhost:4000/rep-mgt/SearchRep/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(result.data);
        if (result.data) {
            setRepData(result.data);
            setViewTable(true);
        } else if (result.data == "") {
            toast.error('No data found');
            setViewTable(false);
        }
    };
    
      const handleSearch = () => {
        fetchRepData(searchId);
      };

      const fetchAppData = async () => {
        const cookie_id = Cookies.get('id');
        console.log("Logged Id: ", cookie_id)
        const result = await axios.get(`http://localhost:4000/rep-mgt/ViewRepAppointments/${cookie_id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // replace with your token
          }
        });
        console.log(result.data);
        if (result.data && result.data.length > 0) {
          setAppData(result.data);
          setViewAppointments(true);
        } else {
          toast.error('No Appointments Today!');
        }
      };

      const handleAddRep = async () => {
        if (!repName || typeof repName !== 'string') {
            toast.error('Invalid name');
            return;
          }
          if (!repEmail || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(repEmail)) {
            toast.error('Invalid email');
            return;
          }
          if (!repPhone || !/^\d{11}$/.test(repPhone)) {
            toast.error('Invalid phone');
            return;
          }
          if (!repAddress || typeof repAddress !== 'string') {
            toast.error('Invalid address');
            return;
          }
          if (!repCompany || typeof repCompany !== 'string') {
            toast.error('Invalid company');
            return;
          }
        
        const result = await axios.post('http://localhost:4000/rep-mgt/AddRep', {
          rep_name: repName,
          rep_email: repEmail,
          rep_phone: "+88" + repPhone,
          rep_address: repAddress,
          rep_company: repCompany
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // replace with your token
          }
        });
        console.log(result.data);
        if (result.data) {
          toast.success('Representative added successfully');
          setShowForm(false);
        } else {
          toast.error('Failed to add representative');
        }
      };

      const handleUpdateRep = async (rep_id) => {
        const updatedRep = {
            rep_email: repEmail,
            rep_phone: repPhone,
            rep_address: repAddress,
            rep_company: repCompany,
            rep_status: repStatus
        };
    
        try {
            console.log('Updated rep: ', updatedRep);
            const result = await axios.patch(`http://localhost:4000/rep-mgt/UpdateRep/${rep_id}`, updatedRep, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (result.status === 200) {
                toast.success('Rep updated successfully');
                setRepData(prevState => ({ ...prevState, ...updatedRep }));
                setShowUpdateForm(false);
                setRepName('');
                setRepPhone('');
                setRepAddress('');
                setRepCompany('');
                setRepStatus(repStatus.VALID);
            } else {
                toast.error('Failed to update rep');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update rep');
        }
    };

    const populateForm = () => {
        setRepName(repData.rep_name);
        setRepEmail(repData.rep_email);
        setRepPhone(repData.rep_phone);
        setRepAddress(repData.rep_address);
        setRepCompany(repData.rep_company);
        setRepStatus(repData.rep_status);
    };

    return (
        <div className='rep-mgt-main-area bg-gray-600 h-screen'>
        <div className="rep-mgt-area bg-indigo-400 h-auto">
        <Toaster />
          <div className='rep-mgt-title '>
            <p className='rep-mgt-text text-4xl text-black p-14 font-bold'>Representative Management</p>
          </div>
          <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => setShowSearch(!showSearch)}>Representative List</button>
          <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => fetchAppData(2)}>Your Representative Appointments of Today</button>
          {showSearch && (
            <div className='search-bar-area flex justify-end pr-10'>
              <div className='flex justify-start items-center space-x-4 pr-10'>
              <button type="button" className="bg-green-500 text-white rounded px-6 py-1" onClick={() => setShowForm(!showForm)}>Add</button>
                <input type="text" className='bg-white border-collapse pb-1 pt-1 pl-2 rounded-xl text-start text-black placeholder-black' placeholder='Search' name="" id="" value={searchId} onChange={e => setSearchId(e.target.value)} />
                <button type="button" className="bg-gray-500 text-white rounded px-6 py-1" onClick={handleSearch}>Search</button>
              </div>
            </div>
          )}
          {showForm && (
            <form className="add-rep-form flex flex-col items-center space-y-4 mt-4 w-1/2 mx-auto">
                <input type="text" className="w-full" placeholder="Name" value={repName} onChange={e => setRepName(e.target.value)} />
                <input type="email" className="w-full" placeholder="Email" value={repEmail} onChange={e => setRepEmail(e.target.value)} />
                <input type="tel" className="w-full" placeholder="Phone" value={repPhone} onChange={e => setRepPhone(e.target.value)} />
                <input type="text" className="w-full" placeholder="Address" value={repAddress} onChange={e => setRepAddress(e.target.value)} />
                <input type="text" className="w-full" placeholder="Company" value={repCompany} onChange={e => setRepCompany(e.target.value)} />
                <button type="button" className="bg-teal-500 text-black rounded px-6 py-1" onClick={handleAddRep}>Add Rep</button>
            </form>
            )}
          {viewTable && repData && (
            <div className="rep-details">
                <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr className='text-white text-xl'>
                        <th>Rep ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className='hover:bg-blue-500 text-white text-lg'>
                        <td>{repData.rep_id}</td>
                        <td>{repData.rep_name}</td>
                        <td>{repData.rep_email}</td>
                        <td>{repData.rep_phone}</td>
                        <td>{repData.rep_address}</td>
                        <td>{repData.rep_company}</td>
                        <td>{repData.rep_status}</td>
                        <td>{repData.rep_created}</td>
                        <td>
                        <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => {setShowUpdateForm(true); populateForm();}}>Update</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            )}
          {viewAppointments && appData && (
            <div className="app-details">
            <div className="overflow-x-auto">
                <table className="table">
                <thead>
                    <tr className='text-white text-xl'>
                    <th>App ID</th>
                    <th>Rep ID</th>
                    <th>Doc ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Note</th>
                    <th>Status</th>
                    <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {appData.map(app => (
                    <tr className='hover:bg-blue-500 text-white text-lg' key={app.rep_app_id}>
                        <td>{app.rep_app_id}</td>
                        <td>{app.rep_id}</td>
                        <td>{app.doc_id}</td>
                        <td>{app.app_date}</td>
                        <td>{app.app_time}</td>
                        <td>{app.app_note}</td>
                        <td>{app.app_status}</td>
                        <td>{app.app_created}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        )}

        {showUpdateForm && (
            <form className="add-rep-form flex flex-col items-center space-y-4 mt-4 w-1/2 mx-auto">
                <input type="text" className="w-full" placeholder="Name" value={repName} onChange={e => setRepName(e.target.value)} readOnly />
                <input type="email" className="w-full" placeholder="Email" value={repEmail} onChange={e => setRepEmail(e.target.value)} />
                <input type="tel" className="w-full" placeholder="Phone" value={repPhone} onChange={e => setRepPhone(e.target.value)} />
                <input type="text" className="w-full" placeholder="Address" value={repAddress} onChange={e => setRepAddress(e.target.value)} />
                <input type="text" className="w-full" placeholder="Company" value={repCompany} onChange={e => setRepCompany(e.target.value)} />
                <select className="w-full" value={repStatus} onChange={e => setRepStatus(e.target.value)}>
                    <option value="valid">Valid</option>
                    <option value="blacklisted">Blacklisted</option>
                </select>
                <button type="button" className="bg-teal-500 text-black rounded px-6 py-1" onClick={() => handleUpdateRep(repData.rep_id)}>Update</button>
            </form>
        )}
        </div>
      </div>
    )
}

export default Page;