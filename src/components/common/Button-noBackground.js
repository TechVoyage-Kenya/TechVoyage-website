import React from "react";

const ButtonNoBackground = ({text,clickAction}) => {
  return (
    <div className="grid place-content-center ">
      <DrawOutlineButton clickAction={clickAction}>{text}</DrawOutlineButton>
    </div>
  );
};

const DrawOutlineButton = ({ children,clickAction, ...rest }) => {
  return (
    <button
      {...rest}
      className="px-3 py-1.5 text-md text-neutral-400 group relative  font-medium transition-colors duration-[400ms] hover:font-bold"
      onClick={clickAction}
    >
      <span className="font-bold exclude-theme-toggle">{children} </span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default ButtonNoBackground;