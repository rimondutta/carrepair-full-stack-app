"use client";

import { useEffect, useState } from "react";

interface UseCounterProps {
  end: number;
  duration?: number;
  start?: boolean;
}

export function useCounter({ end, duration = 2000, start = true }: UseCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out sine
      const easeOut = Math.sin((percentage * Math.PI) / 2);
      
      setCount(Math.floor(easeOut * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (start) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
}
