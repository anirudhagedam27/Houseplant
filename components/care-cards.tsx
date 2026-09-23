import { plants } from "@/lib/plants"
import { PlantCard } from "./plant-card"
import { DownloadCheatSheet } from "./download-cheat-sheet"

export function CareCards() {
  return (
    <section
      id="care-cards"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Care Cards
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Everything a new plant parent needs at a glance. Start with these
          three—they&apos;re famously tough to kill.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <PlantCard key={plant.slug} plant={plant} />
        ))}
      </div>

      <DownloadCheatSheet />
    </section>
  )
}
