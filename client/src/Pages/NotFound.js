import React from "react";
import { RiErrorWarningLine} from "react-icons/ri";
import { Link } from "react-router-dom";
import MetaData from '../Utils/MetaData'

const NotFound = () => {
  return (
    <>
      <MetaData title='NotFound'/>
      <div className="grid h-[88vh] md:h-screen place-items-center">
      <div className="flex flex-col items-center gap-2 md:gap-5">
        <RiErrorWarningLine className=" text-red-500 text-5xl md:text-8xl"/>
        <h1 className="uppercase text-2xl md:text-5xl">Not found</h1>
        <Link to="/">
          <button className="text-base md:text-xl mt-1 md:mt-5 w-fit mx-auto rounded-full bg-bg-black py-2 px-5 md:py-4 md:px-10 text-white transition-all duration-300 hover:bg-Purple">Home</button>
        </Link>
      </div>
    </div>
    </>
    
  );
};

export default NotFound