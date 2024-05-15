'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/solid';

function convertTo24Hour(time) {
  if (typeof time !== 'string' || !time.includes(':')) {
      return time;
  }

  let [hours, minutes] = time.split(':')[0].split(' ');
  minutes = time.split(':')[1].split(' ')[0];
  const period = time.split(' ')[1];

  if (period === 'PM' && hours < 12) hours = Number(hours) + 12;
  if (period === 'AM' && hours === '12') hours = '00';

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

function convertTo12Hour(time) {
  let [hours, minutes] = time.split(':');
  let period = 'AM';

  if (hours >= 12) {
      hours -= 12;
      period = 'PM';
  }
  if (hours === 0) hours = 12;

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return `${hours}:${minutes} ${period}`;
}

const Page = () => {
    const token = Cookies.get('token');

    const [schedules, setSchedules] = useState([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState({ schedule_id: '', schedule_date: '', schedule_start_time: '', schedule_end_time: '', schedule_status: '' });
    const schedule_start_time_24h = convertTo24Hour(currentSchedule.schedule_start_time);
    const schedule_end_time_24h = convertTo24Hour(currentSchedule.schedule_end_time);
    const [isTableVisible, setTableVisible] = useState(true);
    const [isCreateFormOpen, setCreateFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newSchedule, setNewSchedule] = useState({schedule_date: '', schedule_start_time: '', schedule_end_time: '', schedule_status: 'confirmed'});
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleEditClick = (schedule) => {
      const schedule_start_time_24h = convertTo24Hour(schedule.schedule_start_time);
      const schedule_end_time_24h = convertTo24Hour(schedule.schedule_end_time);
  
      setCurrentSchedule({
          ...schedule,
          schedule_start_time: schedule_start_time_24h,
          schedule_end_time: schedule_end_time_24h
      });
      setFormOpen(true);
  };

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:4000/schedule-mgt/ShowAllSchedule', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSchedules(response.data);
            } catch (error) {
                toast.error('Error fetching data');
            }
        };
        
        fetchSchedules();

    }, []);

    

    const handleSaveChanges = async () => {

              const token = Cookies.get('token');

              const schedule_start_time_12h = convertTo12Hour(currentSchedule.schedule_start_time);
              const schedule_end_time_12h = convertTo12Hour(currentSchedule.schedule_end_time);

              const updatedSchedule = {
                  ...currentSchedule,
                  schedule_start_time: schedule_start_time_12h,
                  schedule_end_time: schedule_end_time_12h
              };

              const response = await axios.patch(`http://localhost:4000/schedule-mgt/UpdateSchedule/${currentSchedule.schedule_id}`, updatedSchedule, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              setTimeout(() => {
                window.location.reload();
              }, 5000);
      };
      
      const filteredSchedules = schedules.filter((schedule) => {
        const scheduleDate = new Date(schedule.schedule_date);
        return (
          (schedule.schedule_id.toString().includes(searchTerm) ||
          schedule.schedule_date.includes(searchTerm)) &&
          scheduleDate >= today
        );
      });

      const handleCreate = (e) => {
        // Convert the date and time to the required format
        e.preventDefault();
        const schedule_start_time = new Date(`1970-01-01T${newSchedule.schedule_start_time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const schedule_end_time = new Date(`1970-01-01T${newSchedule.schedule_end_time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
        // Prepare the data to be sent
        const data = {
          schedule_date: newSchedule.schedule_date,
          schedule_start_time,
          schedule_end_time,
          schedule_status: newSchedule.schedule_status
        };
      
        // Send the POST request
        axios.post('http://localhost:4000/schedule-mgt/CreateSchedule', data)
          .then(response => {
            console.log(response.data);
            setTimeout(() => {
              setCreateFormOpen(false);
            }, 5000); // Delay of 5 seconds
          })
          .catch(error => {
            console.error(error);
          });
      };

    return (
        <div className='appointment-main-area bg-gray-600 h-screen'>
          <div className="appointment-area bg-indigo-400 h-auto">
            <div className='appointment-title '>
              <p className='appointment-text text-4xl text-black p-14 font-bold'>Schedule Mgt</p>
            </div>
            <div className="flex justify-end items-center mb-4 space-x-4">
            <button 
              className="bg-green-500 text-white rounded px-6 py-1" 
              onClick={() => setCreateFormOpen(true)}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
              <input 
                type="text" 
                placeholder="Search by date, id..." 
                className="p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="rep-details">
            {!isCreateFormOpen && (
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='text-white text-xl'>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredSchedules.map((schedule) => (
                      <tr key={schedule.schedule_id} className='hover:bg-blue-500 text-white text-lg'>
                        <td>{schedule.schedule_id}</td>
                        <td>{schedule.schedule_date}</td>
                        <td>{schedule.schedule_start_time}</td>
                        <td>{schedule.schedule_end_time}</td>
                        <td>{schedule.schedule_status}</td>
                        <td>
                          <button className="bg-gray-500 text-white rounded px-6 py-1 ml-16" onClick={() => { handleEditClick(schedule); setTableVisible(false); }}>Edit</button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
        {isFormOpen && (
        
        <div className="card w-96 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Edit Schedule</h2>
    <div>
    <form>
            <div className="flex flex-col items-center space-y-2">
                <input type="date" value={currentSchedule.schedule_date} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_date: e.target.value})} />
                <input type="time" value={currentSchedule.schedule_start_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_start_time: e.target.value})} />
                <input type="time" value={currentSchedule.schedule_end_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_end_time: e.target.value})} />
                <select value={currentSchedule.schedule_status} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_status: e.target.value})}>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className='bg-green-500 text-white rounded px-2 py-1 w-32' onClick={handleSaveChanges}>Save Changes</button>
                <button className="bg-red-500 text-white rounded px-2 py-1 w-32" onClick={() => setFormOpen(false)}>Deny</button>
                </div>
            </form>
            </div>
          </div>
        </div>
        )}
        
        <div className="flex justify-center items-center h-screen">
        {isCreateFormOpen && (
        <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Create Schedule</h2>
          <div>
            <form>
              <div className="flex flex-col items-center space-y-2">
                <input type="date" value={newSchedule.schedule_date} onChange={(e) => setNewSchedule({...newSchedule, schedule_date: e.target.value})} />
                <label className="text-white">Start Time</label>
                <input type="time" value={newSchedule.schedule_start_time} onChange={(e) => setNewSchedule({...newSchedule, schedule_start_time: e.target.value})} />
                <label className="text-white">End Time</label>
                <input type="time" value={newSchedule.schedule_end_time} onChange={(e) => setNewSchedule({...newSchedule, schedule_end_time: e.target.value})} />
                <button className='bg-green-500 text-white rounded px-2 py-1 w-32' onClick={handleCreate}>Create</button>
                <button className="bg-red-500 text-white rounded px-2 py-1 w-32" onClick={() => setCreateFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      </div>
         </div>
        </div>

    );
}

export default Page;