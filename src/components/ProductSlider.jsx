"use client"
import React, { useEffect, useRef, useState } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// gsap.registerPlugin(Draggable);

function ProductSlider() {
    
  const products = [
    {
      image: banner1,
      subTitle: "Client 1",
      title: "Dubai, United Arab Emirates",
    },
    {
      image: banner2,
      subTitle: "Client 2",
      title: "Dubai, United Arab Emirates",
    },
    {
      image: banner1,
      subTitle: "Client 3",
      title: "Dubai, United Arab Emirates",
    },
    {
      image: banner2,
      subTitle: "Client 4",
      title: "Dubai, United Arab Emirates",
    },
    {
      image: banner1,
      subTitle: "Client 5",
      title: "Dubai, United Arab Emirates",
    },
    {
      image: banner2,
      subTitle: "Client 6",
      title: "Dubai, United Arab Emirates",
    },
  ];

  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const draggableRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
    
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { Draggable } = await import('gsap/Draggable');
      const { InertiaPlugin } = await import('gsap/InertiaPlugin');
      gsap.registerPlugin(Draggable, InertiaPlugin);

      const track = trackRef.current;
      const slides = slideRefs.current;
      const slideWidth = slides[0].offsetWidth;
      const centerOffset = window.innerWidth / 2 - slideWidth / 2  - slideWidth / 4 ;
      const maxIndex = products.length - 1;

      const clampIndex = (i) =>
        Math.max(0, Math.min(i, products.length - 1));

      const updateScales = (index) => {
        slides.forEach((slide, i) => {
          const scale = i === index ? 1 : 0.5;
          gsap.to(slide, {
            scale,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      };

      const goToIndex = (index) => {
        const clamped = clampIndex(index);
        setActiveIndex(clamped);
        const x = -slideWidth * clamped + centerOffset;
        gsap.to(track, {
          x,
          duration: 0.5,
          ease: 'power3.out',
        });
        // updateScales(clamped);
      };

      const draggable = Draggable.create(track, {
        type: 'x',
        inertia: true,
        bounds: {
          minX: -slideWidth * (products.length - 1) + centerOffset,
          maxX: centerOffset,
        },
        snap: (endX) => {
          const index = Math.round((-endX + centerOffset) / slideWidth);
          const clampedIndex = clampIndex(index);
          goToIndex(clampedIndex);
          return -slideWidth * clampedIndex + centerOffset;
        },
      })[0];

      draggableRef.current = draggable;
      goToIndex(activeIndex);
    };

    init();

    return () => {
      draggableRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <>
      <h2 className="text-[54px] pt-[148px] px-[490px]">Quality Products</h2>
      <p className="text-[24px] leading-10 w-[750px] mx-auto my-0 py-10 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        labors aisi ut aliguip ex ea commodo cong isi qui squat.</p>
      <div className="w-[1440px] px-12 h-300 overflow-x-hidden overflow-y-auto"
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <div ref={trackRef} className="flex w-[1400px]">
        {products.map((src, i) => {
            
        let positionClass = '';
        if (i === activeIndex) {
            positionClass = 'mx-[5%] w[23.33%] gap-4';
        } else if (i === activeIndex - 1) {
            positionClass = '-rotate-9 mt-10';
        } else if (i === activeIndex + 1) {
            positionClass = 'rotate-9 mt-10';
        }
        return (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className={`w-[33.333%] text-center px-0 flex-shrink-0 transform transition-transform duration-300 ${positionClass}`}
          >
            <img
              src={src?.image?.src}
              className="w-[435px] h-[620px] mx-auto my-15"
              alt={`slide-${i}`}
            />
            <div>{src?.subTitle}</div>
            <div>{src?.title}</div>
          </div>
        )
        }
        )}
      </div>
    </div>
    {isHovered && (
        <div 
          ref={cursorRef}
          className="fixed top-0 -left-0 w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold z-50 pointer-events-none filter invert cursor-none bg-opacity-5">
          drag
        </div>
      )}
    </>
  );
}

export default ProductSlider;
