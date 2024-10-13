import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub, FiArrowDownRight, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import withClick from '../components/common/flipCard';
import ButtonNoBackground from '../components/common/Button-noBackground';
import { usePageTitle } from '../utils/usePageTitle';


const teamData = [
  {
    id: 1,
    name: "Ragnar Lothbrok",
    role: "Team Lead & Full Stack Developer",
    description: `Sarah is an experienced leader and full-stack developer with a strong background in tech and business. She drives the team's vision for innovation and sustainable growth, while also leading the development efforts.`,
    expertise: "Leadership, Full-Stack Development, Agile Methodologies",
    languages: "JavaScript, Python, Ruby, SQL",
    imageUrl: "/images/sarah-connor.jpg",
    linkedin: "https://linkedin.com/in/sarah",
    twitter: "https://twitter.com/sarahconnor",
    github: "https://github.com/sarah",
  },
  {
    id: 2,
    name: "Tony Stark",
    role: "Backend Developer & Data Scientist",
    description: `Tony excels at developing robust backend systems and leveraging data science techniques to extract insights and drive decisions.`,
    expertise: "Backend Development, Data Science, Machine Learning",
    languages: "Python, Java, SQL",
    imageUrl: "/images/hermione-granger.jpg",
    linkedin: "https://linkedin.com/in/hermione",
    twitter: "https://twitter.com/hermione",
    github: "https://github.com/hermione",
  },
  {
    id: 3,
    name: "John Snow",
    role: "Full Stack Developer",
    description: `John is a full-stack expert, skilled in building efficient and scalable applications. He specializes in modern web technologies and cloud architecture.`,
    expertise: "Full-Stack Development, Cloud Architecture, RESTful APIs",
    languages: "JavaScript, TypeScript, Python, Node.js",
    imageUrl: "/images/john-snow.jpg",
    linkedin: "https://linkedin.com/in/johnsnow",
    twitter: "https://twitter.com/johnsnow",
    github: "https://github.com/johnsnow",
  },

  {
    id: 4,
    name: "Harry Potter",
    role: "UI/UX Expert",
    description: `Harry designs intuitive and visually appealing interfaces. His focus on user-centered design helps create engaging and functional products.`,
    expertise: "UI/UX Design, Wireframing, Prototyping",
    tools: "Figma, Sketch, Adobe XD",
    imageUrl: "/images/harry-potter.jpg",
    linkedin: "https://linkedin.com/in/harry",
    twitter: "https://twitter.com/harry",
    github: "https://github.com/harry",
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
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            alt={member.name}
            className="w-full h-48 object-cover rounded-t-lg exclude-theme-toggle"
          />
          <div className="p-4 text-center exclude-theme-toggle">
            <h3 className="text-2xl font-semibold mb-1 exclude-theme-toggle">{member.name}</h3>
            <p className="text-md text-neutral-500 exclude-theme-toggle">{member.role}</p>
            <p className="text-lg mb-4 exclude-theme-toggle">{member.expertise}</p>
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
          <p className="text-md mb-4 exclude-theme-toggle">{member.languages || member.tools}</p>
          <div className="flex gap-4 justify-center exclude-theme-toggle">
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiLinkedin size={24} />
            </motion.a>
            <motion.a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiTwitter size={24} />
            </motion.a>
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-primary exclude-theme-toggle"
            >
              <FiGithub size={24} />
            </motion.a>
            
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
