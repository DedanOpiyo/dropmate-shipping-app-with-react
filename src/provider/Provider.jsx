// Provider component to 'provide' created global 'container' dropDetails.
import React, { useEffect, useState, createContext, useContext } from 'react'

const DropDetails = createContext(); // Create the context outside the function

function Provider({children}) { // the provider component takes children prop

    const [providerValue, setProviderValue] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setIsloading] = useState(true); // State to manage loading.
    // console.log('WILL NEW ORDERS BE FETCHED?', loading)
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Fetch drop orders
    const fetchDropOrders = async () => {
        try{
            const res = await fetch("https://dropmate-shipping-app-with-react.onrender.com/dropOrder")
            const newItem = await res.json()
                setProviderValue(newItem)
        } catch(error) {
            console.error('Error fetching orders:', err);
        } finally{
            setIsloading(false)
        }
    }

    // Fetch services
    const fetchServices = async () => {
        try{
            const res = await fetch("https://dropmate-shipping-app-with-react.onrender.com/services")
            const newItem = await res.json()
            setServices(newItem)
        } catch(error) {
            console.error('Error fetching orders:', err);
        } finally{
            // setIsloading(false)
        }
    }

    // Delete service
    const handleDelete = async (id) => {
        console.log('DELETING SERVICE ID:===PROVIDER', id)
        try {
            const res = await fetch(`https://dropmate-shipping-app-with-react.onrender.com/services/${id}`, {
            method: 'DELETE',
            });
            if (res.ok) {
            await fetchServices(); // Refresh
            alert(`Service (${id}) deleted successfully`)
        }
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    useEffect(() => {
        fetchDropOrders()
        fetchServices()
    }, [])

    // useEffect(() => {
    //     fetch("https://dropmate-shipping-app-with-react.onrender.com/dropOrder")
    //         .then((r) => r.json())
    //         .then((newItem) => {console.log('DROP ORDERS:', newItem)
    //             setProviderValue(newItem)
    //         });
    // }, [])
    // Update an existing order (PUT or PATCH)
    const updateOrder = async (id, updatedData) => {
        try {
        const res = await fetch(`https://dropmate-shipping-app-with-react.onrender.com/dropOrder/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (res.ok) {
            await fetchDropOrders(); // Refresh after update
            alert(`order (${id}) updated successfully`)
        }
        } catch (err) {
        console.error('Error updating order:', err);
        }
    };

    // Delete an order
    const deleteOrder = async (id) => {
        console.log('DELETING ORDER ID:===PROVIDER', id)
        try {
          const res = await fetch(`https://dropmate-shipping-app-with-react.onrender.com/dropOrder/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            await fetchDropOrders(); // Refresh
            alert(`order (${id}) deleted successfully`)
        }
        } catch (err) {
          console.error('Error deleting order:', err);
        }
    };

  return (
    // Create the 'provider/providing' component using the Provider property
    <DropDetails.Provider value={{providerValue, fetchDropOrders, updateOrder, deleteOrder, services, fetchServices, handleDelete, darkMode, toggleDark: () => setDarkMode(prev => !prev)}}>
        {children}
    </DropDetails.Provider>
  )
}

const useTheContext = () => {
    const contextValue = useContext(DropDetails)
    if (!contextValue) {
        throw new Error('useDropDetails must be used within DropDetailsProvider');
    } else {
        return contextValue
    }
}

export {Provider, useTheContext};

