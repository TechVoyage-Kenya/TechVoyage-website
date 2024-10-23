import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiArrowRight,
  FiEdit,
  FiPlusCircle,
  FiInstagram,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import withClick from "../components/common/flipCard";
import ButtonNoBackground from "../components/common/Button-noBackground";
import { usePageTitle } from "../utils/usePageTitle";
import TeamModal from "../components/common/TeamModal";
import {
  addProfile,
  deleteProfile,
  editProfile,
} from "../redux/reducers/profilesSice";
import axios from "axios";
import ConfirmModal from "../components/common/DeleteConfirmationModal";
/* const teamData = [
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
]; */

const Card = ({
  variant,
  style,
  member,
  user,
  imageUrl,
  handleEdit,
  handleDelete,
}) => {
  return (
    <motion.div
      style={style}
      className="team-card-content exclude-theme-toggle cursor-pointer relative"
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      {user?.email && user.id === member.userId && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => handleEdit(member)}
            className="text-accent1 hover:text-accent2 px-2 py-2 bg-gray-200/30 grid place-content-center"
          >
            <FiEdit size={24} />
          </button>
          <ConfirmModal Confirmed={() => handleDelete(member.id)} />
        </div>
      )}

      {variant === "Front" ? (
        <>
          <img
            src={imageUrl}
            alt={member.fullName}
            className={`w-full h-[300px] rounded-t-lg exclude-theme-toggle ${member.fullName === "Maxmillan Ng'ethe" ? 'object-cover mt-5 sm:mt-0' : 'object-cover'}`} 
          />
          <div className="p-4 text-center exclude-theme-toggle">
            <h3 className="text-2xl font-semibold mb-1 exclude-theme-toggle">
              {member.fullName}
            </h3>
            <p className="text-md text-neutral-500 exclude-theme-toggle">
              {member.role}
            </p>
            <p className="text-lg mb-4 exclude-theme-toggle">
              {member.expertise}
            </p>
            <div className="flex justify-center items-center border border-gray-500 bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <ButtonNoBackground text="View more" />
              <FiArrowRight className="ml-2 text-gray-300 text-xl" />
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 text-center exclude-theme-toggle">
          <h3 className="text-2xl font-semibold mb-1 exclude-theme-toggle">
            {member.fullName}
          </h3>
          <p className="text-md mb-4 exclude-theme-toggle">
            {member.description}
          </p>
          <p className="text-md mb-4 exclude-theme-toggle">
            {member.languages || member.tools}
          </p>
          <div className="flex gap-4 justify-center exclude-theme-toggle items-center">
            {member.linkedin && (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-primary exclude-theme-toggle"
                title="LinkedIn"
              >
                <FiLinkedin size={24} />
              </motion.a>
            )}
            {member.twitter && (
              <motion.a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-primary exclude-theme-toggle"
                title="twitter"
              >
                <FiTwitter size={24} />
              </motion.a>
            )}
            {member.github && (
              <motion.a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-primary exclude-theme-toggle"
                title="github"
              >
                <FiGithub size={24} />
              </motion.a>
            )}
            {member.instagram && (
              <motion.a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-primary exclude-theme-toggle"
                title="Instagram"
              >
                <FiInstagram size={24} />
              </motion.a>
            )}
            {member.website && (
              <motion.a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-primary exclude-theme-toggle flex items-center justify-center"
                title="Personal website"
              >
                <img
                  src={member.fullName==="Brian Omondi" && "https://brian-omondi.vercel.app/_next/image?url=%2Fimages%2FofficialLogo.png&w=96&q=75"}
                  width={35}
                  height={35}
                  
                  alt="website logo"
                />
              </motion.a>
            )}
          </div>
          <div className="flex justify-center items-center">
            <ButtonNoBackground text="Go back" />
            <FiArrowRight />
          </div>
        </div>
      )}
    </motion.div>
  );
};
const EnhancedCard = withClick(Card);

const OurTeamPage = () => {
  const team = useSelector((state) => state.profiles.profiles);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.colorTheme.value);
  const user = useSelector((state) => state.user.value);
  usePageTitle("TechVoyage | Our Team");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Add a team member
  const addTeamMember = (profile) => {
    const newProfile = { ...profile, userId: user.id };

    axios
      .post("https://tech-voyage-express-js.vercel.app/api/profile", newProfile)
      .then((response) => {
        dispatch(addProfile(response?.data?.data));
      })
      .catch((error) => console.error("Error adding profile:", error));
  };

  // Update a team member
  const updateTeamMember = (updatedMember) => {
    axios
      .put(
        `https://tech-voyage-express-js.vercel.app/api/profile/${updatedMember.id}`,
        updatedMember
      )
      .then((response) => {
        dispatch(editProfile(response?.data?.data));
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  // Delete a team member
  const deleteTeamMember = (id) => {
    axios
      .delete(`https://tech-voyage-express-js.vercel.app/api/profile/${id}`)
      .then(() => dispatch(deleteProfile(id)))
      .catch((error) => console.error("Error deleting member:", error));
  };

  const handleAdd = () => {
    setSelectedMember(null);

    setIsModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
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
  const cardVariants = {
    hidden: { opacity: 0, x: -30 }, // Start from the left and fade in
    visible: {
      opacity: 1,
      x: 0, // Move to the original position
      transition: { duration: 0.5 }, // Duration of the animation
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
          We're a group of passionate individuals committed to making a
          difference through innovative web solutions.
        </motion.p>
      </section>

      {user?.email && (
        <div className="text-center my-6">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-accent1 text-white rounded-lg"
          >
            <FiPlusCircle className="inline-block mr-2" /> Add Profile
          </button>
        </div>
      )}

      <section className=" py-16 p-2 md:px-0 bg-gray-700">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {team[0] &&
              team.map((member) => (
                <motion.div key={member.id} variants={cardVariants}>
                  <EnhancedCard
                    width="100%"
                    height="25rem"
                    member={member}
                    handleDelete={deleteTeamMember}
                    handleEdit={handleEdit}
                    user={user}
                    imageUrl={member.imageUrl}
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedMember ? updateTeamMember : addTeamMember}
        member={selectedMember}
      />

      <section className="cta-section py-16 bg-secondary text-center">
        <motion.h3
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={
            theme.textColor === "#F0F0F0" || theme.textColor === "#C4E7F3"
              ? { color: "black" }
              : {}
          }
        >
          Want to Join Our Team?
        </motion.h3>
        <motion.button
          className="px-8 py-3 bg-accent1 text-white rounded-full hover:bg-hover"
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 200 },
          }}
          onClick={() => navigate("/ourTeam")}
        >
          Check Out Careers
        </motion.button>
      </section>
    </div>
  );
};

export default OurTeamPage;
