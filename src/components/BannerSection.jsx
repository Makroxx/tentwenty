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
      title: "From our Farms to your hands"
    },
    {
      image: banner2,
      subTitle: "New Farms",
      title: "From new hands"
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
    <section className='relative overflow-hidden h-screen'>
        <>
        {/* Navigation bar */}
        <NavBar />

        {/* Banner Area */}

        {/* slider */}
        <div className='relative h-screen w-full aspect-video overflow-hidden'>

        {/* backroud iamge for remove glitch */}
        <div
          className='absolute top-0 left-0 w-full h-full'
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
          </motion.div>
        </AnimatePresence>

          {/* Thumbnail */}
          <div className='absolute bottom-10 left-50'>
            <div 
              className='w-30 h-30' 
              onClick={ () => setIndex( (prev) => (prev +1) % slides.length ) }
            >
              <Image 
                className='w-30 h-30 border-5 m-2 border-white'
                src={slides[index+1]?.image}
                alt=''
              />
              <p className='text-white absolute bottom-10 text-3xl left-8'>Next</p>
            </div>
          </div>
          </div>
        </>
    </section>
  )
}

export default BannerSection