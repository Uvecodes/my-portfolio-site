import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { StatsSection } from "@/components/portfolio/stats-section"
import { SkillsSection } from "@/components/portfolio/skills-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <SkillsSection />
    </main>
  )
}
