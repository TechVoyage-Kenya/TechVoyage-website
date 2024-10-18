import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub, FiArrowRight, FiInstagram } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import withClick from '../components/common/flipCard';
import ButtonNoBackground from '../components/common/Button-noBackground';
import { usePageTitle } from '../utils/usePageTitle';


const teamData = [
  {
    id: 1,
    name: "Albert Ondicho",
    role: "Director, Founder & CTO Techvoyage",
    description: `With over five years of experience in software engineering across media agencies, telecommunications,edtech and financial services, Albert is well-equipped to address your technology needs. His diverse background has prepared him to expertly guide you through the complexities of technology and deliver effective solutions tailored to your requirements`,

    imageUrl: "/images/sarah-connor.jpg",
    linkedin: "https://www.linkedin.com/in/albert-ondicho/",
    twitter: "https://x.com/ondicho_albert",
    github: "https://github.com/ondicho",
  },
  {
    id: 2,
    name: "Caleb Fundi",
    role: "Software Engineeer TechVoyage",
    description: `Caleb is currently pursuing a Bachelor's in Computer Science at Zetech University, having recently completed his diploma. Alongside his studies, he thrives as a software engineer at TechVoyage, where he brings ideas to life using Django for innovative software and web development. With hands-on experience in Python, particularly in artificial intelligence, he is equipped to build intelligent, dynamic applications that push the boundaries of technology.`,
    imageUrl: "/images/hermione-granger.jpg",
    linkedin: "https://www.linkedin.com/in/caleb-fundi-115a34298/",
  
    github: "https://github.com/calemaley",
  },
  {
    id: 3,
    name: "Brian Omondi",
    role: "Full-stack Developer",
    description: `Brian is a dynamic full-stack software developer with a wealth of experience in creating scalable applications. He focuses on delivering innovative, user-centric solutions that effectively tackle business, organization and individual challenges. With a dedication to quality and efficiency, he ensures that every project meets and exceeds client expectations.`,
    imageUrl: "/images/john-snow.jpg",
    linkedin: "www.linkedin.com/in/brian-omondi-1603529a/",
 
    github: "https://github.com/brianhilsden",
  },

  {
    id: 4,
    name: "Maxmillan Ng'ethe",
    role: "Graphic designer",
    description: `Max is passionate in what he does having experience in  Graphic design, Animation and Web design. He's competent in logo design and Business card designs he is a self driven partner striving for growth to achieve better`,
    imageUrl: "/images/harry-potter.jpg",
    linkedin: "https://www.linkedin.com/in/max-n-7324b8333/",
    instagram:"https://www.instagram.com/lil_maxsy/profilecard/?igsh=Nmk2MTBhdnUxcjFv ",
  
  },
];




const Card = ({ variant, style, member }) => {
  return (
    <motion.div
      style={style}
      className="team-card-content exclude-theme-toggle cursor-pointer"
      whileHover={{
        scale: 1.02, 
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)", 
        transition: { duration: 0.3, ease: "easeInOut" }, 
      }}
    >
      {variant === "Front" ? (
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Placeholder_Person.jpg"
            alt={member.name}
            className="w-full h-48 object-cover rounded-t-lg exclude-theme-toggle"
          />
          <div className="p-4 text-center exclude-theme-toggle">
            <h3 className="text-2xl font-semibold mb-1 exclude-theme-toggle">{member.name}</h3>
            <p className="text-md text-neutral-500 exclude-theme-toggle">{member.role}</p>
 
            <div className='flex justify-center items-center'>
            <ButtonNoBackground text="Flip Card" />
            <FiArrowRight/>
            </div>

          </div>
        </>
      ) : (
        <div className="p-4 text-center exclude-theme-toggle">
          <h3 className="text-2xl font-semibold mb-1 exclude-theme-toggle">{member.name}</h3>
          <p className="text-md mb-4 exclude-theme-toggle">{member.description}</p>
        
          <div className="flex gap-4 justify-center exclude-theme-toggle">
            {member.linkedin && <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiLinkedin size={24} />
            </motion.a>}
           {member.twitter && <motion.a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiTwitter size={24} />
            </motion.a>}
            {member.instagram &&<motion.a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiInstagram size={24} />
            </motion.a>}
           {member.github && <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiGithub size={24} />
            </motion.a>}
            
          </div>
          <div className='flex justify-center items-center'>
            <ButtonNoBackground text="Flip Card" />
            <FiArrowRight/>
            </div>
        </div>
      )}
    </motion.div>
  );
};
const EnhancedCard = withClick(Card);

const OurTeamPage = () => {
  const theme = useSelector((state) => state.colorTheme.value);
  usePageTitle("TechVoyage | Our Team");
  const navigate = useNavigate();
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
    hidden: { opacity: 0, x: -30 }, // Start from the left and fade in
    visible: {
      opacity: 1,
      x: 0, // Move to the original position
      transition: { duration: 0.5 }, // Duration of the animation
    },
  };

  return (
    <div style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, transition: "background-color 0.5s ease, color 0.5s ease", }}>
      <section className="hero-section py-20 text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          
        >
          We're a group of passionate individuals committed to making a difference through innovative web solutions.
        </motion.p>
      </section>

      <section className=" py-16 p-2 md:px-0 bg-gray-700">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
          
            animate="visible"
          >
            {teamData.map((member) => (
             
             <motion.div key={member.id} variants={cardVariants}>
             <EnhancedCard width="100%" height="25rem" member={member} />
           </motion.div>
              
            ))}
          
          </motion.div>
        </div>
      </section>

      <section className="cta-section py-16 bg-secondary text-center">
        <motion.h3
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={theme.textColor==="#F0F0F0"||theme.textColor==="#C4E7F3"?{color:"black"}:{}}
        >
          Want to Join Our Team?
        </motion.h3>
        <motion.button
          className="px-8 py-3 bg-accent1 text-white rounded-full hover:bg-hover"
          whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 200 } }}
          onClick={() => navigate("/ourTeam")}
        >
          Check Out Careers
        </motion.button>
      </section>
    </div>
  );
};

export default OurTeamPage;
