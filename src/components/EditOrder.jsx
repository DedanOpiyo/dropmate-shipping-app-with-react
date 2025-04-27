// Rendered conditionally in Dashboard and allows for editing an order.
import React, {useEffect, useState} from 'react'
import { TbArrowBackUp } from "react-icons/tb";
import calculatePrice from '../utility/calculatePrice';
import { format, addDays } from 'date-fns';
import {useTheContext} from '../provider/Provider'; // For update/delete

export default function EditOrder({order, setEditOrder}) {
    const [isEditing, setIsEditing] = useState(true) // State to 'reveal' editibg inputs
    const [saveEdit, setSaveEdit] = useState(true) 
    const [cancelDelete, setCancelDelete] = useState(false)
    const [color, setColor] = useState('')
    const [formData, setFormData] = useState(order);
    const [price, setPrice] = useState();

    const { updateOrder, deleteOrder } = useTheContext()

    // Initialize local state, formData with order details
    useEffect(() => {
        setFormData({...order, price: "", window: ""})
    }, [order])
    
    // Function to handle input change
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // Finalize formdata
    // Today's date
    const now = new Date();
    const tomorrow = addDays(now, 1);

    const handleSubmitEditedOrder = () => {
        // Include the price and other variables before persisting
        const finalizeFormData = {...formData, price: price, updatedAt: now, shipBy: tomorrow}
        console.log('FINALIZED FORM DATA:', finalizeFormData)
        updateOrder(finalizeFormData.id, finalizeFormData)
    }

    // Delete/Cancel an order
    const handleDeleteOrder = () => {
        console.log('DELETING ORDER ID:===', order.id)
        console.log('DELETING ORDER ID:===FORM', formData.id)
        deleteOrder(order.id)
    }

    // Change prices, depending on itemCategory and location
    useEffect(() => {
        const returnedPrice = calculatePrice(formData.itemCategory, formData.location) // Call the calculatePrice utility function
        setPrice(returnedPrice)   
    }, [formData.itemCategory])
    
    // Style to Manage Order Status
    useEffect(() => {
        if(order.status) {
            if(order.status === 'in-progress') {
                setColor('bg-blue-100 text-blue-800')
            } else if(order.status === 'completed') {
                setColor('bg-green-100')
            }
        }
    }, [])

    // Function to Handle edit button Click
    const handleEditClick = () => {
        setIsEditing(false);
        setSaveEdit(false);
    }
    
    // Function to Handle save changes button Click
    const handleSaveClick = () => {
        setSaveEdit(!saveEdit)
        setIsEditing(!isEditing);
    }

  return (
    <>
        <div>
        <div onClick={() => setEditOrder(false)} className='cursor-pointer font-bold dark:text-white'><span><TbArrowBackUp /></span>Back</div>
        {isEditing ? (<div className={`flex flex-col items-center min-w-[20em] min-h-[20em] p-5 rounded-[18px] border-2 ${color}`}>
            <span className='font-bold mb-5 text-lg'>Order Details</span>
            <div className='self-end'><span className='font-bold self-end mr-2'>Order Status: </span>{order.status}</div>
            <div><span className='font-bold self-start mr-1'>ID: </span>{order.id}</div>
            <div><span className='font-bold self-start mr-1'>Item: </span>{order.item}</div>
            <div><span className='font-bold self-start mr-1'>Location: </span>{order.location}</div>
            <div><span className='font-bold self-start mr-1'>Item Category: </span>{order.itemCategory}</div>
            <div><span className='font-bold self-start mr-1'>Company: </span>{order.company}</div>
            <div><span className='font-bold self-start mr-1'>Charges: </span>{order.price}</div>
            <div><span className='font-bold self-start mr-1'>Submitted on: </span>{order.submittedAt}</div>
            <div><span className='font-bold self-start mr-1'>Maturity Date: </span>{order.shipBy}</div>
            <div><span className='font-bold self-start mr-1'>Item Weight: </span>{order.weight}</div>
        </div>) : 
        (<div className='flex flex-col items-center min-w-[20em]  p-5 rounded-[18px] border-2'>
        <span className='font-bold text-lg dark:text-white'>Edit Order Details</span><span className='mb-5 dark:text-white'><span className='font-bold'>ID:</span> {formData.id}</span>
        {price && <div className='mb-2 dark:text-white'><span className='font-bold'>Price Ksh.</span>{price}</div>} 
            <label><span className='dark:text-white'>Item: </span><input type='text' name="item" value={formData.item || ''} placeholder={`${formData.item}`} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1" /></label>
            <label><span className='dark:text-white'>Location: </span><input type='text' name="location" value={formData.location || ''} placeholder={`${formData.location}`} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1" /></label>
            <label><span className='dark:text-white'>Item Category: </span> 
                <select name="itemCategory" value={formData.itemCategory || ''} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1">
                    <option value={'Agricultural - Farming'}>Agricultural - Farming</option>
                    <option value={'Agricultural - Livestock'}>Agricultural - Livestock</option>
                    <option value={'Automobile'}>Automobile</option>
                    <option value={'Technology - Hardware'}>Technology - Hardware</option>
                    <option value={'Household - Furniture'}>Household - Furniture</option>
                    <option value={'Clothes - Bales'}>Clothes - Bales</option>
                    <option value={'Other'}>Other</option>
                </select>
            </label>
            <label><span className='dark:text-white'>Company: </span> <input type='text' name="company" value={formData.company || ''} placeholder={`${formData.company}`} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1" /></label>
            <label><span className='dark:text-white'>Weight: </span> <input type='number' name="weight" value={formData.weight || ''} placeholder={`${formData.weight}`} onChange={handleInputChange} className="dim-placeholder ml-1 rounded-md mb-1" /></label>
        </div> )
        }
        {/* Toggle Ediding and Canceling editing */}
        <div className='mt-4 '>
            {saveEdit ? <div onClick={() => handleEditClick()} className='ml-auto p-[.15em] w-[4.3em] text-center text-white cursor-pointer bg-blue-700' >Edit</div> : 
            <>
            <div className='flex gap-1'>
            <div onClick={() => handleSaveClick()} ><span className='p-1 w-[5.3em] text-center text-white cursor-pointer bg-red-500'>Cancel</span></div>  
            <div onClick={() => handleSubmitEditedOrder()} ><span className='p-1 w-[5.3em] text-center text-slate-950 cursor-pointer bg-gray-300'>Save Changes</span></div>
            </div>
            </>
            }
        </div>
        {/* Toggle Cancel Order */}
        <div>
            {saveEdit && !cancelDelete && <div onClick={() => setCancelDelete(!cancelDelete)} ><span className='p-1 w-[5.3em] text-center text-white cursor-pointer bg-red-500'>Cancel Order</span></div>}
        </div>
        {/* Confirm Canceling an order */}
        <div className='text-center flex-col '>
            {cancelDelete && <>
            <div className='bg-red-200 p-3 border-2'>
                <div>Are you sure you want to cancel the order?</div>
                <div className='flex justify-center gap-4 mt-2'>
                    <div onClick={() => handleDeleteOrder()} ><span className='p-1 w-[5.3em] text-center text-white cursor-pointer bg-red-300'>Confirm</span></div>
                    <div onClick={() => setCancelDelete(!cancelDelete)} className='font-bold cursor-pointer'>X</div>
                </div>
            </div>
            </>}
        </div>
        </div>
    </>
  )
}
