import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
          <Leaf className="size-5 text-primary" aria-hidden="true" />
          Houseplant Survival Guide
        </span>
        <p className="text-sm text-muted-foreground">
          Made by Anurudha Gedam
        </p>
      </div>
    </footer>
  )
}
