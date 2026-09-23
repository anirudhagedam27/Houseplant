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
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({ unit: "pt", format: "a4" })

      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 48
      const contentWidth = pageWidth - margin * 2
      let y = margin

      doc.setFont("helvetica", "bold")
      doc.setFontSize(22)
      doc.setTextColor(46, 64, 45)
      doc.text("Houseplant Survival Guide", margin, y)

      y += 24
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.setTextColor(90, 100, 88)
      doc.text(
        "A quick-reference cheat sheet for three hard-to-kill indoor plants.",
        margin,
        y,
      )

      y += 28

      plants.forEach((plant) => {
        doc.setDrawColor(210, 220, 205)
        doc.setLineWidth(1)
        doc.line(margin, y, pageWidth - margin, y)
        y += 22

        doc.setFont("helvetica", "bold")
        doc.setFontSize(15)
        doc.setTextColor(46, 64, 45)
        doc.text(`${plant.name}`, margin, y)

        doc.setFont("helvetica", "italic")
        doc.setFontSize(10)
        doc.setTextColor(120, 130, 118)
        const nameWidth = doc.getTextWidth(plant.name)
        doc.text(`  ${plant.latinName}  ·  ${plant.difficulty}`, margin + nameWidth, y)

        y += 18
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(70, 80, 68)

        const rows: [string, string][] = [
          ["Water", `${plant.water} (${plant.waterFrequency})`],
          ["Light", `${plant.light} — ${plant.lightNote}`],
          ["Soil", `${plant.soil} — ${plant.soilNote}`],
        ]

        rows.forEach(([label, value]) => {
          doc.setFont("helvetica", "bold")
          doc.text(`${label}:`, margin, y)
          doc.setFont("helvetica", "normal")
          const labelWidth = 46
          const lines = doc.splitTextToSize(value, contentWidth - labelWidth)
          doc.text(lines, margin + labelWidth, y)
          y += lines.length * 14 + 2
        })

        y += 12
      })

      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.setTextColor(140, 150, 138)
      doc.text(
        "Made by Aniruddha Gedam",
        margin,
        doc.internal.pageSize.getHeight() - 32,
      )

      doc.save("houseplant-cheat-sheet.pdf")
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
