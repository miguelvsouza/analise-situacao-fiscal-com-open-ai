import pdf from "pdf-parse"

export async function extractTextFromBase64(
  base64String: string
): Promise<string> {
  const base64 = base64String.replace(/^data:application\/pdf;base64,/, "")
  const pdfBuffer = Buffer.from(base64, "base64")

  const { text } = await pdf(pdfBuffer)

  return text
}
