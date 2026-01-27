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
  { name: "Next.js", icon: "N" },
  { name: "React", icon: "R" },
  { name: "Three.js", icon: "3" },
  { name: "TypeScript", icon: "TS" },
  { name: "PostgreSQL", icon: "PG" },
  { name: "MongoDB", icon: "M" },
  { name: "Docker", icon: "D" },
  { name: "AWS", icon: "AWS" },
  { name: "Azure", icon: "AZ" },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4">
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

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6"
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
          ))}
        </div>

        {/* Tech Logo Marquee */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-marquee gap-12">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 rounded-xl bg-secondary/30 text-muted-foreground/50 font-mono text-sm shrink-0"
              >
                {tech.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
