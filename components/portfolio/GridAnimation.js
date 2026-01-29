"use client"

import { useEffect, useRef } from 'react';

export default function GridAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    // Get container dimensions
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    updateDimensions();
    
    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let time = 0;

    // Get theme colors from CSS variables
    const getThemeColor = (variable, fallback) => {
      if (typeof window === 'undefined') return fallback;
      const root = document.documentElement;
      const value = getComputedStyle(root).getPropertyValue(variable).trim();
      return value || fallback;
    };

    // Convert hex to rgba for opacity control
    const hexToRgba = (hex, alpha) => {
      if (!hex || hex.length < 7) return `rgba(59, 130, 246, ${alpha})`; // Default blue
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawGrid = (distortion = 0, hoverDistortion = 0) => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Get theme colors
      const primaryColor = getThemeColor('--primary', '#3b82f6');
      const gridColor = hexToRgba(primaryColor, 0.15); // Subtle opacity
      
      const gridSize = 50;
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;

      // Vertical lines with distortion
      for (let x = 0; x <= width; x += gridSize) {
        const baseDistortion = centerX + (x - centerX) * (1 - distortion);
        const hoverEffect = isHovering ? (mouseX - baseDistortion) * 0.01 * hoverDistortion : 0;
        const distortedX = baseDistortion + hoverEffect;
        
        ctx.beginPath();
        ctx.moveTo(distortedX, 0);
        ctx.lineTo(distortedX, height);
        ctx.stroke();
      }

      // Horizontal lines with distortion
      for (let y = 0; y <= height; y += gridSize) {
        const baseDistortion = centerY + (y - centerY) * (1 - distortion);
        const hoverEffect = isHovering ? (mouseY - baseDistortion) * 0.01 * hoverDistortion : 0;
        const distortedY = baseDistortion + hoverEffect;
        
        ctx.beginPath();
        ctx.moveTo(0, distortedY);
        ctx.lineTo(width, distortedY);
        ctx.stroke();
      }
    };

    // Continuous animation loop
    const animate = () => {
      time += 0.015;
      // Continuous wavy distortion - increased movement
      const baseDistortion = Math.sin(time) * 0.15;
      const hoverDistortion = isHovering ? 0.4 : 0;
      
      drawGrid(baseDistortion, hoverDistortion);
      animationId = requestAnimationFrame(animate);
    };

    // Mouse hover interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    // Start animation loop
    animate();

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-90"
      />
    </div>
  );
}