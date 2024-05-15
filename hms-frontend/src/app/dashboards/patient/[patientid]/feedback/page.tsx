'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedbacks, setViewFeedbacks] = useState(false);
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ id: '', email: '', rating: '', feedback: '', date: new Date().toLocaleDateString('en-CA') });  const cookie_email = Cookies.get('email');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:4000/feedback/viewFeedbackByEmail/${cookie_email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFeedbacks(result.data);
      console.log(result.data);
    };

    fetchData();
  }, []);

  const handleRatingChange = (event) => {
    setNewFeedback({ ...newFeedback, rating: event.target.value });
  };

  const handleFeedbackChange = (event) => {
    setNewFeedback({ ...newFeedback, feedback: event.target.value });
  };

   let date = new Date().toLocaleDateString('en-CA');
   console.log(typeof(date));

  const handleAddFeedback = async (event) => {
    event.preventDefault();
    try {
      if (!newFeedback.rating || !newFeedback.feedback) {
        alert('Please fill out all fields before submitting feedback.');
        return;
      }
      const feedbackWithUserEmail = {
        patient_rating: newFeedback.rating, 
        patient_feedback: newFeedback.feedback,
        patient_email: cookie_email,
        feedback_date: date 
        
      };
      await axios.post('http://localhost:4000/feedback/generate', feedbackWithUserEmail, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setFeedbackFormOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='feedback-main-area bg-gray-600 h-screen'>
      <div className="feedback-area bg-indigo-400 h-auto">
        <div className='feedback-title '>
          <p className='feedback-text text-4xl text-black p-14 font-bold'>Feedback</p>
        </div>
        <button className="bg-white text-black rounded px-6 py-1 ml-16" onClick={() => setViewFeedbacks(!viewFeedbacks)}>View Feedback</button>
        <button className="bg-green-500 text-white rounded px-6 py-1 ml-5 mb-5" onClick={() => setFeedbackFormOpen(!feedbackFormOpen)}>Add Feedback</button>
        {feedbackFormOpen && (
          <form className="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center" onSubmit={handleAddFeedback}>
          <div className="rating rating-lg ">
            <input type="radio" name="rating-9" value="0" className="rating-hidden" onChange={handleRatingChange} />
            <input type="radio" name="rating-9" value="1" className="mask mask-star-2 bg-indigo-400" onChange={handleRatingChange} />
            <input type="radio" name="rating-9" value="2" className="mask mask-star-2 bg-indigo-400" onChange={handleRatingChange} />
            <input type="radio" name="rating-9" value="3" className="mask mask-star-2 bg-indigo-400" onChange={handleRatingChange} />
            <input type="radio" name="rating-9" value="4" className="mask mask-star-2 bg-indigo-400" onChange={handleRatingChange} />
            <input type="radio" name="rating-9" value="5" className="mask mask-star-2 bg-indigo-400" onChange={handleRatingChange} />
          </div>
          <textarea 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-5 w-7/12 pb-20 bg-white placeholder:text-black"
            name="feedback" 
            placeholder="Add your feedback here..." 
            onChange={handleFeedbackChange}
          />
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white rounded px-6 py-4 mt-5'>Give Feedback & Rating</button>
        </form>
        )}
        {viewFeedbacks && (
          <div className="feedback-details">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className='text-white text-xl'>
                    <th></th>
                    <th>Patient Email</th>
                    <th>Patient Rating</th>
                    <th>Patient Feedback</th>
                    <th>Patient Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map(feedback => (
                    <tr className='hover:bg-blue-500 text-white text-lg' key={feedback.id}>
                      <th></th>
                      <td>{feedback.patient_email}</td>
                      <td>{feedback.patient_feedback}</td>
                      <td>{feedback.patient_rating}</td>
                      <td>{feedback.feedback_date}</td>
                      
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