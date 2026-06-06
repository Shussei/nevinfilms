"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'chars,words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated to prevent stale closures
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Monitor font loading to prevent layout shifts during splitting
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.fonts && document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else if (document.fonts) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        }).catch(() => {
          setFontsLoaded(true);
        });
      } else {
        setFontsLoaded(true);
      }
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      // Skip internal GSAP animation if element is within the desktop horizontal scroller panel
      const isDesktopScroller = window.innerWidth >= 768 && !!el.closest('.panel-section');
      if (isDesktopScroller) return;

      // Identify targets to animate based on splitType
      let targets: HTMLElement[] = [];
      if (splitType.includes('chars')) {
        targets = Array.from(el.querySelectorAll('.split-char'));
      } else if (splitType.includes('words')) {
        targets = Array.from(el.querySelectorAll('.split-word'));
      } else {
        targets = Array.from(el.querySelectorAll('.split-char'));
      }

      if (targets.length === 0) return;

      // Set initial starting values
      gsap.set(targets, { ...from });

      // Compute ScrollTrigger start position based on rootMargin & threshold
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tween = gsap.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
          anticipatePin: 0.4
        },
        onComplete: () => {
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        },
        willChange: 'transform, opacity',
        force3D: true
      });

      return () => {
        // Cleanup ScrollTriggers associated with this trigger element
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  // Split text helper to generate spans for words and characters
  const words = text.split(' ');
  const Tag = tag;

  const style: React.CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  return (
    <Tag ref={ref as any} style={style} className={`split-parent ${className}`}>
      {words.map((word, wordIndex) => {
        const hasChars = splitType.includes('chars');

        return (
          <span
            key={wordIndex}
            className="split-word"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            {hasChars ? (
              word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="split-char"
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))
            ) : (
              word
            )}
            {/* Render space between words inside split-word container if needed or as trailing space */}
            {wordIndex < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
