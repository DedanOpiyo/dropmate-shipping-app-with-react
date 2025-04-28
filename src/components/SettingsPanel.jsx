import { useState } from 'react';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {useTheContext} from '../provider/Provider';
import { GrLogout } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export default function SettingsPanel({handleSortOrders}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const {providerValue, darkMode, toggleDark} = useTheContext()

  const handleOpen = () => {
    setOpen(false);
  }

  return (
    <>
      {/* Settings icon (open side pannel) */}
      {!open && (<button
        onClick={() => setOpen(true)}
        className="fixed top-2 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:shadow-md"
        title="Settings"
      >
        <Cog6ToothIcon className="w-6 h-6 text-gray-800 dark:text-white" />
      </button>)}

      {/* The Side panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 z-40 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Close icon */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
          <button onClick={() => handleOpen()}><XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" /></button>
        </div>

        {/* Provide settings, after the 'hr'/bottom border */}
        <div className="p-4 text-gray-800 dark:text-gray-100">
          {darkMode ? <p className="mb-2">Dark Mode</p> : <p className="mb-2">Light Mode</p>}
          {/* Theme setting */}
          <button onClick={toggleDark} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">{darkMode ? "☀️ Light" : "🌙 Dark"}</button>

          <p className="mt-4 cursor-pointer mb-2">Shippment History</p>
          <div className='flex flex-col gap-1'>
          <button onClick={() => handleSortOrders('general')} className="px-4 py-2 w-fit bg-gray-200 dark:bg-gray-700 rounded">All Orders</button>
          <button onClick={() => handleSortOrders('complete')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Completed Orders</button>
          </div>

          <p className="mt-4 cursor-pointer mb-2">Logout</p>
          <button onClick={() => navigate('/signup')} className="px-4 py-2 w-fit bg-gray-200 dark:bg-gray-700 rounded"><GrLogout />Logout</button>
        </div>
      </div>

      {/* Dim-bg/Optional overlay across the edges. Allows closing side pannel */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
        ></div>
      )}
    </>
  );
}
