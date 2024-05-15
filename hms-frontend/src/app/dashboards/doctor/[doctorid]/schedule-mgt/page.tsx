'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast'

const Page = () => {
    const token = Cookies.get('token');

    const [schedules, setSchedules] = useState([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState({ schedule_id: '', schedule_date: '', schedule_start_time: '', schedule_end_time: '', schedule_status: '' });

    const handleEditClick = (schedule) => {
        setCurrentSchedule(schedule);
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
        try {
          const token = Cookies.get('token');
          const response = await axios.post(`http://localhost:4000/schedule-mgt/UpdateSchedule/${currentSchedule.schedule_id}`, currentSchedule, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.data) {
            toast.success('Schedule updated successfully!');
            setFormOpen(false);
          } else {
            toast.error('Failed to update schedule');
          }
        } catch (error) {
          console.error(error);
          toast.error('Failed to update schedule');
        }
      };

    return (
        <div className='appointment-main-area bg-gray-600 h-screen'>
          <div className="appointment-area bg-indigo-400 h-auto">
            <div className='appointment-title '>
              <p className='appointment-text text-4xl text-black p-14 font-bold'>Schedule Mgt</p>
            </div>
            <div className="rep-details">
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
                        {schedules.map(schedule => (
                            <tr key={schedule.schedule_id} className='hover:bg-blue-500 text-white text-lg'>
                                <td>{schedule.schedule_id}</td>
                                <td>{schedule.schedule_date}</td>
                                <td>{schedule.schedule_start_time}</td>
                                <td>{schedule.schedule_end_time}</td>
                                <td>{schedule.schedule_status}</td>
                                <td>
                                    <button className="bg-gray-500 text-white rounded px-6 py-1 ml-16" onClick={() => handleEditClick(schedule)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {isFormOpen && (
        <form>
            <div className="flex flex-col items-center space-y-2">
                {/* <input type="date" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' value={currentSchedule.schedule_date} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_date: e.target.value})} />
                <input type="time" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' value={currentSchedule.schedule_start_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_start_time: e.target.value})} />
                <input type="time" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' value={currentSchedule.schedule_end_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_end_time: e.target.value})} />
                <input type="text" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' value={currentSchedule.schedule_status} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_status: e.target.value})} /> */}
                <input type="date" value={currentSchedule.schedule_date} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_date: e.target.value})} />
                <input type="time" value={currentSchedule.schedule_start_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_start_time: e.target.value})} />
                <input type="time" value={currentSchedule.schedule_end_time} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_end_time: e.target.value})} />
                <input type="text" value={currentSchedule.schedule_status} onChange={(e) => setCurrentSchedule({...currentSchedule, schedule_status: e.target.value})} />
                <button className='bg-green-500 text-white rounded px-2 py-1 w-32' onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </form>
        )}
         </div>
        </div>

    );
}

export default Page;