"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Code2 } from "lucide-react"

const TYPEWRITER_TEXTS = [
  { full: "Passionate about creating impactful solutions", highlight: "impactful" },
  { full: "Driven to build solutions that make a real difference", highlight: "solutions" },
  { full: "Crafting meaningful solutions that matter", highlight: "meaningful" },
]
const TYPE_DELAY_MS = 80
const PAUSE_BETWEEN_TEXTS_MS = 2500

// Longest text for reserved space so layout doesn't shift
const RESERVE_TEXT = TYPEWRITER_TEXTS.reduce(
  (best, t) => (t.full.length > best.length ? t.full : best),
  TYPEWRITER_TEXTS[0].full
)

export function AboutSection() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let charIndex = 0
    let timeoutId: ReturnType<typeof setTimeout>
    const current = TYPEWRITER_TEXTS[textIndex]

    const typeNext = () => {
      if (charIndex <= current.full.length) {
        setDisplayText(current.full.slice(0, charIndex))
        charIndex++
        timeoutId = setTimeout(typeNext, TYPE_DELAY_MS)
      } else {
        timeoutId = setTimeout(() => {
          setTextIndex((i) => (i + 1) % TYPEWRITER_TEXTS.length)
        }, PAUSE_BETWEEN_TEXTS_MS)
      }
    }

    setDisplayText("")
    charIndex = 0
    timeoutId = setTimeout(typeNext, TYPE_DELAY_MS)
    return () => clearTimeout(timeoutId)
  }, [textIndex])

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <div className="relative">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden bg-primary">
              <Image
                src="/images/portrait.jpg"
                alt="VICTOR UGO"
                fill
                className="object-cover"
              />
            </div>
            {/* Tech Alias Card */}
            <div className="group absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-card/90 backdrop-blur-sm border border-border px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center transition-transform duration-300 group-hover:scale-x-[-1]">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-heading">UVECODES</p>
                <p className="text-sm text-muted-foreground">Tech Guru</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Section Badge */}
            <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary">About Me</span>
            </div>

            {/* Typewriter heading: 3 versions cycle; longest text reserves space */}
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6 leading-tight relative">
              <span className="invisible" aria-hidden="true">
                {RESERVE_TEXT}
              </span>
              <span className="absolute inset-0">
                {(() => {
                  const { highlight } = TYPEWRITER_TEXTS[textIndex]
                  return displayText.includes(highlight) ? (
                    <>
                      {displayText.split(highlight)[0]}
                      <span className="text-primary">{highlight}</span>
                      {displayText.split(highlight)[1]}
                    </>
                  ) : (
                    displayText
                  )
                })()}
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {"I'm VICTOR UGO—software engineer and full-stack builder. I ship systems that scale, interfaces that stick, and code that holds up. From API to UI, I turn specs into products that actually ship."}
              </p>
              <p>
                {"I focus on scalable architecture, performance at scale, and UX that feels seamless. The goal: code that's maintainable, efficient, and built to last—functional today, future-proof tomorrow."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
