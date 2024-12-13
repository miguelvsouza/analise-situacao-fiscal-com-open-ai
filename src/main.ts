import {
  analyzeReportTextWithOpenai,
  ReportAnalysisResponse,
} from "./use-cases/analyze-report-text-with-openai"
import { authenticate } from "./use-cases/authenticate"
import { saveBase64ToPdf } from "./use-cases/base64-to-pdf"
import { extractTextFromBase64 } from "./use-cases/extract-text-from-base-64"
import { getTaxStatusReport } from "./use-cases/get-tax-status-report"
import { requestTaxStatusReport } from "./use-cases/request-tax-status-report"

interface ExecuteResponse {
  analysisResult: ReportAnalysisResponse
}

async function execute(companyDocument: string): Promise<ExecuteResponse> {
  // authenticate with pfx in integra contador api
  const { accessToken, jwtToken } = await authenticate()

  // get report protocol and the waiting time to get him
  const { protocol, waitingTime } = await requestTaxStatusReport({
    companyDocument,
    accessToken,
    jwtToken,
  })

  // delay with waiting time to get the report
  await new Promise((resolve) => setTimeout(resolve, waitingTime))

  // get the report pdf in base64
  const { pdfInBase64 } = await getTaxStatusReport({
    companyDocument,
    protocol,
    accessToken,
    jwtToken,
  })

  // get text from base64 report
  const reportText = await extractTextFromBase64(pdfInBase64)

  // save base64 in a new pdf file
  await saveBase64ToPdf({
    base64String: pdfInBase64,
    outputPathFile: `./reports/${companyDocument}.pdf`,
  })

  // send the report text to analyze with gpt
  const analysisResult = await analyzeReportTextWithOpenai(reportText)

  return { analysisResult }
}

execute("cnpjHere").then((result) => {
  console.log(result.analysisResult)
})
