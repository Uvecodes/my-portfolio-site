import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/works"

export function WorksSection() {
  return (
    <section id="works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Badge */}
        <div className="text-center mb-12">
          <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-primary">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            My <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selected projects—from concept to ship. Scalable systems, clean interfaces, and code that holds up.
          </p>
        </div>

        {/* Project Cards - show first 3 on homepage; rest on /works */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
              <div className="px-5 pb-5 flex items-center gap-3 -mt-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  View project
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {project["git-repo"] && (
                  <a
                    href={project["git-repo"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-110"
                    aria-label="View GitHub repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <Link href="/works">View more</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
