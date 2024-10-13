import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';


import { useDispatch } from 'react-redux';


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
      transition: { duration: 0.3 },
    },
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
       
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-accent2 via-accent2 to-accent3">
      <motion.div
        className="bg-text/65 p-8 rounded-lg shadow-lg lg:w-[30%] exclude-theme-toggle"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold text-center text-accent2 mb-8 exclude-theme-toggle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome Back!
        </motion.h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4 exclude-theme-toggle">
            {errorMessage}
          </div>
        )}

        <motion.form
          className="space-y-6 exclude-theme-toggle"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={inputVariants} className="relative exclude-theme-toggle">
            <FiMail className="absolute left-3 top-2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent1 exclude-theme-toggle"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div variants={inputVariants} className="relative exclude-theme-toggle">
            <FiLock className="absolute left-3 top-2 text-gray-500 exclude-theme-toggle" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent1 exclude-theme-toggle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <motion.button
            className="w-full py-2 px-4 bg-accent1 text-white font-semibold rounded-lg hover:bg-hover flex justify-center items-center space-x-2 exclude-theme-toggle"
            variants={buttonVariants}
            whileHover="hover"
            onClick={handleSignIn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="loader"></div>
            ) : (
              <>
                <FiLogIn className="text-lg exclude-theme-toggle" />
                <span>Sign In</span>
              </>
            )}
          </motion.button>

        
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SignInPage;
