import { openai } from "../lib/openai"

export interface ReportAnalysisResponse {
  hasPending: boolean // Indica se há pendências (exceto valores com exigibilidade suspensa)
  hasPendingTax: boolean // Indica se há impostos vencidos
  hasOmission: boolean // Indica se há omissões de declarações
  hasMaed: boolean // Indica se há multas por atrasos (ex.: MAED)
}

export async function analyzeReportTextWithOpenai(
  text: string
): Promise<ReportAnalysisResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
                Você é um assistente que analisa o relatório de situação fiscal disponibilizado por meio do eCAC (Receita Federal do Brasil).
                Extraia as informações relevantes do texto fornecido e retorne apenas em formato string JSON.
                Os campos esperados são:
                - "companyName": string (esse campo deverá ser a razão social da empresa que você está analisando).
                - "companyDocument": string (esse campo deverá ser o CNPJ completo da empresa que você está analisando).
                - "hasPending": boolean (esse campo deverá retornar true quando a empresa tiver qualquer tipo de pendência informada no relatório, com exceção dos valores com exigibilidade suspensa (ou seja, valores a vencer)).
                - "hasOmission": boolean (esse campo deverá retornar true quando você perceber que há alguma omissão de qualquer declaração).
                - "hasPendingTax": boolean (esse campo deverá retornar true quando você verificar que há impostos em aberto (vencidos)).
                - "hasMaed": boolean (você deverá procurar pelo termo MAED e se encontrar, retornar true, caso contrário, false)
            `,
      },
      {
        role: "user",
        content: `Analise o seguinte relatório:\n\n${text}`,
      },
    ],
  })

  const result = response.choices[0].message?.content

  return JSON.parse(result || "{}")
}
