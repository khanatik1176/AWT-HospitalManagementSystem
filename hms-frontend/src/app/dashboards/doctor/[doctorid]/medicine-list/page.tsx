'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FeedbackTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [viewMedicineList, setViewMedicineList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMedicine, setNewMedicine] = useState({
    med_name: '',
    med_type: '',
    med_generic: '',
    med_qty_per_strip: '',
    med_strip_per_box: '',
    med_manufacturer: '',
    med_description: '',
    med_image: null
  });
  const [addMedicineFormOpen, setAddMedicineFormOpen] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedbacks, setViewFeedbacks] = useState(false);
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ id: '', email: '', rating: '', feedback: '', date: new Date().toLocaleDateString('en-CA') });  const cookie_email = Cookies.get('email');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchMedicines = async () => {
      const result = await axios.get('http://localhost:4000/medicine-list/ViewMedicineList', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMedicines(result.data);
    };
  
    fetchMedicines();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddMedicine = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newMedicine).forEach(key => {
        formData.append(key, newMedicine[key]);
      });
      await axios.post('http://localhost:4000/medicine-list/AddMedicine', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setAddMedicineFormOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setNewMedicine({...newMedicine, med_image: event.target.files[0]});
  };

  const handleInputChange = (event) => {
    setNewMedicine({...newMedicine, [event.target.name]: event.target.value});
  };

  const handleFileUpload = async () => {
  if (!file) {
    alert('No file selected');
    return;
  }

  // First, add the new medicine
  try {
    const medicineData = {
      // Add your medicine data here
    };
    const addMedicineResponse = await axios.post('http://localhost:4000/medicine-list/AddMedicine', medicineData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // If the medicine was added successfully, upload the image
    if (addMedicineResponse.status === 200) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await axios.post(`http://localhost:4000/medicine-list/UploadMedicineImage/${addMedicineResponse.data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(uploadResponse.data);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setFile(null);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


  return (
    <div className='feedback-main-area bg-gray-600 h-screen'>
      <div className="feedback-area bg-indigo-400 h-auto">
        <div className='feedback-title '>
          <p className='feedback-text text-4xl text-black p-14 font-bold'>Feedback</p>
        </div>
        <button className="bg-green-500 text-white rounded px-6 py-1 ml-5 mb-5" onClick={() => setViewMedicineList(!viewMedicineList)}>View Medicine List</button>
        {/* <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => setAddMedicineFormOpen(!addMedicineFormOpen)}>Add Medicine</button> */}
        {addMedicineFormOpen && (
        <form onSubmit={handleAddMedicine} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          
          <label className="input input-bordered flex items-center gap-2">
            Medicine Name
            <input type="text" name="med_name" onChange={handleInputChange} required className="grow input-md" placeholder="Medicine Name" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Medicine Type
            <select name="text" onChange={handleInputChange} required className="grow input-md">
              <option value="">Select a type</option>
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
              <option value="drops">Drops</option>
              <option value="cream">Cream</option>
              <option value="ointment">Ointment</option>
            </select>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Generic Name
            <input type="text" name="med_generic" onChange={handleInputChange} required className="grow input-md" placeholder="Generic Name" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Quantity Per Strip
            <input type="number" name="med_qty_per_strip" onChange={handleInputChange} required className="grow input-md" placeholder="Quantity Per Strip" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Strip Per Box
            <input type="number" name="med_strip_per_box" onChange={handleInputChange} required className="grow input-md" placeholder="Strip Per Box" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Manufacturer
            <input type="text" name="med_manufacturer" onChange={handleInputChange} required className="grow input-md" placeholder="Manufacturer" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <textarea name="med_description" onChange={handleInputChange} required className="grow input-md" placeholder="Description" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Image
            <input type="file" name="med_image" onChange={handleImageChange} required className="grow input-md" />
          </label>
          <button className="bg-green-500 text-white rounded px-6 py-1 ml-5 mb-5" onClick={handleAddMedicine}>Add Medicine</button>
        </form>
      )}
        {viewMedicineList && (
        <div className="medicine-details">
          <div className="overflow-x-auto">
          <input 
            type="text" 
            placeholder="Search by name or generic" 
            className="shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 w-1/4 float-right mr-10 bg-white placeholder:text-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />
            <table className="table bg-indigo-300 text-black w-11/12 mx-10 my-10">
            <thead>
                <tr className='text-black text-xl'>
                  <th>Medicine Name</th>
                  <th>Generic</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
              {medicines.filter(medicine => 
                medicine.med_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                medicine.med_generic.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(medicine => (
                <tr className='hover:bg-blue-500 text-black text-lg' key={medicine.med_id}>
                    <td>{medicine.med_name}</td>
                    <td>{medicine.med_generic}</td>
                    <td>{medicine.med_status}</td>
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

export default FeedbackTable;