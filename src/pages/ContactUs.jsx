import React from "react";
import { motion } from "framer-motion";
import { usePageTitle } from "../utils/usePageTitle";
import { SiGmail } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { ContactUsCard } from "../components/common/ContactUsCard";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const ContactUs = () => {
  usePageTitle("TechVoyage | Contact");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here, e.g., sending data to an email service or backend
    alert("Thank you for your message! We will get back to you shortly.");
  };

  return (
    <div className="py-10">
      <ContactUsCard />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center pt-7">
          <motion.h1
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg mb-8 md:w-1/2 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            We’d love to hear from you! Whether you have questions, need a quote, or want to discuss your project, please fill out the form below to get in touch with us.
          </motion.p>

          <div className="flex flex-col items-center p-2 lg:p-0">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gradient-to-r from-[#2A7B7D] to-[#7AC6E8] shadow-lg rounded-lg p-6 w-full max-w-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <label className="block text-text mb-2">Name</label>
                <input
                  type="text"
                  className="border border-border rounded-lg p-2 w-full bg-background text-text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-text mb-2">Email</label>
                <input
                  type="email"
                  className="border border-border rounded-lg p-2 w-full bg-background text-text"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-text mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="border border-border rounded-lg p-2 w-full bg-background text-text"
                  placeholder="Your Phone Number (Optional)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-text mb-2">Inquiry Type</label>
                <select
                  className="border border-border rounded-lg p-2 w-full bg-background text-text"
                  required
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="quote">Request a Quote</option>
                  <option value="question">General Question</option>
                  <option value="consultation">Project Consultation</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-text mb-2">Message</label>
                <textarea
                  className="border border-border rounded-lg p-2 w-full bg-background text-text"
                  placeholder="Your Message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-accent1 text-white px-4 py-2 rounded hover:bg-hover transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <a href="tel:123456789" className="p-3 flex justify-center items-center gap-2">
                <IoMdCall className="exclude-theme-toggle"/> Phone: (123) 456-7890
              </a>
              <a href="mailto:techvoyage.kenya@gmail.com" className="flex flex-row justify-center items-center gap-2 ">
                <SiGmail className="exclude-theme-toggle" /> <span className="exclude-theme-toggle">Email: techvoyage.kenya@gmail.com</span>
              </a>
              <p className="mt-2 exclude-theme-toggle">Follow us on our social media for the latest updates!</p>
              {/* Add social media icons/links here if needed */}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
