"use client";

import React, { useState, useCallback } from 'react';
import './GradientText.css';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';

  // Duplicate the first color at the end to create a seamless looping gradient transition
  const gradientColors = [...colors, colors[0]].join(', ');

  const backgroundSize =
    direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%';

  const animationName = direction === 'vertical' ? 'gradient-shift-vertical' : 'gradient-shift-horizontal';
  const animationDirection = yoyo ? 'alternate' : 'normal';

  const containerStyle = {
    "--gradient-background": `linear-gradient(${gradientAngle}, ${gradientColors})`,
    "--gradient-size": backgroundSize,
    "--gradient-animation": `${animationName} ${animationSpeed}s linear infinite ${animationDirection}`,
    "--gradient-play-state": isPaused ? 'paused' : 'running'
  } as React.CSSProperties;

  return (
    <div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      <span className="text-content">
        {children}
      </span>
    </div>
  );
}
