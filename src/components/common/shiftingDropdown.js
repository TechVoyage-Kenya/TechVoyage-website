import React, { useEffect, useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const ShiftingDropDown = () => {
  return (
    <div className="flex w-[90%] justify-start md:justify-center exclude-theme-toggle">
      <Tabs />
      <ContactButton />
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // State to store timeout ID

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setSelected(val);
  };

  const handleMouseLeave = () => {
    // Set a timeout to delay the closing of the dropdown
    const id = setTimeout(() => {
      handleSetSelected(null);
    }, 200); // Adjust the delay as necessary (200ms in this example)

    setTimeoutId(id);
  };

  return (
    <div onMouseLeave={handleMouseLeave} className="relative flex h-fit gap-2">
      {TABS.map((t) => (
        <Tab key={t.id} selected={selected} handleSetSelected={handleSetSelected} tab={t.id} link={t.link}>
          {t.title}
        </Tab>
      ))}
      <AnimatePresence>
        {selected && (
          <div 
            onMouseEnter={() => clearTimeout(timeoutId)} // Clear timeout when hovering over content
            onMouseLeave={handleMouseLeave} // Ensure it closes when mouse leaves
          >
            <Content dir={dir} selected={selected} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected,link }) => {
  const theme = useSelector((state) => state.colorTheme.value);
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true);
  const location = useLocation()
  const navigate = useNavigate()
  let currentLocation = location.pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 text-md font-bold ${
        selected === tab ? `bg-[${theme.backgroundColor}] text-[${theme.textColor}]` : ''
      }`}
      style={{
        fontWeight: selected === tab ? 'bold' : 'normal',
        
      }}
    >
      <span className="exclude-theme-toggle" 
      
      style={{ color: theme.navTextColor && isNavbarAtTop && currentLocation==="/" ? theme.navTextColor : theme.textColor,transition: "background-color 0.5s ease, color 0.5s ease",  }} onClick={()=>navigate(link)} >{children}</span>
      <FiChevronDown className={`transition-transform ${selected === tab ? 'rotate-180' : ''}`} style={{ color: theme.navTextColor && isNavbarAtTop && currentLocation==="/" ? theme.navTextColor : theme.textColor,transition: "background-color 0.5s ease, color 0.5s ease",  }} />
    </button>
  );
};


const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute left-10 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4 z-10"
    >
      <Bridge />
      <Nub selected={selected} />
      {TABS.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    moveNub();
    // eslint-disable-next-line
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const ContactButton = () => {
  const navigate = useNavigate();
  const theme = useSelector((state)=>state.colorTheme.value)
  const location = useLocation()
  let currentLocation = location.pathname
  return (
    <button
      className="ml-4 flex items-center gap-1 text-md hover:font-bold"
      onClick={() => navigate("/contactUs")}
      style={{color:theme.navTextColor && currentLocation ==="/"?theme.navTextColor:theme.textColor,transition: "background-color 0.5s ease, color 0.5s ease", }}
    >
      <span className="exclude-theme-toggle">Contact Us</span>
     
    </button>
  );
};

const Services = () => {
  const theme = useSelector((state) => state.colorTheme.value);
  const navigate = useNavigate()
  
  return (
    <div>
      <h3 className="mb-2 text-lg font-medium" style={{color: theme.navTextColor ? theme.navTextColor : theme.textColor}}>
        Our Web Solutions
      </h3>
      <div className="flex gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium exclude-theme-toggle" style={{color: theme.navTextColor ? theme.navTextColor : theme.textColor}}>
            Website Development
          </h4>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            Custom Websites
          </span>
          <span className="block text-sm text-neutral-400 exclude-theme-toggle">
            E-commerce Solutions
          </span>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium exclude-theme-toggle" style={{color: theme.navTextColor ? theme.navTextColor : theme.textColor}}>
            Web Design
          </h4>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            User Experience Design
          </span>
          <span className="block text-sm text-neutral-400 exclude-theme-toggle">
            Responsive Designs
          </span>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium exclude-theme-toggle" style={{color: theme.navTextColor ? theme.navTextColor : theme.textColor}}>
            Content Management
          </h4>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            CMS Integration
          </span>
          <span className="block text-sm text-neutral-400 exclude-theme-toggle">
            Blog Setup and Management
          </span>
        </div>
      </div>

      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300 hover:font-bold">
        <span className="exclude-theme-toggle" onClick={()=>navigate("/ourServices")}>Discover More</span>
        <FiArrowRight />
      </button>
    </div>
  );
};


const Team = () => {
  const theme = useSelector((state)=>state.colorTheme.value)
  const navigate = useNavigate()
  return (
    <div>
      <h3 className="mb-2 text-lg font-medium exclude-theme-toggle" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>Our Team</h3>
      <p className="text-sm text-neutral-400 mb-4 exclude-theme-toggle">
      Get to know the professionals who drive our vision and bring ideas to life. 
      </p>

      <button className= "ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300 hover:font-bold exclude-theme-toggle" onClick={()=>navigate("/ourTeam")}>
        <span className="exclude-theme-toggle">View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Taskboard = () => {
  const navigate = useNavigate();
  const theme = useSelector((state)=>state.colorTheme.value)
  return (
    <div>
      <h3 className="mb-2 text-lg font-medium" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>Taskboard</h3>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-2 text-sm font-medium exclude-theme-toggle" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>In Progress</h3>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            Build New Features
          </span>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            Fix Bugs
          </span>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium exclude-theme-toggle" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>Upcoming Tasks</h3>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            Launch Marketing Campaign
          </span>
          <span className="block text-sm text-neutral-400 exclude-theme-toggle">
            User Testing
          </span>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>Completed</h3>
          <span className="mb-1 block text-sm text-neutral-400 exclude-theme-toggle">
            Release Version 1.0
          </span>
          <span className="block text-sm text-neutral-400 exclude-theme-toggle">
            Update Documentation
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate("/tasksBoard")}
        className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300 hover:font-bold"
      >
        <span className="exclude-theme-toggle">View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};
const Projects = () => {
  const theme = useSelector((state)=>state.colorTheme.value)
  const navigate = useNavigate()
  const projectsData = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A robust online store with integrated payment solutions.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTTWSKuyABvcflwHBH6ckXxv_Z57PiXQBTQ&s",
      category: "E-commerce",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A sleek, modern portfolio for a creative professional.",
      imageUrl: "https://colorlib.com/wp/wp-content/uploads/sites/2/videograph-free-template-353x278.jpg",
      category: "Web Design",
    },

  ];
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {projectsData.map((project)=>(
          <span>
          <img
            className="mb-2 h-14 w-full rounded object-cover exclude-theme-toggle"
            src={project.imageUrl}
            alt={project.title}
          />
          <h4 className="mb-0.5 text-sm font-medium exclude-theme-toggle" style={{color:theme.navTextColor?theme.navTextColor:theme.textColor}}>{project.title}</h4>
          <p className="text-xs text-neutral-400 exclude-theme-toggle">
            {project.description}
          </p>
        </span>

        ))}
      
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300 hover:font-bold" onClick={()=>navigate("/projects")}>
        <span className="exclude-theme-toggle">View all projects</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const TABS = [
  {
    id: 1,
    title: "Services",
    Component: Services,
    link:"/ourServices"
  },
  {
    id:2,
    title: "Projects",
    Component: Projects,
    link:"/projects"
  },
  {
    id: 3,
    title: "Our Team",
    Component: Team,
    link:"/ourTeam"
  },
  {
    id: 4,
    title: "Tasks Board",
    Component: Taskboard,
    link:"/tasksBoard"
  },
];

export default ShiftingDropDown;
