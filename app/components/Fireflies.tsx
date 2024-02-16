'use client'
import React, { useEffect } from 'react';
import gsap from 'gsap';
 

const Fireflies = () => {
    const FIREFLIES = 10;
    const maxHeight = 600;
    const maxWidth = 1200;
  
    const random = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
  
    useEffect(() => {
      const fireflies = Array.from({ length: FIREFLIES }, (_, i) => i);
  
      fireflies.forEach((index) => {
        let ix = random(-10, maxWidth + 10);
        let fx = random(-10, maxWidth + 10);
        let iy = random(-10, maxHeight + 10);
        let fy = random(-10, maxHeight + 10);
  
        gsap.fromTo(
          `.firefly-${index}`,
          {
            x: ix,
            y: iy,
          },
          {
            x: fx,
            y: fy,
            duration: random(5, 15),
            ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })",
            repeat: -1,
            yoyo: true,
          }
        );
  
        gsap.fromTo(
          `.firefly-${index}`,
          {
            boxShadow: '0 0 0 0px rgba(154, 205, 50, 0)',
          },
          {
            boxShadow: '0 0 0 3px rgba(154, 205, 50, 0.4)',
            duration: random(2, 4),
            ease: "slow(0.7, 0.7, false)",
            repeat: -1,
            yoyo: true,
          }
        );
  
        gsap.fromTo(
          `.firefly-${index}`,
          {
            opacity: 0,
          },
          {
            duration: random(1, 5),
            opacity: 0.9,
            repeat: -1,
            yoyo: true,
          }
        );
      });
    }, []);

    return (
        <>
          {Array.from({ length: FIREFLIES }, (_, i) => (
            <div key={i} className={`firefly firefly-${i}`} />
          ))}
        </>
      );
    };
    export default  Fireflies;