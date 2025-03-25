import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useTheme } from '../hooks/useTheme';

gsap.registerPlugin(Draggable);

const LightBulb = () => {
  const { toggleTheme } = useTheme();
  const switchRef = useRef(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const dummyCordRef = useRef(null);
  const hitSpotRef = useRef(null);
  const cordRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CORD_DURATION = 0.1;
    let startX: number;
    let startY: number;

    const ENDX = 98.7255;
    const ENDY = 380.5405;

    const reset = () => {
      gsap.set(proxyRef.current, {
        x: ENDX,
        y: ENDY,
      });
    };

    reset();

    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;
        
        // Calculate new position based on scroll
        const startPosition = 20; // Initial top position
        const maxMove = 100; // Maximum pixels to move down
        const newTop = startPosition + (scrollProgress * maxMove);
        
        gsap.to(containerRef.current, {
          top: newTop,
          duration: 0.1,
          ease: 'none'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    const animateCord = () => {
      const tl = gsap.timeline({
        onStart: () => {
          toggleTheme();
          gsap.set([dummyCordRef.current, hitSpotRef.current], { display: 'none' });
          gsap.set(cordRef.current, { display: 'block' });
        },
        onComplete: () => {
          gsap.set([dummyCordRef.current, hitSpotRef.current], { display: 'block' });
          gsap.set(cordRef.current, { display: 'none' });
          reset();
        },
      });

      tl.to(cordRef.current, {
        duration: CORD_DURATION,
        attr: { d: "M98.725 227.546s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507" },
        ease: "power1.inOut"
      })
      .to(cordRef.current, {
        duration: CORD_DURATION,
        attr: { d: "M98.725 227.546v150.493" },
        ease: "power1.inOut"
      });

      return tl;
    };

    Draggable.create(proxyRef.current, {
      trigger: hitSpotRef.current,
      type: 'x,y',
      onPress: (e: any) => {
        startX = e.x;
        startY = e.y;
      },
      onDrag: function(this: any) {
        gsap.set(dummyCordRef.current, {
          attr: {
            x2: this.x,
            y2: this.y,
          },
        });
      },
      onRelease: function(this: any, e: any) {
        const DISTX = Math.abs(e.x - startX);
        const DISTY = Math.abs(e.y - startY);
        const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);

        gsap.to(dummyCordRef.current, {
          attr: { x2: ENDX, y2: ENDY },
          duration: CORD_DURATION,
          onComplete: () => {
            if (TRAVELLED > 50) {
              animateCord().play();
            } else {
              reset();
            }
          },
        });
      },
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (proxyRef.current) {
        Draggable.get(proxyRef.current)?.kill();
      }
    };
  }, [toggleTheme]);

  return (
    <div ref={containerRef} className="fixed right-4 top-20 z-50 transition-all duration-200">
      <svg
        ref={switchRef}
        className="toggle-scene h-48 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin"
        viewBox="0 0 197.451 481.081"
      >
        <g className="toggle-scene__cords">
          <path
            ref={cordRef}
            className="toggle-scene__cord"
            fill="none"
            strokeLinecap="square"
            strokeWidth="6"
            d="M98.725 227.546v150.493"
          />
          <g className="toggle-scene__dummy-cord" ref={dummyCordRef}>
            <line x1="98.7255" x2="98.7255" y1="240.5405" y2="380.5405" />
          </g>
          <circle
            ref={hitSpotRef}
            className="toggle-scene__hit-spot"
            cx="98.7255"
            cy="380.5405"
            r="60"
            fill="transparent"
          />
        </g>
        <div ref={proxyRef} style={{ visibility: 'hidden' }} />
      </svg>
    </div>
  );
};

export default LightBulb;