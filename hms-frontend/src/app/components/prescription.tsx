"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import "../globals.css";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

interface CardProps {
    cardKey: number;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdditionalCard: React.FC<CardProps> = ({ cardKey, onInputChange }) => {
    const [patientName, setPatientName] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:4000/user/findById/1')
            .then(response => response.json())
            .then(data => setPatientName(data[0].patient_fullname))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="card p-4">
            <div className="flex flex-row">
                <input type="text" name={`medicine_name_${cardKey}`} placeholder="Medicine" className="input input-bordered input-info text-sm w-16 lg:w-auto mr-2" onChange={onInputChange} />
                <input type="text" name={`duration_${cardKey}`} placeholder="Frequency[1+0+1]" className="input input-bordered input-info text-sm w-20 max-w-xs lg:w-auto mr-2" onChange={onInputChange} />
                <input type="text" name={`days_${cardKey}`} placeholder="Days" className="input input-bordered input-info text-sm w-12 max-w-xs lg:w-20 " onChange={onInputChange} />
            </div>
        </div>
    );
};

const DoctorPage: React.FC = () => {
    const [cards, setCards] = useState<number[]>([Date.now()]); // Initial state with one card
    const [formData, setFormData] = useState<any>({});
    const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-CA')); // Initial state with empty string // Initial state with empty string
    const addCard = () => {
        setCards([...cards, Date.now()]); // Add a new card with current timestamp
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Collect form data from each card
        const prescription_rx_body = cards.map((cardKey) => ({
            medicine_name: formData[`medicine_name_${cardKey}`],
            time_per_day: formData[`time_per_day_${cardKey}`],
            duration: formData[`duration_${cardKey}`],
        }));
    
        // Other form data
        const { prescription_date, patient_name, doctor_name, patient_symptoms, patient_additional_symptoms, prescription_special_instruction, prescription_test_name } = formData;
    
        // Construct JSON object
        const prescriptionData = {
            patient_name: 3, // You may need to adjust this value
            doctor_name: 1, // You may need to adjust this value
            prescription_date: new Date().toLocaleDateString('en-CA'),
            patient_symptoms,
            patient_additional_symptoms,
            prescription_rx_body,
            prescription_special_instruction,
            prescription_test_name: "Blood Test",
        };
    
        // Log JSON object for testing
        console.log("Prescription Data:", prescriptionData);

        const token = Cookies.get('token')

        // Send POST request
        fetch('http://localhost:4000/patient-mgt-sys/CreatePrescription', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                toast.success('Prescription added successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Error adding prescription');
            });

    };

    return (
        <>
            <Toaster />
            <h2>Add Prescription</h2>
            <br /> <br />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="grid flex-grow h-auto card bg-base-300 rounded-box ">
                        <div className="flex flex-row">
                            <input type="date" name="prescription_date" value={date} placeholder="Date" className="input input-bordered input-info w-auto max-w-xs lg:w-auto mr-2" onChange={handleInputChange} />
                            <input type="text" name="patient_name" value={"Afzal Khan"} placeholder="Patient" className="input input-bordered input-info w-auto max-w-xs lg:w-auto mr-2" onChange={handleInputChange} />
                            <input type="text" name="doctor_name" value={"Dr. Amin Haque"} placeholder="Doctor" className="input input-bordered input-info w-auto max-w-xs lg:w-auto" onChange={handleInputChange} />
                        </div>
                        <br /> <br />
                        <div className="flex flex-col place-items-center">
                            <textarea name="patient_symptoms" className="textarea textarea-bordered w-full h-32" placeholder="History" style={{ width: "90%", height: "100px" }} onChange={handleInputChange} />
                            <br /> <br />
                            <textarea name="patient_additional_symptoms" className="textarea textarea-bordered w-full h-32" placeholder="Note" style={{ width: "90%", height: "100px" }} onChange={handleInputChange} />
                            <br /> <br />
                            <textarea name="prescription_special_instruction" className="textarea textarea-bordered w-full h-32" placeholder="Advice" style={{ width: "90%", height: "100px" }} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="divider lg:divider-horizontal"></div>
                    <div className="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center">
                        <button className="btn mb-2" onClick={addCard}>Add Medicine</button>
                        {cards.map((cardKey) => (
                            <AdditionalCard key={cardKey} cardKey={cardKey} onInputChange={handleInputChange} />
                        ))}
                        <button type="submit" className="btn mb-2" >Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default DoctorPage;
