import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShiftingDropDown } from "../common/shiftingDropdown";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo2.png";

import { AiOutlineHome } from "react-icons/ai"; 
import { MdOutlineDesignServices, MdOutlineContactPage } from "react-icons/md";
import { FaProjectDiagram, FaUsers } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { deleteUser } from "../../redux/reducers/userSlice";

const Navbar = () => {
  const theme = useSelector((state) => state.colorTheme.value);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state)=>state.user.value)
  const [loggedIn,setLoggedIn] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(deleteUser()); // Dispatch the logout action
    navigate("/"); // Navigate to login or home page
  };

  useEffect(() => {
    console.log('User:', user); // Log the user state to see what it contains
    if (user && user.email) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);
  
  console.log(loggedIn);
  

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const navLinks = [
    { name: "Home", path: "/", icon: <AiOutlineHome /> },
    { name: "Services", path: "/ourServices", icon: <MdOutlineDesignServices /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Our Team", path: "/ourTeam", icon: <FaUsers /> },
    ...(user.email ? [{ name: "Tasks Board", path: "/tasksBoard", icon: <BsClipboardCheck /> }] : []),
    { name: "Contact Us", path: "/contactUs", icon: <MdOutlineContactPage /> },
  ];
  

  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    closed: {
      opacity: 0,
      x: -50,
      rotate: -15,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const buttonVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 },
  };

  const location = useLocation();
  let currentLocation = location.pathname;
 
  


  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center transition-all duration-100 ${
        isScrolled ? "" : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? theme.backgroundColor : "transparent",
        zIndex: 50,
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      <button
        className="text-lg font-bold cursor-pointer flex flex-row justify-center items-center gap-1"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="company logo"
          className="w-10 exclude-theme-toggle"
        />
        <span
          className={`font-fira-sans text-2xl exclude-theme-toggle`}
          style={{
            color:
              theme.navTextColor && !isScrolled && currentLocation === "/"
                ? theme.navTextColor
                : theme.textColor,
            transition: "background-color 0.5s ease, color 0.5s ease",
          }}
        >
          TechVoyage
        </span>
      </button>

      <motion.div
        className="md:hidden z-50"
        onClick={toggleMenu}
        whileHover={{ scale: 1.2 }}
      >
        <motion.button
          className="text-3xl focus:outline-none"
          animate={
            isOpen ? { rotate: 45, scale: 1.2 } : { rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          variants={buttonVariants}
        >
          {isOpen ? "✕" : "☰"}
        </motion.button>
      </motion.div>

      {isDesktop && <ShiftingDropDown />}
      
      {/* Overlay to darken rest of the page */}
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 30 }}
          onClick={toggleMenu} 
        ></motion.div>
      )}

      {/* Sidebar Menu */}
      <motion.ul
        className={`md:hidden fixed top-0 right-0 w-3/4 h-screen pt-20 items-center ${
          isOpen ? "block" : "hidden"
        }`}
        style={{
          zIndex: 40,
          backgroundColor: theme.backgroundColor,
          transition: "background-color 0.5s ease, color 0.1s ease",
        }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        {navLinks.map((link) => (
          <motion.li
            key={link.name}
            className="p-4 cursor-pointer flex items-center space-x-2 exclude-theme-toggle"
            variants={isDesktop ? {} : linkVariants}
            onClick={()=>navigate(link.path)}
          >
            <Link
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-lg"
            >
              {link.icon}
              <span className="exclude-theme-toggle">{link.name}</span>
            </Link>
          </motion.li>
          

          
        ))}
        {loggedIn && <motion.li
          className="p-4 cursor-pointer flex items-center space-x-2 exclude-theme-toggle"
          onClick={handleLogout} // Add onClick event for logout
        >
          <AiOutlineLogout className="text-lg" />
          <span className="exclude-theme-toggle">Logout</span>
        </motion.li>}
      </motion.ul>
    </nav>
  );
};

export default Navbar;


