import React, { useState } from "react";
import openIcon from '../assets/open-icon.png'
import Image from "next/image";

function NavBar() {
    const [ openMenu , setOpenMenu] = useState(false);
  return (
    <div className="absolute md:top-[21px] w-full md:w-[1400px] h-[101px] z-10 bg-white left-1/2 -translate-x-1/2 ">
      {/* Desktop menu */}
      <div className="justify-between hidden md:flex">
        <nav className="my-[40px] mx-[39px] text-black flex gap-5 text-[14px]" style={{ letterSpacing: '0.1px' }}>
          <a href="#">About</a>
          <a href="#">News</a>
          <a href="#">Services</a>
          <a href="#">Our Team</a>
          <a href="#">Make Enquiry</a>
        </nav>
        <a
            href="#"
            className="flex h-9 w-[148px] text-[#221F20] text-4 m-[33px] leading-9 pl-4 border-1"
        >Contact us</a>
      </div>

      {/* Mobile Menu */}
      <div className="flex h-[81px] overflow-hidden justify-between md:hidden">
        <a
            href="#"
            className="flex w-41 h-9 px-[17px] py-[5px] my-[33px] mx-[27px] border text-[#221F20] "
        >Contact us</a>
        <button
            className="flex bg-[#F9F4EE] w-10 h-10 overflow-hidden mx-1 my-[30px]"
            onClick={() => {setOpenMenu(!openMenu)}}
        >{!openMenu ? <Image src={openIcon} className="w-[20px] h-[14px] mt-3 ml-[10px]" /> : 'close' }</button>
      </div>
        {openMenu && 
            <div className="flex flex-col z-10 bg-white gap-2 pb-[30px] text-center">
            <a href="#" className="p-1">About</a>
            <a href="#" className="p-1">News</a>
            <a href="#" className="p-1">Services</a>
            <a href="#" className="p-1">Our Team</a>
            <a href="#" className="p-1">Make Enquiry</a>
            </div>
        }
    </div>
  );
}

export default NavBar;
