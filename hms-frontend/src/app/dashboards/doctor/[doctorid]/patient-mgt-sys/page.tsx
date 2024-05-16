'use client'
import React, { use, useState } from 'react';
import Prescription from '../../../../components/prescription';

const Page = () => {
    const [showPrescription, setShowPrescription] = useState(false);
    const [id, setId] = useState(1);

    const handlePrescription = (id) => {
        setId(id);
        setShowPrescription(true);
      };

    return (
      <div className="appointment-details">
        {showPrescription ? (
            <Prescription id={id}/>
                ) : (
        <div className="overflow-x-auto">
          <table className="table bg-indigo-300 text-black w-11/12 mx-10 my-10">
            <thead>
              <tr className='text-black text-xl'>
                <th></th>
                <th>Serial No</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-blue-500 text-black text-lg'>
                <th></th>
                <td>1</td>
                <td>19:00</td>
                <td>Waiting</td>
                <td><button className="bg-red-500 text-white rounded px-2 py-1" onClick={() => handlePrescription(1)}>Prescription</button></td>
              </tr>
              <tr className='hover:bg-blue-500 text-black text-lg'>
                <th></th>
                <td>2</td>
                <td>19:15</td>
                <td>Waiting</td>
                <td><button className="bg-red-500 text-white rounded px-2 py-1" onClick={() => handlePrescription(2)}>Prescription</button></td>
              </tr>
              <tr className='hover:bg-blue-500 text-black text-lg'>
                <th></th>
                <td>3</td>
                <td>19:30</td>
                <td>Confirmed</td>
                <td><button className="bg-red-500 text-white rounded px-2 py-1" onClick={() => handlePrescription(3)}>Prescription</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  };

  export default Page;