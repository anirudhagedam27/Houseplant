"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { plants } from "@/lib/plants"

export function DownloadCheatSheet() {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const { SimplePdf } = await import("@/lib/pdf")
      const doc = new SimplePdf()

      const margin = 48
      const contentWidth = doc.pageWidth - margin * 2
      const heading: [number, number, number] = [46, 64, 45]
      const muted: [number, number, number] = [120, 130, 118]
      const body: [number, number, number] = [70, 80, 68]
      let y = margin + 8

      doc.text("Houseplant Survival Guide", margin, y, {
        size: 22,
        style: "bold",
        color: heading,
      })

      y += 24
      doc.text(
        "A quick-reference cheat sheet for three hard-to-kill indoor plants.",
        margin,
        y,
        { size: 11, color: [90, 100, 88] },
      )

      y += 34

      plants.forEach((plant) => {
        doc.text(plant.name, margin, y, { size: 15, style: "bold", color: heading })
        doc.text(
          `${plant.latinName}  -  ${plant.difficulty}`,
          margin + plant.name.length * 15 * 0.5 + 10,
          y,
          { size: 10, style: "italic", color: muted },
        )

        y += 18

        const rows: [string, string][] = [
          ["Water", `${plant.water} (${plant.waterFrequency})`],
          ["Light", `${plant.light} - ${plant.lightNote}`],
          ["Soil", `${plant.soil} - ${plant.soilNote}`],
        ]

        rows.forEach(([label, value]) => {
          doc.text(`${label}:`, margin, y, { size: 10, style: "bold", color: body })
          const labelWidth = 46
          const lines = doc.wrap(value, 10, contentWidth - labelWidth)
          lines.forEach((line, i) => {
            doc.text(line, margin + labelWidth, y + i * 14, { size: 10, color: body })
          })
          y += lines.length * 14 + 2
        })

        y += 18
      })

      doc.text("Made by Aniruddha Gedam", margin, doc.pageHeight - 32, {
        size: 9,
        color: [140, 150, 138],
      })

      const url = URL.createObjectURL(doc.toBlob())
      const link = document.createElement("a")
      link.href = url
      link.download = "houseplant-cheat-sheet.pdf"
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-12 flex justify-center">
      <Button
        size="lg"
        onClick={handleDownload}
        disabled={loading}
        className="gap-2"
      >
        <Download className="size-5" aria-hidden="true" />
        {loading ? "Preparing PDF…" : "Download Cheat Sheet (PDF)"}
      </Button>
    </div>
  )
}
