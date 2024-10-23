import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiLinkedin, SiGmail, SiWhatsapp } from "react-icons/si";
import logo from "../../assets/images/logo2.png"
import { useNavigate } from "react-router-dom";

export const TechVoyageGrid = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref,{once:true})

  useEffect(()=>{
    console.log(isInView);
    
  },[isInView])
  console.log(isInView);
  

 
    return (
      <div ref={ref} className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-50">
        <Logo />
        <motion.div
          initial="initial"
          animate={ "animate"}
          transition={{
            staggerChildren: 0.05,
          }}
          className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
        >
          <HeaderBlock navigate={navigate} isInView={isInView} />
          <SocialsBlock isInView={isInView} />
          <AboutBlock isInView={isInView} />
          <LocationBlock isInView={isInView} />
          <EmailListBlock isInView={isInView} />
        </motion.div>
      
      </div>
    );

  
  
};

const Block = ({ className, isInView, ...rest }) => {
  if(isInView){
    return (
      <motion.div
        variants={{
          initial: {
            scale: 0.5,
            y: 50,
            opacity: 0,
          },
          animate: {
            scale: 1,
            y: 0,
            opacity: 1,
          },
        }}
        transition={{
          type: "spring",
          mass: 3,
          stiffness: 400,
          damping: 50,
        }}
        className={twMerge(
          "col-span-4 rounded-lg border border-zinc-700 bg-background p-6",
          className
        )}
        {...rest}
      />
    );

  }
  
};
const HeaderBlock = ({navigate,isInView}) => (
  <Block className="col-span-12 row-span-2 md:col-span-6" isInView={isInView}>
    <img
      src={logo}
      alt="TechVoyage logo"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      <span className="text-zinc-400">
      Transforming ideas into impactful digital solutions that drive results.
      </span>
    </h1>
    <span
      className="flex items-center gap-1 text-red-300 hover:underline exclude-theme-toggle"
      onClick={()=>navigate("/ourTeam")}
    >
      Learn more about us <FiArrowRight />
    </span>
  </Block>
);


const SocialsBlock = ({isInView}) => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
      isInView={isInView}
    >
      <a
        href="mailto:techvoyage.kenya@gmail.com"
        target="_blank" 
        rel="noopener noreferrer" // Security best practice
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGmail />
      </a>
    </Block>
    <Block
      whileHover={isInView && {
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6  md:col-span-3 bg-black"
      isInView={isInView}
    >
      <a
        href="https://github.com/TechVoyage-Kenya"
        target="_blank" 
        rel="noopener noreferrer" // Security best practice
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      isInView={isInView}
      className="col-span-6 bg-text md:col-span-3"
    >
      <a
        href="https://linkedin.com/company/"
        target="_blank" 
        rel="noopener noreferrer" // Security best practice
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiLinkedin />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 md:col-span-3 bg-accent1"
      isInView={isInView}
    >
      <a
        href="https://wa.me/1234567890"
        target="_blank" 
        rel="noopener noreferrer" // Security best practice
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiWhatsapp />
      </a>
    </Block>
  </>
);


const AboutBlock = ({isInView}) => (
  <Block className="col-span-12 text-3xl leading-snug" isInView={isInView}>
    <p>
      At TechVoyage, we are dedicated to delivering innovative web solutions that propel your business forward.{" "}
      <span className="text-zinc-400">
        From custom website development to seamless user experiences, our team harnesses the latest technologies to address your unique needs. We take pride in crafting tailored solutions that align with your vision and drive measurable results.
      </span>
    </p>
  </Block>
);


const LocationBlock = ({isInView}) => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3" isInView={isInView}>
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Nairobi, Kenya</p>
  </Block>
);

const EmailListBlock = ({isInView}) => (
  <Block className="col-span-12 md:col-span-9" isInView={isInView}>
    <p className="mb-3 text-lg">Join our newsletter</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join now
      </button>
    </form>
  </Block>
);

const Logo = () => {
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-12 fill-zinc-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};


