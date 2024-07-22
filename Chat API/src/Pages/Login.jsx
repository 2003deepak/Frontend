import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LOCAL_URL, DOMAIN_URL } from '../../config';


function Login() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (name,email) => {
    
    try {
      const response = await axios.post('https://chat-api-blond.vercel.app/login', {
        name,
        email,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      if (response.data.message.includes('Successful')) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', response.data.userId);
        
      }

      setMessage(response.data.message)
      setError(response.data.error)
      navigate(`/dashboard`);
      

      
    } catch (error) {
      console.error('Login error:', error);
      // Handle error display
    }
  };

  return (

    

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {
      message && <p className="text-center text-green-500 mt-4">{message}</p>
    }
    {
      error && <p className="text-center text-red-500 mt-4">{error}</p>
    }
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <GoogleLogin
              onSuccess={credentialResponse => {
                
                let credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                handleSubmit(credentialResponseDecoded.name,credentialResponseDecoded.email);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
          />
        </p>
      </div>

      

            

            
          
        
      
    </div>
  );
}

export default Login;
