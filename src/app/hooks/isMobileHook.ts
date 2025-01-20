"use client"
import { useState, useEffect } from 'react';

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen width is below the breakpoint
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Run the function on mount
    handleResize();

    // Add event listener to detect screen resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;
