// Minimal, dependency-free PDF generator for simple text documents.
// Produces a single-page A4 PDF using the built-in Helvetica fonts, so it needs
// no external libraries (and therefore no blocked build scripts).

type FontStyle = "normal" | "bold" | "italic"

type TextOp = {
  x: number
  y: number
  size: number
  style: FontStyle
  color: [number, number, number]
  text: string
}

const FONTS: Record<FontStyle, string> = {
  normal: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
}

// Escape characters that are special inside PDF string literals.
function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
}

export class SimplePdf {
  readonly pageWidth = 595.28 // A4 width in points
  readonly pageHeight = 841.89 // A4 height in points
  private ops: TextOp[] = []

  text(
    text: string,
    x: number,
    y: number,
    opts: { size?: number; style?: FontStyle; color?: [number, number, number] } = {},
  ) {
    // PDF's origin is bottom-left; callers use a top-left origin.
    this.ops.push({
      x,
      y: this.pageHeight - y,
      size: opts.size ?? 11,
      style: opts.style ?? "normal",
      color: opts.color ?? [0, 0, 0],
      text,
    })
  }

  // Approximate Helvetica text width (points) for wrapping.
  private textWidth(text: string, size: number): number {
    return text.length * size * 0.5
  }

  wrap(text: string, size: number, maxWidth: number): string[] {
    const words = text.split(/\s+/)
    const lines: string[] = []
    let current = ""
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word
      if (this.textWidth(candidate, size) > maxWidth && current) {
        lines.push(current)
        current = word
      } else {
        current = candidate
      }
    }
    if (current) lines.push(current)
    return lines
  }

  private buildContentStream(): string {
    let stream = ""
    for (const op of this.ops) {
      const [r, g, b] = op.color
      stream += "BT\n"
      stream += `/${op.style} ${op.size} Tf\n`
      stream += `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} rg\n`
      stream += `1 0 0 1 ${op.x.toFixed(2)} ${op.y.toFixed(2)} Tm\n`
      stream += `(${escapePdfText(op.text)}) Tj\n`
      stream += "ET\n"
    }
    return stream
  }

  toBlob(): Blob {
    const content = this.buildContentStream()

    const objects: string[] = []
    objects.push("<< /Type /Catalog /Pages 2 0 R >>")
    objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageWidth} ${this.pageHeight}] ` +
        "/Resources << /Font << /normal 5 0 R /bold 6 0 R /italic 7 0 R >> >> " +
        "/Contents 4 0 R >>",
    )
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
    objects.push(`<< /Type /Font /Subtype /Type1 /BaseFont /${FONTS.normal} >>`)
    objects.push(`<< /Type /Font /Subtype /Type1 /BaseFont /${FONTS.bold} >>`)
    objects.push(`<< /Type /Font /Subtype /Type1 /BaseFont /${FONTS.italic} >>`)

    let pdf = "%PDF-1.4\n"
    const offsets: number[] = []
    objects.forEach((obj, i) => {
      offsets.push(pdf.length)
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
    })

    const xrefOffset = pdf.length
    pdf += `xref\n0 ${objects.length + 1}\n`
    pdf += "0000000000 65535 f \n"
    for (const offset of offsets) {
      pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`
    pdf += `startxref\n${xrefOffset}\n%%EOF`

    return new Blob([pdf], { type: "application/pdf" })
  }
}
