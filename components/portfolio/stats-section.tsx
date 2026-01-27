import { Code2, Rocket, Users, Infinity } from "lucide-react"

const stats = [
  {
    icon: Code2,
    value: "2+",
    label: "Years Experience",
  },
  {
    icon: Rocket,
    value: "15+",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    value: "10+",
    label: "Happy Clients",
  },
  {
    icon: Infinity,
    value: "",
    label: "Lines of Code",
    isInfinity: true,
  },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <stat.icon className="h-6 w-6 text-primary mb-4" />
              {stat.isInfinity ? (
                <div className="text-4xl font-bold text-heading mb-1">
                  <Infinity className="h-10 w-10" />
                </div>
              ) : (
                <p className="text-4xl font-bold text-heading mb-1">{stat.value}</p>
              )}
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
