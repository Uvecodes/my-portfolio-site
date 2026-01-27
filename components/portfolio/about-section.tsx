import Image from "next/image"
import { Code2 } from "lucide-react"

export function AboutSection() {
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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-card/90 backdrop-blur-sm border border-border px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-heading">UVECODES</p>
                <p className="text-sm text-muted-foreground">Tech Alias</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Section Badge */}
            <div className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary">About Me</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6 leading-tight">
              Passionate about creating{" "}
              <span className="text-primary">impactful</span> solutions
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {"I'm VICTOR UGO, a software engineer passionate about creating innovative solutions that make a real impact. With expertise spanning full-stack development, I bring ideas to life through elegant code and thoughtful design."}
              </p>
              <p>
                {"My work focuses on building scalable applications, optimizing performance, and delivering seamless user experiences. I believe in writing code that's not just functional, but maintainable, efficient, and future-proof."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
