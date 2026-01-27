"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Software Engineer"
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 relative">
      {/* Dot pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for new projects</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-heading mb-4 tracking-tight">
          VICTOR UGO
        </h1>

        {/* Title with typewriter effect */}
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8">
          {displayText}
          <span className="animate-pulse">|</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Creative software engineer specializing in building innovative solutions that bridge technology and user experience. I craft clean, efficient code and transform ideas into impactful digital products.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
          >
            View My Work
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-transparent"
          >
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </section>
  )
}
