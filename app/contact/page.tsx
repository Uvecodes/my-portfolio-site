import Link from "next/link"
import { Navbar } from "@/components/portfolio/navbar"
import { ArrowLeft } from "lucide-react"
import { ContactCards } from "@/components/portfolio/contact-cards"

export const metadata = {
  title: "Contact | VICTOR UGO",
  description: "Get in touch with VICTOR UGO—links to socials and email.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Reach out via your preferred platform—socials and email below. Open to collaborations, questions, or just a friendly hello!
            </p>
          </div>

          <ContactCards />
        </div>
      </section>
    </main>
  )
}
