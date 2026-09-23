import { Hero } from "@/components/hero"
import { CareCards } from "@/components/care-cards"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background font-sans">
      <Hero />
      <CareCards />
      <SiteFooter />
    </main>
  )
}
