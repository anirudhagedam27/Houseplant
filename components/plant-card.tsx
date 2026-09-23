import Image from "next/image"
import { Droplets, Sun, Sprout } from "lucide-react"
import type { Plant } from "@/lib/plants"

type CareRowProps = {
  icon: React.ReactNode
  label: string
  value: string
  note: string
}

function CareRow({ icon, label, value, note }: CareRowProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-medium text-foreground">{value}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      </div>
    </div>
  )
}

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-secondary">
        <Image
          src={plant.image || "/placeholder.svg"}
          alt={`${plant.name} houseplant in a pot`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {plant.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          {plant.name}
        </h3>
        <p className="text-sm italic text-muted-foreground">
          {plant.latinName}
        </p>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {plant.tagline}
        </p>

        <div className="mt-6 space-y-5 border-t border-border pt-6">
          <CareRow
            icon={<Droplets className="size-4" aria-hidden="true" />}
            label="Water"
            value={plant.water}
            note={`${plant.waterFrequency} — adjust to your home.`}
          />
          <CareRow
            icon={<Sun className="size-4" aria-hidden="true" />}
            label="Light"
            value={plant.light}
            note={plant.lightNote}
          />
          <CareRow
            icon={<Sprout className="size-4" aria-hidden="true" />}
            label="Soil"
            value={plant.soil}
            note={plant.soilNote}
          />
        </div>
      </div>
    </article>
  )
}
