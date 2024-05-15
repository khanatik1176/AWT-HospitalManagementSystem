'use'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';

const MedicalRecords = () => {
  // ...

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='medicalRecords-main-area bg-gray-600 h-screen'>
      <div className="medicalRecords-area bg-indigo-400 h-auto">
        <div className="medicalRecordsTitle-area">
          <p className="medicalRecordsTitle text-4xl text-black p-14 font-bold">Medical Records Panel</p>
        </div>
        <div className="fileupload-area">
          <input 
            type="file" 
            className="file-input file-input-bordered file-input-sm w-full max-w-xs ml-10 mb-10" 
            onChange={handleFileUpload} 
          />
        </div>
        {/* ... */}
      </div>
    </div>
  )
}

export default MedicalRecords;