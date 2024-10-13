import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <motion.footer
      className="py-2"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Policy Links */}
          <div className="flex space-x-4">
            <motion.a
              href="#"
              variants={linkVariants}
              whileHover="hover"
              className="hover:underline"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              variants={linkVariants}
              whileHover="hover"
              className="hover:underline"
            >
              Terms of Service
            </motion.a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.a
              href="https://github.com/TechVoyage-Kenya"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="text-2xl"
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/company"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="text-2xl"
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href="mailto:techvoyage.kenya@gmail.com"
              variants={linkVariants}
              whileHover="hover"
              className="text-2xl"
            >
              <FiMail />
            </motion.a>
            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="text-2xl"
            >
              <SiWhatsapp/>
            </motion.a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TechVoyage. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
