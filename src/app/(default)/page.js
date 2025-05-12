"use client"

import BannerSection from "@/components/BannerSection";
import ProductSlider from "@/components/ProductSlider";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-full md:w-[1440px] mx-auto my-0">
      <BannerSection />
      <ProductSlider />
    </main>
  );
}
