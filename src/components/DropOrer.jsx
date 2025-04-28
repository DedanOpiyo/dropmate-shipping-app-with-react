import React, { useEffect, useState } from 'react'
import { HiOutlineChevronDoubleDown } from "react-icons/hi2"
import { format, addDays } from 'date-fns';
import { useTheContext } from '../provider/Provider';
import calculatePrice from '../utility/calculatePrice';
import { useNavigate } from 'react-router-dom';

export default function DropOrer() {
    const {fetchDropOrders, services} = useTheContext() // Call the useTheContext func from the provider. It uses useContext Hook, and returns provider values.
    const navigate = useNavigate()
    const [price, setPrice] = useState();
    const [time, setTime] = useState();
    const initialFormData = {
      name: "",
      userName: "",
      userId: false,
      location: "Nairobi",
      item: "",
      itemCategory: "Agricultural - Farming",
      window: null,
      weight: "",
      company: "",
      status: "in-progress",
      subscribed: false,
      dayFrequency: "",
      price: 200,
      submittetAt: "",
      shipBy: ""
    }
    const [formData, setFormData] = useState(initialFormData);

    // Handlechange function
    const handleChange = (e) => {
      const {value, name, type, checked } = e.target;
      console.log('value:', value, 'name:', name)

      // Resolve the name dynamically so that the values do not conflict with unmatching inputs. If subscription is unchecked, clear radio(dayFrequency) inputs.
      setFormData((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value, ...(name === 'subscribed' && !checked && {dayFrequency: ""})})) 
    }
    console.log('formData:', formData)

    // Change prices, depending on itemCategory and location
    useEffect(() => {
      const returnedPrice = calculatePrice(formData.itemCategory, formData.location) // Call the calculatePrice utility function
      setPrice(returnedPrice)   
    }, [formData.itemCategory])

    // Today's date
    const now = new Date();
    const tomorrow = addDays(now, 1);
    const FormatTomorrow = format(tomorrow, 'EEEE, HH:mm')
    useEffect(() => {
      setTime(FormatTomorrow)
    })
    console.log('tomorrow:', FormatTomorrow)

    // handleSubmit function
    const handleSubmit = (e) => {
      e.preventDefault()

      console.log('price on submit:', price);

      // Include the privce and other variables before persisting
      const finalizeFormData = {...formData, price: price, submittetAt: now, shipBy: tomorrow, updatedAt: ''}
      console.log('FINALIZED FORM DATA:', finalizeFormData)

      // Persist to the Database
      fetch("https://dropmate-shipping-app-with-react.onrender.com/dropOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalizeFormData),
      })
        .then((r) => r.json())
        .then((newItem) => {console.log('newItem:', newItem)
          alert('Order saved succesfully')
          fetchDropOrders() // Call the function from the provider to trigger re-fetch.
          setFormData(initialFormData) // Clear input fields
          navigate('/signup')
        });
    }
    console.log('formData:', formData)

  return (
    <>
      <div className='w-[80vw] ml-auto mr-auto'>
        <div className='font-bold flex gap-1 dark:text-white'>Drop Orer <span className='self-center'><HiOutlineChevronDoubleDown /></span></div>
        <div className='dark:text-white'><span className='font-bold'>Price Ksh.</span>{price}</div>
        <div className='dark:text-white'><span className='font-bold dark:text-white'>Ship by: </span>{time}</div>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={formData.name} onChange={handleChange} name="name" className="dim-placeholder rounded-md" required/>
            <input type="text" placeholder="Username" value={formData.userName} onChange={handleChange} name="userName" className="dim-placeholder rounded-md" required/> 
            <select value={formData.location} onChange={handleChange} name="location" className="dim-placeholder rounded-md">
              <option value="Nairobi">Nairobi</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Eldoret">Eldoret</option>
              <option value="Nakuru">Nakuru</option>
            </select>     
            <input type="text" placeholder="Item Name" value={formData.item} onChange={handleChange} name="item" className="dim-placeholder rounded-md" required/> 
            <select value={formData.itemCategory} onChange={handleChange} name="itemCategory" className="dim-placeholder rounded-md">
              <option value="Agricultural - Farming">Agricultural - Farming</option>
              <option value="Agricultural - Livestock">Agricultural - Livestock</option>
              <option value="Automobile">Automobile</option>
              <option value="Technology - Hardware">Technology - Hardware</option>
              <option value="Household - Furniture">Household - Furniture</option>
              <option value="Clothes - Bales">Clothes - Bales</option>
              <option value="Other">Other</option>
            </select> 
            <input type="number" placeholder="Weight(approx kg)" value={formData.weight} onChange={handleChange} name="weight" className="dim-placeholder rounded-md" required/>
            {/* <input type="text" placeholder="Ship by: Easy Coach, Guardian, Modern Coast" value={formData.company} onChange={handleChange} name="company" className="dim-placeholder rounded-md" required/> */}
            <select value={formData.company} onChange={handleChange} name="company" className="dim-placeholder rounded-md">
              {services.map(s => <option value={s.id} key={s.id}>{s.companyName}</option>)}
            </select>

            <label className="block dark:text-white">
              <input type="checkbox" name="subscribed" checked={formData.subscribed} onChange={handleChange} /> Subscribe(for automatic weekly/daily shipping)
            </label>

            {formData.subscribed && <><label className="block dark:text-white">
              <input type="radio" value="daily" name="dayFrequency" checked={formData.dayFrequency === 'daily'} onChange={handleChange} /> Daily
            </label>
            <label className="block dark:text-white">
              <input type="radio" value="weekly" name="dayFrequency" checked={formData.dayFrequency === 'weekly'} onChange={handleChange} /> Weekly
            </label></>}

            {/* Debug / Subscription feedback */}
            <div style={{ marginTop: '1rem' }}  className='dark:text-white'>
              <strong>Subscribed:</strong> {formData.subscribed ? 'Yes' : 'No'} <br />
              <strong>Frequency:</strong> {formData.dayFrequency || 'None'}
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Order</button>
        </form>
      </div>
    </>
  )
}
