import { writeFile } from "node:fs/promises"

interface SaveBase64ToPdfRequest {
  base64String: string
  outputPathFile: string
}

export async function saveBase64ToPdf({
  base64String,
  outputPathFile,
}: SaveBase64ToPdfRequest): Promise<void> {
  const base64 = base64String.replace(/^data:application\/pdf;base64,/, "")
  const pdfBuffer = Buffer.from(base64, "base64")

  await writeFile(outputPathFile, pdfBuffer)
}
