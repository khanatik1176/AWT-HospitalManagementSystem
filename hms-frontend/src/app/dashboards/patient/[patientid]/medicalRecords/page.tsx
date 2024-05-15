'use client'
import React, { useState, useRef, useEffect } from 'react'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';

const token = Cookies.get('token');

const MedicalRecords = () => {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);
  const fileInputRef = useRef(); 

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:4000/medical-record/viewAllRecords', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, [file]);  // Add file to the dependency array

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/medical-record/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setFile(null);
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
            className="file-input file-input-bordered file-input-sm w-full max-w-xs ml-10 mb-10 mr-5" 
            onChange={handleFileChange} 
            ref={fileInputRef} 
          />
          <button 
            className="file-upload-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFileUpload}
          >
            Upload
          </button>
          <button 
            className="view-records-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={() =>   setShowRecords(!showRecords)}
          >
            {showRecords ? 'Hide' : 'View'} Medical Records
          </button>
        </div>
        {showRecords && (
          <div className="overflow-x-auto">
            <table className="table bg-indigo-300 shadow-md rounded px-8 pt-6 pb-8 text-black w-2/3 mx-10 my-10">
              <thead>
                <tr className='text-black text-xl'>
                  <th></th>
                  <th>File Name</th>
                </tr>
              </thead>
              <tbody>
              {records.map((record, index) => {
              console.log(record); 
              return (
              <tr className='hover:bg-blue-500 text-black text-xl' key={index}>
              <th></th>
                <td>
                <a 
  href="#" 
  onClick={async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/medical-record/download/${record.filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', record.originalname);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }}
>
          {record.originalname}
        </a>
       </td>
       </tr>
          );
        })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalRecords;