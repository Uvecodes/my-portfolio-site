"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Sun, Moon, Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export function Navbar() {
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const isThemeDark = savedTheme === 'dark'
      setIsDark(isThemeDark)
      if (isThemeDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Apply theme to document and save to localStorage
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  if (!mounted) return null

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/Resume.pdf'
    link.download = 'Victor_Ugo_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? "top-2" : "top-4"}`} ref={menuRef}>
      <div className="relative">
        <div className="flex items-center gap-1 rounded-full border border-border/50 bg-card/80 backdrop-blur-md px-2 py-2">
          {/* Avatar */}
          <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src="/images/avatar.jpg"
              alt="VICTOR UGO"
              width={40}
              height={40}
              className="object-cover"
            />
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground ml-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <div className="h-6 w-px bg-border mx-2" />

            {/* Navigation Icons */}
            <Link href="/" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="https://github.com/Uvecodes" target="_blank" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <GitHubIcon />
            </Link>
            <Link href="https://www.linkedin.com/in/victor-ugo-011725288" target="_blank" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <LinkedInIcon />
            </Link>
            <Link href="https://x.com/uvecodes" target="_blank" className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <XIcon />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="h-6 w-px bg-border mx-2" />

            {/* Resume Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleResumeDownload}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-auto gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Resume
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-border/50 bg-card/95 backdrop-blur-md shadow-lg py-4 px-2">
            <div className="flex flex-col gap-1">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link 
                href="https://github.com/Uvecodes" 
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/in/victor-ugo-011725288" 
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </Link>
              <Link 
                href="https://x.com/uvecodes" 
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <XIcon />
                <span>X (Twitter)</span>
              </Link>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <Button 
                onClick={handleResumeDownload}
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 gap-2 justify-start mt-1"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
