import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import { usePageTitle } from "../utils/usePageTitle";

import { FiArrowUpRight } from "react-icons/fi";
import { TechVoyageGrid } from "../components/common/TechVoyageGrid";
import { AiOutlineCheckCircle, AiOutlineTeam, AiOutlineCustomerService } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {
  const theme = useSelector((state)=>state.colorTheme.value)
  const navigate = useNavigate()
  usePageTitle("TechVoyage | Home")

 


  
  return (
    <div
     
     
      className="page-container"
    >
      <HeroSection
        imgUrl="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Navigating Solutions for Tomorrow."
        heading="Welcome to TechVoyage"
         description="We craft innovative web and data solutions that empower individuals, communities, and organizations to thrive in the digital landscape."
        imageText={theme.imageText}
      >
        <Content navigate={navigate} />
      </HeroSection>
      <TechVoyageGrid/>
      <FeatureHighlights/>
    

   

    </div>
  );
};

const HeroSection = ({ imgUrl, subheading, heading,imageText,description, children }) => {
  return (
    <div>
      <div className="relative h-[110vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} description={description} imageText={imageText} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden md:rounded-b-xl"
    >
      <motion.img
        src={imgUrl}
        alt="TechVoyage hero image"
        onLoad={() => setImageLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0, transition: { duration: 1 } }}
        className="absolute inset-0 w-full h-full object-cover"
        srcSet={`${imgUrl}?w=640 640w, ${imgUrl}?w=1280 1280w, ${imgUrl}?w=1920 1920w`}
        loading="lazy"
      />
      <motion.div className="absolute inset-0 bg-neutral-950/70" style={{ opacity }} />
    </motion.div>
  );
};
const OverlayCopy = ({ subheading, heading, description, imageText }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity, color: imageText }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center transition-colors duration-300"
    >
      {/* Animate heading first */}
      <div className="flex flex-wrap justify-center">
        {heading.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }} // Start hidden and below
            animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
            transition={{ duration: 0.8, delay: index * 0.2 }} // Increased duration and delay for slower animation
            className={`text-4xl font-bold md:text-7xl`} // Adjust margin for spacing
          >
            {word}
            {index < heading.split(' ').length - 1 && <span>&nbsp;</span>} {/* Add non-breaking space */}
          </motion.span>
        ))}
      </div>

      {/* Animate subheading after heading */}
      <div className="flex justify-center mt-4">
        {subheading.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }} // Start hidden and below
            animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
            transition={{ duration: 0.8, delay: (heading.split(' ').length * 0.2) + (index * 0.2) }} // Delay based on heading length
            className={`mb-2 text-center text-xl md:mb-4 md:text-3xl`} // Adjust margin for spacing
          >
            {word}
            {index < subheading.split(' ').length - 1 && <span>&nbsp;</span>} {/* Add non-breaking space */}
          </motion.span>
        ))}
      </div>

      {/* Animate description after subheading */}
      <div className="flex flex-wrap justify-center mt-4 lg:w-[65%]">
        {description.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }} // Start hidden and below
            animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
            transition={{ duration: 0.1, delay: (heading.split(' ').length * 0.2) + (subheading.split(' ').length * 0.2) + (index * 0.1) }} // Combined delays for smooth flow
            className="mb-2 text-center text-xl md:mb-4 md:text-3xl" // Adjust margin for spacing
          >
            {word}
            {index < description.split(' ').length - 1 && <span>&nbsp;</span>} {/* Add non-breaking space */}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};





const Content = ({navigate}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Bridging Innovation and Technology
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        At the forefront of digital transformation, our services are crafted to elevate your projects and streamline operations for all.
      </p>

      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        We specialize in delivering bespoke web solutions and insightful analytics that cater to a variety of needs, empowering individuals and organizations alike.
      </p>

      <button className="w-full rounded bg-accent1 px-9 py-4 text-xl text-white transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-lg hover:bg-gradient-to-r hover:from-neutral-800 hover:to-neutral-600 md:w-fit" onClick={()=>navigate("/ourServices")}>
        Discover Tailored Solutions for You <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);




const FeatureHighlights = () => {
  const navigate = useNavigate()
  const features = [
    {
      title: "Personalized Solutions",
      description: "We create customized technology solutions that cater to diverse needs and aspirations.",
      icon: <AiOutlineCheckCircle className="w-10 h-10 text-primary" />,
    },
    {
      title: "Dedicated Experts",
      description: "Our passionate team of professionals is committed to helping you navigate the digital landscape.",
      icon: <AiOutlineTeam className="w-10 h-10 text-primary" />,
    },
    {
      title: "Comprehensive Support",
      description: "We provide ongoing assistance to empower individuals and organizations in achieving their goals.",
      icon: <AiOutlineCustomerService className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="py-16 p-4">
      <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold ml-2">{feature.title}</h3>
            </div>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center" onClick={()=>navigate("/ourServices")}>
        <span className="text-primary underline cursor-pointer md:text-lg exclude-theme-toggle">
          Learn more about our services
        </span>
      </div>
    </div>
  );
};
