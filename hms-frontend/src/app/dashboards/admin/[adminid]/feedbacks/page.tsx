'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/react';

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const result = await axios.get('http://localhost:4000/admin/feedbacks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFeedbackData(result.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchFeedback();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/feedbacks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await axios.get('http://localhost:4000/admin/feedbacks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFeedbackData(result.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
      <div className="p-10">
        <h1 className="text-white text-4xl font-bold mb-8">Feedback List</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">ID</th>
              <th className="py-2 px-4 bg-gray-200">Patient Feedback</th>
              <th className="py-2 px-4 bg-gray-200">Patient Rating</th>
              <th className="py-2 px-4 bg-gray-200">Feedback Date</th>
              <th className="py-2 px-4 bg-gray-200">Patient Email</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map(feedback => (
              <tr key={feedback.id}>
                <td className="py-2 px-4 border-b">{feedback.id}</td>
                <td className="py-2 px-4 border-b">{feedback.patient_feedback}</td>
                <td className="py-2 px-4 border-b">{feedback.patient_rating}</td>
                <td className="py-2 px-4 border-b">{feedback.feedback_date}</td>
                <td className="py-2 px-4 border-b">{feedback.patient_email}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button onClick={() => handleDelete(feedback.id)} className="text-red-500 hover:text-red-700">
                    <Icon icon="bi:trash" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
