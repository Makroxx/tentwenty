import React, { useState } from "react";

function NavBar() {
    const [ openMenu , setOpenMenu] = useState(false);
  return (
    <div className="absolute md:top-[21px] w-full md:w-[1400px] h-[101px] z-10 bg-white left-1/2 -translate-x-1/2 ">
      {/* Desktop menu */}
      <div className="justify-between hidden md:flex">
        <nav className="my-[40px] mx-[39px] text-black flex gap-5">
          <a href="#">About</a>
          <a href="#">News</a>
          <a href="#">Services</a>
          <a href="#">Our Team</a>
          <a href="#">Make Enquiry</a>
        </nav>
        <a
            href="#"
            className="flex h-9 w-[148px] px-[10px] py-[5px] m-[30px] border text-[#221F20] "
        >Contact us</a>
      </div>

      {/* Mobile Menu */}
      <div className="flex justify-between md:hidden">
        <a
            href="#"
            className="flex h-9 px-[10px] py-[5px] m-[30px] border text-[#221F20] "
        >Contact us</a>
        <button
            className="flex bg-[#F9F4EE] w-10 h-10 overflow-hidden m-[30px]"
            onClick={() => {setOpenMenu(!openMenu)}}
        >{!openMenu ? 'Open' : 'close' }</button>
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
