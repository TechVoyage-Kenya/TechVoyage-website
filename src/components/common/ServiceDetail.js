// ServiceDetail.js
import React from 'react';
import { motion } from 'framer-motion';

const ServiceDetail = ({ title, description, icon, benefits, testimonials, delay }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 m-4 flex flex-col items-center text-center transition-transform transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <img src={icon} alt={title} className="w-24 h-24 mb-4" />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      
      <h4 className="text-xl font-bold mt-4">Key Benefits:</h4>
      <ul className="list-disc list-inside text-left mt-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-gray-500">{benefit}</li>
        ))}
      </ul>
      
      <h4 className="text-xl font-bold mt-4">Client Testimonials:</h4>
      <div className="mt-2">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="italic text-gray-400 mb-2">
            "{testimonial}"
          </blockquote>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
