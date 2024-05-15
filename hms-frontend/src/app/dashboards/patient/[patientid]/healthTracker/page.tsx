'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const HealthTracker = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [bmi, setBmi] = useState(null);
  const [bmiOpen, setBmiOpen] = useState(false);
  const [healthTracker, setHealthTracker] = useState([]);
  const [healthDetailsOpen, setHealthDetailsOpen] = useState(false);
  const [viewHealthTracker, setViewHealthTracker] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);

  const cookie_email = Cookies.get('email');
  const token = Cookies.get('token');

  const viewHealthTrackerButtonRef = useRef(null); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/healthtracker/healthTrackerByEmail/${cookie_email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setHealthTracker(result.data);
        console.log(result.data)
      } catch (error) {
        console.error('Error fetching health tracker data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateBmi = async (id) => { 
    try {
      const result = await axios.get(`http://localhost:4000/healthtracker/BMI/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if(result.status === 200 && result.data && 'Bmi' in result.data && 'status' in result.data) {
        setBmi(result.data.Bmi);
        setHealthStatus(result.data.status);
        setBmiOpen(true);
  
        setTimeout(() => {
          window.location.reload();
          setBmiOpen(false);
        }, 5000);
      } else {
        console.error('Unexpected response data from server:', result.data);
      }
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  const handleAddHealthDetails = async (event) => {
    event.preventDefault();
  
    const healthDetails = {
      patient_height: height,
      patient_weight: weight,
      patient_age: age,
      patient_email: cookie_email,
      healthTracker_Status: 'Enabled',
    };

    const result = await axios.post(`http://localhost:4000/healthtracker/AddHealthTracker`, healthDetails, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if(result.status === 201) {
      console.log(result.data);
      window.location.reload(); // reload the page
    } else {
      console.error('Error adding health details');
    }
  };

  const disableHealthTracker = async (id) => {
    try {
      const result = await axios.put(`http://localhost:4000/healthtracker/modify/${id}`, {
        healthTracker_Status: 'Disabled',
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if(result.status === 200) {
        console.log(result.data);
        window.location.reload(); // reload the page
      } else {
        console.error('Error disabling health tracker');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewHealthTracker = () => {
    setViewHealthTracker(!viewHealthTracker);
    if (viewHealthTrackerButtonRef.current) {
      setTimeout(() => {
        viewHealthTrackerButtonRef.current.style.display = 'none'; // Hide the button after 10 seconds
        window.location.reload(); // Reload the page after 10 seconds
      }, 20000);
    }
  };

  return (
    <div className='healthtracker-main-area bg-gray-600 h-screen'>
      <div className="health-tracker-area bg-indigo-400 h-auto">
        <div className="healthtracker-title-area">
          <p className="healthtracker-title text-4xl text-black p-14 font-bold">
            Health Tracker Panel 
          </p>
        </div>
        <div className="healthTrackerform">
          <button className="bg-green-500 hover:bg-green-700 text-white rounded px-6 py-1 ml-12 mb-5" onClick={() => setHealthDetailsOpen(!healthDetailsOpen)}>Add Health Details</button>
          {healthDetailsOpen && (
          <form className="bg-indigo-300 shadow-md rounded px-8 pt-6 pb-8 ml-5 mb-4 flex flex-col w-2/6 items-center" onSubmit={handleAddHealthDetails}>

          <label htmlFor="" className='text-black font-bold text-xl mb-2'> Your Height in cm:</label>
          <input type="number" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' placeholder="Height in cm" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          <label htmlFor="" className='text-black font-bold text-xl mb-2'>Your Weight in Kg:</label>
          <input type="number" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' placeholder="Weight in kg" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          <label htmlFor="" className='text-black font-bold text-xl mb-2'>Your Age:</label>
          <input type="number" className='w-72 h-10 rounded text-black bg-white mb-5 pl-3 placeholder:text-black' placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />

          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white rounded px-2 py-1 w-32'>Submit</button>
          </form>
          )}

          {bmi && bmiOpen && (
            <div className="card w-96 bg-indigo-300 text-primary-content ml-10 mb-5">
              <div className="card-body">
                <h2 className="card-title">Your BMI</h2>
                <p>{bmi}</p>
                <h2 className='card-title'>Your Health Condition is: {healthStatus}</h2>
              </div>
            </div>
          )}

          <button 
            ref={viewHealthTrackerButtonRef} 
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-1 ml-6 mb-5" 
            onClick={handleViewHealthTracker} 
          >
            View Health Tracker
          </button>
          
          {viewHealthTracker && healthTracker.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table bg-indigo-300 text-black w-1/3 mx-10 my-10">
                <thead>
                  <tr className='text-black text-xl'>
                    <th></th>
                    <th>Patient Email</th>
                    <th>Patient Height</th>
                    <th>Patient Weight</th>
                    <th>Patient Age</th>
                    <th>Health Tracker Status</th>
                  </tr>
                </thead>
                <tbody>
                {healthTracker.map((detail, index) => (
                  <tr className='hover:bg-blue-500 text-black text-lg' key={index}>
                <th></th>
                <td>{detail.patient_email}</td>
                <td>{detail.patient_height}</td>
                <td>{detail.patient_weight}</td>
                <td>{detail.patient_age}</td>
                <td>{detail.healthTracker_Status}</td>
                <td>
                <button 
                className="bg-red-500 hover:bg-red-700 text-black rounded px-6 py-1 ml-5 mb-5" 
                  onClick={() => disableHealthTracker(detail.id)}
                    >
                    Disable
                  </button>
                  </td>
                    <td>
                  <button 
                  className="bg-yellow-500 hover:bg-yellow-700 text-black rounded px-6 py-1 ml-5 mb-5" 
                  onClick={() => calculateBmi(detail.id)}
                  >
                  Check BMI
                  </button>
                  </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HealthTracker;