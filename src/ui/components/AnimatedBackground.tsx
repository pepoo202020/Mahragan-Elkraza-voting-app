"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TbCrossFilled } from "react-icons/tb";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const crosses = useMemo(() => {
    if (dimensions.width === 0) return [];
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 15 + 10,
      attraction: Math.random() * 15 + 15,
    }));
  }, [dimensions]);

  const dustMotes = useMemo(() => {
    if (dimensions.width === 0) return [];
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, [dimensions]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>

      {/* Dust Motes */}
      {dustMotes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full bg-white/5"
          style={{
            width: mote.size,
            height: mote.size,
            left: `${mote.x}%`,
            top: `${mote.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            ease: "linear",
            delay: mote.delay,
          }}
        />
      ))}

      {/* Interactive Crosses */}
      {crosses.map((cross) => (
        <motion.div
          key={cross.id}
          className="absolute text-primary/20"
          style={{
            left: cross.x,
            top: cross.y,
            width: cross.size,
            height: cross.size,
          }}
          animate={{
            x: (mousePosition.x - cross.x) / cross.attraction,
            y: (mousePosition.y - cross.y) / cross.attraction,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
        >
          <TbCrossFilled />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
