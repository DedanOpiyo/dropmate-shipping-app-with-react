import React from 'react'
import { useState } from 'react';
import {useTheContext} from '../provider/Provider';

export default function Services() {
  const {fetchServices, services, handleDelete} = useTheContext()
  const initialFormData = {
    userId: "",
    companyName: "",
    name: "",
    cost: "",
    license: "",
    imageUrl: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  // Handlechange function
  const handleChange = (e) => {
    console.log(e.target)
    const {value, name } = e.target;
    console.log('value:', value, 'name:', name)

    // Update formData dynamically
    setFormData((prev) => ({...prev, [name]: value })) 
  }

  // Add service
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData==:', formData)

    // Persist to the Database
    fetch("https://dropmate-shipping-app-with-react.onrender.com/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newItem) => {console.log('newItem:', newItem)
        alert('Service registered succesfully')
        fetchServices() // Call the function from the provider to trigger re-fetch.
        setFormData(initialFormData) // Clear input fields
      });
  };

  return (
    <>
    <div className='pl-5 mb-10 flex flex-col align-middle dark:bg-gray-700 '>
    <div className="flex justify-between items-center w-full mt-5"><span  className="mx-auto text-2xl font-bold dark:text-white">Shipping Services</span></div>
      <div className='self-center text-center mb-8'>
        {services.map(s => { return <>
          <div key={s.id} className='mt-3 dark:text-white'>
          <div >Company Name: {s.companyName}</div>
          <div >Service Nane: {s.name}</div>
          <div >Optimal Cost: {s.cost}</div>
          <div >License No: {s.license}</div>
          <div className='xl:w-[800px] md:w-[500px] sm:w-[500px] h-auto' >Image: <span onClick={() => handleDelete(s.id)} className='cursor-pointer bg-slate-400 pl-1 pr-1 rounded-sm' >Delete</span> <img className='border rounded-lg' src={`${s.imageUrl}`}></img></div>
          </div>
          </>
        })}
      </div>
      <div className="flex flex-col w-[30em] mt-3 mb-4">
        <div className='dark:text-white'>You can add an image from here <a href='https://unsplash.com/' target='_blank' className='text-blue-700 cursor-pointer'>Unsplash</a></div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 space-y-2 start-0 border-2 p-8 rounded-lg">
          <input onChange={handleChange} type="text" name="companyName" placeholder="Company Name" className="dim-placeholder rounded-md" required/>
          <input onChange={handleChange} type="text" name="name" placeholder="Service Name" className="dim-placeholder rounded-md" required/>
          <input onChange={handleChange} type="number" name="cost" placeholder="Shipping Cost" className="dim-placeholder rounded-md" required/>
          <input onChange={handleChange} type="number" name="license" placeholder="Lincence/Reg No" className="dim-placeholder rounded-md" required/>
          <input onChange={handleChange} type="text" name="imageUrl" placeholder="Image Url" className="dim-placeholder rounded-md" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Service</button>
        </form>
      </div>
    </div>
    </>
  );
}
