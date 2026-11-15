'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}
