"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Server, Cloud, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML5 & CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Pixieset", "Wix"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "GraphQL","Firebase"],
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux", "GitHub Actions"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Figma", "VS Code", "Postman", "Jira", "Notion", "Slack"],
  },
]

const techLogos = [
  { 
    name: "Next.js", 
    logoUrl: "https://cdn.simpleicons.org/nextdotjs/000000",
    darkLogoUrl: "https://cdn.simpleicons.org/nextdotjs/ffffff"
  },
  { 
    name: "React", 
    logoUrl: "https://cdn.simpleicons.org/react/61DAFB",
    darkLogoUrl: "https://cdn.simpleicons.org/react/61DAFB"
  },
  { 
    name: "Three.js", 
    logoUrl: "https://cdn.simpleicons.org/threedotjs/000000",
    darkLogoUrl: "https://cdn.simpleicons.org/threedotjs/ffffff"
  },
  { 
    name: "TypeScript", 
    logoUrl: "https://cdn.simpleicons.org/typescript/3178C6",
    darkLogoUrl: "https://cdn.simpleicons.org/typescript/3178C6"
  },
  { 
    name: "PostgreSQL", 
    logoUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
    darkLogoUrl: "https://cdn.simpleicons.org/postgresql/4169E1"
  },
  { 
    name: "MongoDB", 
    logoUrl: "https://cdn.simpleicons.org/mongodb/47A248",
    darkLogoUrl: "https://cdn.simpleicons.org/mongodb/47A248"
  },
  { 
    name: "Docker", 
    logoUrl: "https://cdn.simpleicons.org/docker/2496ED",
    darkLogoUrl: "https://cdn.simpleicons.org/docker/2496ED"
  },
  { 
    name: "AWS", 
    logoUrl: "https://cdn.simpleicons.org/amazonaws/232F3E",
    darkLogoUrl: "https://cdn.simpleicons.org/amazonaws/FF9900"
  },
  { 
    name: "Azure", 
    logoUrl: "https://cdn.simpleicons.org/microsoftazure/0078D4",
    darkLogoUrl: "https://cdn.simpleicons.org/microsoftazure/0078D4"
  },
]

// Zoom on scroll - COMMENTED OUT (section stays at 100%)
// const MIN_SCALE = 0.88
// const MAX_SCALE = 1

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const checkInView = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800
      // Section is "in view" when its top is above ~80% of viewport and bottom still visible
      const inView = rect.top < viewportHeight * 0.8 && rect.bottom > 80
      setIsInView(inView)
    }

    checkInView()
    window.addEventListener("scroll", checkInView, { passive: true })
    window.addEventListener("resize", checkInView)
    return () => {
      window.removeEventListener("scroll", checkInView)
      window.removeEventListener("resize", checkInView)
    }
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Badge */}
        <div className="text-center mb-12">
          <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-primary">My Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Technologies I <span className="text-primary">master</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit refined over years of building production-grade applications at scale.
          </p>
        </div>

        {/* Skill Cards - left two slide in from left, right two from right on scroll into section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 overflow-hidden">
          {skillCategories.map((category, index) => {
            const isLeft = index < 2
            const offsetX = isLeft ? "-120%" : "120%"
            return (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 transition-transform duration-[2000ms] ease-out"
              style={{
                transform: isInView ? "translateX(0)" : `translateX(${offsetX})`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-heading">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="py-2 px-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            )
          })}
        </div>

        {/* Tech Logo Marquee */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-marquee gap-12">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 rounded-xl bg-secondary/30 shrink-0 p-3"
              >
                <img
                  src={tech.logoUrl}
                  alt={tech.name}
                  className="w-full h-full object-contain dark:hidden"
                />
                <img
                  src={tech.darkLogoUrl}
                  alt={tech.name}
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
