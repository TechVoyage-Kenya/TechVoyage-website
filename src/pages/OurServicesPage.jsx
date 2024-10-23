import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSettings, FiMonitor, FiEdit } from 'react-icons/fi';
import { usePageTitle } from '../utils/usePageTitle';

const OurServicesPage = () => {
  const theme = useSelector((state) => state.colorTheme.value);
  const navigate = useNavigate();
  usePageTitle("TechVoyage | Services");

  // State to track which service is expanded
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (serviceName) => {
    if (expandedService === serviceName) {
      setExpandedService(null); // Collapse if already expanded
    } else {
      setExpandedService(serviceName); // Expand the selected service
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 200 },
    },
  };

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Hero Section */}
      <section className="hero-section py-16 text-center">
        <motion.h1
          className="text-4xl font-bold mb-4 pt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Digital Presence
        </motion.h1>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We offer tailored web solutions to help businesses thrive online.
        </motion.p>
        <motion.button
          className="px-6 py-2 bg-accent1 text-white rounded-full hover:bg-hover"
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => navigate("/contactUs")}
        >
          Get Started
        </motion.button>
      </section>

      {/* Services Section */}
      <section className="services-section py-16 bg-gray-700 exclude-theme-toggle">
        <div className="container mx-auto exclude-theme-toggle">
          <motion.ul
            className="space-y-6 exclude-theme-toggle" // Add spacing between items
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Website Development */}
            <motion.li
              className="p-6 border rounded-lg cursor-pointer text-left exclude-theme-toggle"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" }}
              onClick={() => toggleService("website-development")}
              style={{ backgroundColor: theme.cardBgColor }}
            >
              <div className="flex items-center mb-4 exclude-theme-toggle">
                <FiMonitor size={50} className="text-primary mr-4 exclude-theme-toggle" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 exclude-theme-toggle">Website Development</h3>
                  <p className="text-md text-neutral-300 mb-2 exclude-theme-toggle">
                    Custom websites that are scalable, secure, and performant.
                  </p>
                  <button className="text-primary hover:text-hover">
                    {expandedService === "website-development" ? "Hide Details" : "Learn More"} <FiArrowRight />
                  </button>
                </div>
              </div>
              {/* Expanded Content */}
              {expandedService === "website-development" && (
                <div className="mt-2 text-neutral-200">
                  <p>
                    Our team builds websites from scratch using the latest technologies such as React, Flask, and Node.js to provide top-notch performance and scalability.
                  </p>
                </div>
              )}
            </motion.li>

            {/* Web Design */}
            <motion.li
              className="p-6 border rounded-lg cursor-pointer text-left exclude-theme-toggle"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" }}
              onClick={() => toggleService("web-design")}
              style={{ backgroundColor: theme.cardBgColor }}
            >
              <div className="flex items-center mb-4 exclude-theme-toggle">
                <FiSettings size={50} className="text-primary mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 exclude-theme-toggle">Web Design</h3>
                  <p className="text-md text-neutral-300 mb-2 exclude-theme-toggle">
                    Stunning, responsive designs that attract and engage users.
                  </p>
                  <button className="text-primary hover:text-hover exclude-theme-toggle">
                    {expandedService === "web-design" ? "Hide Details" : "Learn More"} <FiArrowRight />
                  </button>
                </div>
              </div>
              {/* Expanded Content */}
              {expandedService === "web-design" && (
                <div className="mt-2 text-neutral-200 exclude-theme-toggle">
                  <p className='exclude-theme-toggle'>
                    We design with the user in mind, focusing on creating beautiful, functional, and responsive websites that provide an excellent user experience.
                  </p>
                </div>
              )}
            </motion.li>

            {/* Content Management */}
            <motion.li
              className="p-6 border rounded-lg cursor-pointer text-left exclude-theme-toggle"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" }}
              onClick={() => toggleService("content-management")}
              style={{ backgroundColor: theme.cardBgColor }}
            >
              <div className="flex items-center mb-4 exclude-theme-toggle">
                <FiEdit size={50} className="text-primary mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 exclude-theme-toggle">Content Management</h3>
                  <p className="text-md text-neutral-300 mb-2 exclude-theme-toggle">
                    Easy-to-manage CMS solutions for effortless content updates.
                  </p>
                  <button className="text-primary hover:text-hover">
                    {expandedService === "content-management" ? "Hide Details" : "Learn More"} <FiArrowRight />
                  </button>
                </div>
              </div>
              {/* Expanded Content */}
              {expandedService === "content-management" && (
                <div className="mt-2 text-neutral-200 exclude-theme-toggle">
                  <p className='exclude-theme-toggle'>
                    We integrate content management systems (CMS) like WordPress, Contentful, and Strapi to allow you to update your content without hassle.
                  </p>
                </div>
              )}
            </motion.li>
          </motion.ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-16 text-center">
        <motion.h3
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Ready to Elevate Your Business Online?
        </motion.h3>
        <motion.button
          className="px-8 py-3 bg-accent1 text-white rounded-full hover:bg-hover"
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => navigate("/contactUs")}
        >
          Contact Us Today
        </motion.button>
      </section>
    </div>
  );
};

export default OurServicesPage;
