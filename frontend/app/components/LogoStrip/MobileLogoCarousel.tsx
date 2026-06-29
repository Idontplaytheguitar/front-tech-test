'use client';

import Logo, { LogoProps } from "@/app/components/Logo";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";

/*
 * Gap between the first and duplicate set of logos, equivalent to 2xl spacing
 * This value is used in resetting the animation
 */
const GAP = 32;

export const MobileLogoCarousel: FC<{ logos: LogoProps['type'][] }> = ({ logos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerWidth, setScrollContainerWidth] = useState(0);
  const baseX = useMotionValue(0);

  /*
   * Get the width of the div that contains a single set of logos. 
   * This width is used to reset the animation 
   */
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;

    setScrollContainerWidth(containerWidth);
  }, [containerRef.current]);

  useAnimationFrame(() => {
    if (scrollContainerWidth === 0) return;

    const speed = 0.8; // pixels per frame (adjust for speed)

    const currentX = baseX.get();
    let newX = currentX - speed;

    /**
     * When we've scrolled one full set, wrap back to the beginning.
     */
    if (Math.abs(newX) >= (scrollContainerWidth + GAP)) {
      newX = 0;
    }
    baseX.set(newX);
  });

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex space-x-2xl"
        style={{
          x: baseX,
          width: 'fit-content',
        }}
      >
        <div ref={containerRef} className="flex items-center space-x-2xl" >
          {logos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <Logo type={logo} />
            </div>
          ))}
        </div>
        {/* A duplicate sequence of logos so that the end of the animation is seamless */}
        <div className="flex items-center space-x-2xl" >
          {logos.map((logo, index) => (
            <div
              key={`duplicate-${logo}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <Logo type={logo} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
