import React, { useState, useEffect } from 'react'
import {useTheContext} from '../provider/Provider';
import OrderCard from '../components/OrderCard';
import EditOrder from '../components/EditOrder';
import { BsArrowRepeat } from "react-icons/bs";
// import { AiTwotoneSetting } from "react-icons/ai";
import SettingsPanel from '../components/SettingsPanel';

export default function DashBoard() {
  const {providerValue} = useTheContext()
  // console.log('GLOBAL CONTEXT FROM THE PROVIDER:', providerValue)
  const [editOrder, setEditOrder] = useState(false)
  const [orderTodEdit, setOrderToEdit] = useState({}) // Order being edited
  const [formData, setFormData] = useState([]);
  const [isSorted, setIsSorted] = useState(false); // Allow Ordercard to 'discriminate' structure based on isSorted state
  console.log('IS SORTED IN ORDERCARD==:', isSorted)

  // // Function to Edit an order
  // const handleEdit = (order) => {
  //   console.log('order:', order)
  //   setIsEditing(!isEditing)
  //   // setOrderToEdit((prev) => ({...prev, newlyEdited}))
  // }
      // // Today's date
      // const now = new Date();
      // const tomorrow = addDays(now, 1);
      // const FormatTomorrow = format(tomorrow, 'EEEE, HH:mm')
      // // useEffect(() => {
      // //     setTime(FormatTomorrow)
      // // })
      // if() {
      //     handleSubmitEditedOrder()
      // }
  // Filter by Category or location
  const handleFilter = () => {
    const filteredOrders = providerValue.filter((order) => order.location || order.itemCategory) 
    console.log('FILTERED ORDERS:', filteredOrders)
  }

  // Initialize local state, formData with order details
  useEffect(() => {
      setFormData(providerValue)
  }, [providerValue])
  
  // Function to handle input change
  const handleInputChange = (e) => {
    const name = e.target.value
    setFormData(() => providerValue.filter((order) => order.itemCategory === name || order.location.toLowerCase().includes(e.target.value.toLowerCase()) || order.company.toLowerCase().includes(e.target.value.toLowerCase())))
      // setFormData({...formData, [e.target.name]: e.target.value})
  }

  // Function to Handle Order Click
  const handleOrderClick = (order) => {
    setEditOrder(true); // This will show or render the EditOrder component
    setOrderToEdit(order); // This is passed down as prop to EditOrder
  }

  // Sort Orders by submission date(for order history)
  const handleSortOrders = (param) => {
    // isSorted is False

    // Combined sort and filter
    if (param === 'complete') {
      const filteredAndSortedOrders = [...providerValue]
      .filter(order => order.status === 'completed')
      .sort((a, b) => new Date(b.submittetAt) - new Date(a.submittetAt));
      setFormData(filteredAndSortedOrders)
      setIsSorted(true);
    } else if (param === 'general') {
      const sortedOrders = [...providerValue].sort((a, b) => new Date(b.submittetAt) - new Date(a.submittetAt));
      setFormData(sortedOrders)
      setIsSorted(true);
    }
  }
  
  // // Sort after a specific date
  // const submittedAfter = new Date("2025-04-20");

  // const recentCompleted = dropOrder.filter(order => {
  //   const submittedDate = new Date(order.submittetAt);
  //   return order.status === "completed" && submittedDate >= submittedAfter;
  // });


  // Revert back to Initial/original unsorted data state
  const revertBack = () => {
    if (isSorted) {
      setFormData(providerValue); 
      setIsSorted(false); 
    } else {
      setFormData(providerValue)
    }
  }

  const orderCard = formData.map((order) => {
    return <OrderCard key={order.id} order={order} handleOrderClick={handleOrderClick} isSorted={isSorted} />
  })
  console.log('HANDLE SORT ORDERS CALLED:', orderCard.length)
  return (
    <>
    <div className="flex flex-col p-5 gap-10 dark:bg-gray-700">
      <div className="flex justify-between items-center w-full"><span  className="mx-auto text-2xl font-bold dark:text-white">DashBoard</span></div>
      <div className=" bg-white dark:bg-gray-900 border"> <SettingsPanel handleSortOrders={handleSortOrders} /> </div>{/* Setting Pannel */}
      {editOrder ? <EditOrder setEditOrder={setEditOrder} order={orderTodEdit} /> : <>
        <div className="relative md:w-[65em] 2xl:w-[95em] sm:w-[35em] self-center">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" onChange={handleInputChange} className="dim-placeholder block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Company..." />
        </div>
      <div className="flex place-content-between"><span className="flex self-start text-lg font-bold dark:text-white">Order Details</span> </div>
        <div className='font-bold self-center mb-0 mr-3 dark:text-white'>Filter Orders By:</div>
      <div className='flex gap-2 justify-center mr-3'>
        <div>
          <span onClick={() => revertBack()} className='flex gap-1 align-middle mb-2 font-bold bg-zinc-200 rounded-md cursor-pointer dark:text-white dark:bg-gray-700'>Revert<span className='text-2xl'><BsArrowRepeat /></span></span> 
          <label><span className='font-bold dark:text-white'>Location: </span><input type='search' placeholder={`Nairobi`} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1" /></label>
          <label><span className='font-bold dark:text-white'>Item Category: </span> 
            <select name="itemCategory" value={formData.itemCategory || ''} onChange={handleInputChange} className="dim-placeholder rounded-md mb-1">
                <option value={'Agricultural - Farming'}>Agricultural - Farming</option>
                <option value={'Agricultural - Farming'}>Agricultural - Farming</option>
                <option value={'Agricultural - Livestock'}>Agricultural - Livestock</option>
                <option value={'Automobile'}>Automobile</option>
                <option value={'Technology - Hardware'}>Technology - Hardware</option>
                <option value={'Household - Furniture'}>Household - Furniture</option>
                <option value={'Clothes - Bales'}>Clothes - Bales</option>
                <option value={'Other'}>Other</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex w-auto h-auto flex-wrap border-2 justify-center rounded-xl">{orderCard}</div></>}
    </div>
    </>
  )
}

