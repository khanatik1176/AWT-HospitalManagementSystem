'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosCloudCircle } from "react-icons/io";

const Page = () => {
  const [response, setResponse] = useState('');
  const [inputValue, setInputValue] = useState(''); 
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Sending query: ${inputValue}`);
    try {
      const res = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "aaditya/OpenBioLLM-Llama3-8B-GGUF",
          messages: [
            { role: "system", content: "Always answer in rhymes." },
            { role: "user", content: inputValue }
          ],
          temperature: 0.7,
          max_tokens: -1,
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      const content = data.choices[0].message.content; // Extract content from the first choice
      setResponse(content);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='main-area bg-gray h-screen'>
      <div className="sub-area flex flex-col items-center mt-56 bg-stone-400 ">
      <div className="form flex justify-center bg-stone-400 pt-72 pb-72" > <h1 className="form-title text-black mt-16 text-xl font-bold" >Talk with OpenBioLLM:</h1>
          <form className='indigo-300 flex flex-col gap-10' onSubmit={handleSubmit}>
            <input type="text" className=' mt-16  ml-5 w' name="" placeholder='Type your health query' id="message" onChange={handleInputChange} value={inputValue} />
            <button type='submit' className='btn btn-success mt-16'>Submit</button>
            <div className="card w-96 bg-primary text-primary-content ">
          <div className="card-body">
            <h2 className="card-title text-black h-1"> <IoIosCloudCircle />Response</h2>
            <p>{response}</p>
            <div className="card-actions justify-end">
            <button className="btn " onClick={() => router.push('/')}>Go to Home</button>
            </div>
          </div>
        </div>
          </form>
        </div>
     
      </div>
    </div>
  );
};

export default Page;