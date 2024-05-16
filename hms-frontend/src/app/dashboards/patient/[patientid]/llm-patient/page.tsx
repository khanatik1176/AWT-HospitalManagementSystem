'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import https from 'https';

const Page = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.post('https://localhost:4000/llm/v1/chat/completions', {
      message: message,
    }, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then(response => {
      setChat(prevChat => [...prevChat, response.data]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target.elements.message.value);
  };

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
      <div className='bg-indigo-400 h-3/6'>
        <h1 className='text-black text-4xl p-10 font-bold'> Welcome faisal</h1> {/* Use data state variable */}
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" placeholder="Type a message" />
          <button type="submit">Send</button>
        </form>
        <div>
          {chat.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
