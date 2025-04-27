import React from 'react'

export default function OrderCard({order, handleOrderClick, isSorted}) {
  console.log('IS SORTED IN ORDERCARD:', isSorted.submittedAt)
  return (
    <>
    <div onClick={() => handleOrderClick(order)} className='flex flex-col items-center min-w-[20em]  p-5 rounded-[18px] border-2 dark:text-white'>
        {isSorted ? <><div>{order.id}</div>
        <div>{order.submittedAt}</div>
        <div>{order.item}</div>
        <div>{order.location}</div>
        <div>{order.itemCategory}</div>
        <div>{order.company}</div>
        <div>{order.status}</div>
        <div>{order.price}</div>
        <div>{order.shipBy}</div>
        <div>{order.weight}</div></> :
        <><div>{order.id}</div>
        <div>{order.item}</div>
        <div>{order.location}</div>
        <div>{order.itemCategory}</div>
        <div>{order.company}</div>
        <div>{order.status}</div>
        <div>{order.price}</div>
        <div>{order.submittedAt}</div>
        <div>{order.shipBy}</div>
        <div>{order.weight}</div></>
        }
    </div>
    </>
  )
}
