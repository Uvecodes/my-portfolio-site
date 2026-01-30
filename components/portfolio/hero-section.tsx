"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GridAnimation from "./GridAnimation"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [animatingLetterIndex, setAnimatingLetterIndex] = useState<number | null>(null)
  const fullText = "Software-Engineer"
  
  // Scrambling utilities
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)]
  
  useEffect(() => {
    let typewriterInterval: NodeJS.Timeout | null = null
    let unscrambleInterval: NodeJS.Timeout | null = null
    let typewriterTimeout: NodeJS.Timeout | null = null
    let singleLetterInterval: NodeJS.Timeout | null = null
    let activeSingleLetterScramble: NodeJS.Timeout | null = null
    
    // Phase 1: Typewriter effect
    let index = 0
    typewriterInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typewriterInterval!)
        typewriterInterval = null
        
        // Flow: after typewriter → single-letter scramble (word scramble commented out)
        setDisplayText(fullText)
        
        // Word scramble logic - COMMENTED OUT
        // typewriterTimeout = setTimeout(() => {
        //   const revealedIndices = new Set<number>()
        //   let scrambleIteration = 0
        //   const maxScrambleIterations = 15
        //   unscrambleInterval = setInterval(() => {
        //     if (scrambleIteration < maxScrambleIterations) {
        //       const scrambled = fullText.split('').map((char, i) => {
        //         if (revealedIndices.has(i)) return char
        //         return getRandomChar()
        //       }).join('')
        //       setDisplayText(scrambled)
        //       scrambleIteration++
        //     } else {
        //       if (revealedIndices.size < fullText.length) {
        //         revealedIndices.add(revealedIndices.size)
        //         const revealed = fullText.split('').map((char, i) => {
        //           if (revealedIndices.has(i)) return char
        //           return getRandomChar()
        //         }).join('')
        //         setDisplayText(revealed)
        //       } else {
        //         setDisplayText(fullText)
        //         clearInterval(unscrambleInterval!)
        //         unscrambleInterval = null
        //         // ... single-letter start was here
        //       }
        //     }
        //   }, 50)
        // }, 5000)
        
        // Single-letter scramble: start after 3000ms, then repeat every 3000ms
        const startSingleLetterScrambling = () => {
          if (activeSingleLetterScramble) {
            clearTimeout(activeSingleLetterScramble)
            activeSingleLetterScramble = null
          }
          const randomIndex = Math.floor(Math.random() * fullText.length)
          setAnimatingLetterIndex(randomIndex)
          const letterRollDuration = 550
          const timeoutId = setTimeout(() => {
            setAnimatingLetterIndex(null)
            activeSingleLetterScramble = null
          }, letterRollDuration)
          activeSingleLetterScramble = timeoutId as NodeJS.Timeout
        }
        
        typewriterTimeout = setTimeout(() => {
          startSingleLetterScrambling()
          singleLetterInterval = setInterval(() => {
            startSingleLetterScrambling()
          }, 3000)
        }, 3000)
      }
    }, 100)
    
    return () => {
      if (typewriterInterval) clearInterval(typewriterInterval)
      if (unscrambleInterval) clearInterval(unscrambleInterval)
      if (singleLetterInterval) clearInterval(singleLetterInterval)
      if (activeSingleLetterScramble) clearTimeout(activeSingleLetterScramble)
      if (typewriterTimeout) clearTimeout(typewriterTimeout)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      {/* Background video - behind grid and content */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/grok-video-6a06e7e5-427a-444e-8632-9c7cb3fc82b2.mp4"
          loop
          muted
          playsInline
          autoPlay
          aria-hidden
        />
      </div>
      {/* Grid Animation Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <GridAnimation />
      </div>

      {/* Dot pattern background with color grading - COMMENTED OUT (replaced by GridAnimation) */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0)`,
            backgroundSize: '10px 10px',
            backgroundPosition: '0px 0px',
            transform: 'rotate(45deg) scale(1.5)',
            transformOrigin: 'center'
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 0.8px, transparent 0)`,
            backgroundSize: '22px 22px',
            backgroundPosition: '10px 10px',
            transform: 'rotate(45deg) scale(1.5)',
            transformOrigin: 'center'
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.1) 0.6px, transparent 0)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '15px 15px',
            transform: 'rotate(45deg) scale(1.5)',
            transformOrigin: 'center'
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.12) 1px, transparent 0)`,
            backgroundSize: '10px 10px',
            backgroundPosition: '-80px 80px',
            transform: 'rotate(45deg) scale(1.5)',
            transformOrigin: 'center'
          }}
        />
      </div> */}

      <style>{`
        @keyframes letter-roll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          45% {
            transform: translateY(100%);
            opacity: 0;
          }
          55% {
            transform: translateY(-100%);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .letter-cell {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          height: 1em;
          line-height: 1;
        }
        .letter-roll {
          display: inline-block;
          animation: letter-roll 550ms ease-in-out forwards;
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 2px;
          height: 100%;
          background: linear-gradient(10deg, transparent, rgba(255, 255, 255, 0.75), transparent);
          animation: shimmer 5s infinite;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          filter: blur(8px);
          transform: skewX(30deg);
        }
      `}</style>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 mb-8 shimmer-effect relative">
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
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 font-mono">
          {displayText.split("").map((char, i) => {
            const isAnimating = animatingLetterIndex === i
            return (
              <span
                key={`${i}-${char}-${isAnimating}`}
                className="letter-cell"
              >
                <span className={isAnimating ? "letter-roll" : ""}>{char}</span>
              </span>
            )
          })}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
         Results-driven software engineer with a systems-oriented approach to product development. Experienced in implementing end-to-end solutions from responsive frontend interfaces to robust backend services while maintaining attention to code quality and security hygiene.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild
            size="lg" 
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
          >
            <Link href="/works">View My Work</Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="rounded-full border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg bg-transparent"
          >
            <Link href="/contact">Get In Touch</Link>
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
