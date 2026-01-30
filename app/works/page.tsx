import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/portfolio/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { projects } from "@/lib/works"

export const metadata = {
  title: "All My Works | VICTOR UGO",
  description: "Full portfolio of projects by VICTOR UGO—software engineer and full-stack builder.",
}

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              All My <span className="text-primary">Works</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Full portfolio—from concept to ship. Scalable systems, clean interfaces, and code that holds up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50"
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
                  <h2 className="font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
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
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    View project
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
