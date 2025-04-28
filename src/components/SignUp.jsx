import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {useTheContext} from '../provider/Provider';
import Swal from 'sweetalert2';
import 'animate.css';

const AuthForm = () => {
  const {users} = useTheContext()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const initialFormData = {
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileType: 'customer',
    licence: false,
  }
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');

  console.log('CHANGING USER FORM DATA:', formData)
  console.log('USERS:', users)
  
  // Toggle login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('FORM SUBMITTED:', formData)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    let matchedUser;

    if (isLogin) {
      // Login logic
      if (users.length > 0) {
        matchedUser = users.find(user => user.userName === formData.name || user.password === formData.password);
      } else {
        setMessage('User not found.');
      }

      if (matchedUser) {
        setMessage(`Welcome, ${matchedUser.name}`);
        alert (`Welcome back, ${matchedUser.name}!`);
        navigate('/dashboard') // Navigate to home page
        // Alert
        // Navigate('/signup') // set islogin false
      } else {
        setMessage('Invalid username or password.');
      }

    } else {
      // Sign-up logic

      // confirm user
      if (users.length > 0) {
        matchedUser = users.find(user => user.userName === formData.name || user.password === formData.password);
      } 

      if (matchedUser) {
        // Navigate('/signup') // set islogin false
        setIsLogin(false) // Redirect to login if user is found
      } else {
        // Persist to the Database
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((newItem) => {console.log('newItem:', newItem)
            // alert('Service registered succesfully')
            Swal.fire({
              title: "Registration succesfull",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            });
            fetchUsers() // Call the function from the provider to trigger re-fetch.
            setFormData(initialFormData) // Clear input fields
            setIsLogin(true);
          });
      }

    }
  };

  return (
    <>
    <div className='flex flex-col items-center justify-center border-2 rounded-lg gap-2 p-5 mb-10 mt-10 bg-blue-500 dark:bg-gray-700 '>
      <h2 className='font-bold text-lg dark:text-white'>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-col p-5 gap-2 w-[30em]'>
        {isLogin && (
          <>
            <input type="text" name="name" placeholder="Name or email" value={formData.name} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="dim-placeholder rounded-md" required />
          </>
        )}
        {/* <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} className="dim-placeholder rounded-md" required /> */}
        {!isLogin && (
          <>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <input type="text" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} className="dim-placeholder rounded-md" required />
            <select name="profileType" value={formData.profileType} onChange={handleChange} className="dim-placeholder rounded-md" required>
              <option value="customer">Customer</option>
              <option value="admin">Company/service</option>
            </select>
            <input type="number" name="licence" placeholder="Provide license number" value={formData.licence} onChange={handleChange} className="dim-placeholder rounded-md" required />
          </>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>
      <button onClick={toggleMode} className='dark:text-white'>
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
    </>
  );
};

export default AuthForm;
