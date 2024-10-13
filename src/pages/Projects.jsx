import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { usePageTitle } from '../utils/usePageTitle';


const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A robust online store with integrated payment solutions.",
    imageUrl: "https://magesolution.com/wp-content/uploads/2022/07/ecommerce-website-design-examples-1024x768.jpg",
    category: "E-commerce",
    liveLink: "https://example.com/e-commerce-platform",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A sleek, modern portfolio for a creative professional.",
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/77b5b783911401.5d4b03c198716.png",
    category: "Web Design",
    liveLink: "https://example.com/portfolio-website",
  },
  {
    id: 3,
    title: "Corporate Website",
    description: "A professional website for a leading tech company.",
    imageUrl: "https://mycodelesswebsite.com/wp-content/uploads/2022/02/Vision-Board-Media-Corporate-Website-Example.jpg",
    category: "Website Development",
    liveLink: "https://example.com/corporate-website",
  },
  {
    id: 4,
    title: "Blog and CMS",
    description: "A fully managed blog with easy content updates.",
    imageUrl: "https://cdn.prod.website-files.com/659415b46df8ea43c3877776/65a53e3ef4cec4816c70d450_blogger-cms-homepage-959578a1.jpeg",
    category: "Content Management",
    liveLink: "https://example.com/blog-and-cms",
  },
];


const Projects = () => {
  usePageTitle("TechVoyage | Projects");
  const theme = useSelector((state) => state.colorTheme.value);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

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

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
   
  };

  return (
    <div style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, transition: "background-color 0.5s ease, color 0.5s ease", }}>
      {/* Hero Section */}
      <section className="hero-section py-20 text-center relative bg-cover bg-center" 
               style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}>
        <div className="bg-gray-700 bg-opacity-50 py-20">
          <motion.h1
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-lg text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore our portfolio of projects that demonstrate our expertise in delivering outstanding web solutions.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filters py-6 text-center">
        <div className="container mx-auto">
          <button className={`px-4 py-2 mx-2 ${selectedCategory === "All" ? "bg-accent1 text-text" : "text-primary"}`} 
                  onClick={() => setSelectedCategory("All")}>
            All
          </button>
          <button className={`px-4 py-2 mx-2 ${selectedCategory === "E-commerce" ? "bg-accent1 text-text" : "text-primary"}`} 
                  onClick={() => setSelectedCategory("E-commerce")}>
            E-commerce
          </button>
          <button className={`px-4 py-2 mx-2 ${selectedCategory === "Web Design" ? "bg-accent1 text-text" : "text-primary"}`} 
                  onClick={() => setSelectedCategory("Web Design")}>
            Web Design
          </button>
          <button className={`px-4 py-2 mx-2 ${selectedCategory === "Website Development" ? "bg-accent1 text-text" : "text-primary"}`} 
                  onClick={() => setSelectedCategory("Website Development")}>
            Website Development
          </button>
          <button className={`px-4 py-2 mx-2 ${selectedCategory === "Content Management" ? "bg-accent1 text-text" : "text-primary"}`} 
                  onClick={() => setSelectedCategory("Content Management")}>
            Content Management
          </button>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="projects-gallery py-16">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="p-4 border rounded-lg overflow-hidden relative cursor-pointer"
                variants={cardVariants}
               
                onClick={() => navigate(project.liveLink)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-lg text-neutral-500">{project.description}</p>
                </div>
                <motion.div
                  className="absolute inset-0 bg-accent2 bg-opacity-0 hover:bg-opacity-80 flex items-center justify-center text-white font-bold text-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Visit site <FiArrowRight className="ml-2" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-16 bg-secondary text-center">
        <motion.h3
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={theme.textColor==="#F0F0F0"||theme.textColor==="#C4E7F3"?{color:"black"}:{}}
        >
          Ready to Start Your Project with Us?
        </motion.h3>
        <motion.button
          className="px-8 py-3 bg-accent1 text-white rounded-full hover:bg-hover"
          whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 200 } }}
          onClick={() => navigate("/contactUs")}
        >
          Contact Us Today
        </motion.button>
      </section>
    </div>
  );
};

export default Projects;
