import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import Image from 'next/image';
import { motion , AnimatePresence } from 'framer-motion';

function BannerSection() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const slides = [
    {
      image: banner1,
      subTitle: "Welcome To TenTwenty Farms",
      title: "From our Farms <br/>to your hands"
    },
    {
      image: banner2,
      subTitle: "Welcome To TenTwenty Farms",
      title: "From our Farms <br/>to your hands"
    }
  ]

  useEffect( () => {
    const timer = setTimeout( () => {
      setIndex( (prev) => (prev +1) % slides.length )
    } , 3000)
    return () => clearInterval(timer)
  },index )

  useEffect( () => {
    const timer = setTimeout( () => {
      setPrevIndex( index )
    } , 3000)
    return () => clearInterval(timer)
  })

  return (
    <section className='relative overflow-hidden h-[812px] md:h-[900px] '>
        <>
        {/* Navigation bar */}
        <NavBar />

        {/* Banner Area */}

        {/* slider */}
        <div className='relative w-full h-[812px] md:h-[900px] aspect-video overflow-hidden'>

        {/* backroud iamge for remove glitch */}
        <div
          className='absolute top-0 left-0 w-full h-[812px] md:h-[900px]'
          style={{
            backgroundImage:`url(${slides[prevIndex]?.image?.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            className="w-full relative top-1/2"
            key={index}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            exit={{ height: '100%' }}
            transition={{ duration : 1, ease: 'easeInOut' }}
            style={{ transform: 'translateY(-50%)' }}
          >  
            <div 
            className='w-full h-full'
            style={{ 
              backgroundImage: `url(${slides[index]?.image?.src})`, 
              backgroundSize: 'cover',
              backgroundPosition : 'center'
            }}
            />
            <div className='absolute top-[266px] left-[26px] md:top-[350px] md:left-[135px]'>
              <div className='text-[#EEF4F9] text-[14px] md:text-base '>{slides[index]?.subTitle}</div>
              <h1 className='text-[#EEF4F9] w-[348px] text-[46px] mt-1 md:text-[64px] hidden md:block md:w-[536px] capitalize md:mt-[22px]' style={{lineHeight: '4rem'}} dangerouslySetInnerHTML={{"__html": slides[index]?.title}} />
              <h1 className='text-[#EEF4F9] w-[348px] text-[46px] mt-[12px] md:text-[64px] block md:hidden md:w-[536px] capitalize md:mt-[22px]' style={{lineHeight: '2.9rem'}} dangerouslySetInnerHTML={{"__html": slides[index]?.title}} />
            </div>
          </motion.div>
        </AnimatePresence>

          {/* Thumbnail */}
          <div className='absolute flex top-[639px] left-[25px] md:top-[694px] md:left-[135px] justify-between'>
            <div 
              className='flex w-[117px] h-[117px] md:w-[138px] md:h-[138px] border-1 border-[#EEF4F9] border-opacity-30 cursor-pointer' 
              onClick={ () => setIndex( (prev) => (prev +1) % slides.length ) }
            >
              <Image 
                className='border-2 border-white h-[116px] md:h-[138px] p-[14px]'
                src={slides[slides.length-1 < index+1 ? 0 : index+1]?.image}
                alt=''
              />
              <p className='text-[#EEF4F9] absolute top-[44px] md:top-[56px] left-[43px] md:left-[51px] text-[14px] md:text-base '>Next</p>
            </div>
            {/* navigation */}
            <div className='flex ml-[40px] md:ml-[33px] mt-[47px] md:mt-[58px]  text-[14px] md:text-base text-white'>
              {index+1 < 9 ? `0${index+1}` : index+1 } 
              <span className='border-1 border-white h-0 w-[103px] mx-[16px] my-[10px]'></span> 
              {slides.length < 9 ? `0${slides.length}` : slides.length }
            </div>
          </div>
          </div>
        </>
    </section>
  )
}

export default BannerSection