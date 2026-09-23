import { Leaf, ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-20 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <Leaf className="size-4 text-primary" aria-hidden="true" />
          Beginner-friendly plant care
        </span>

        <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
          The Houseplant Survival Guide
        </h1>

        <p className="mt-4 font-serif text-xl italic text-primary sm:text-2xl">
          Minimal effort. Maximum green.
        </p>

        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A visual cheat sheet for the watering, light, and soil needs of three
          common, hard-to-kill indoor plants. Keep your greenery alive—without
          the guesswork.
        </p>

        <div className="mt-9">
          <a
            href="#care-cards"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Care Cards
            <ArrowDown
              className="size-4 transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Pothos · Snake Plant · ZZ Plant
        </p>
      </div>
    </section>
  )
}
