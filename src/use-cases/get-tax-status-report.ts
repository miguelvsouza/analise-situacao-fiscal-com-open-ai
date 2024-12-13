import axios from "axios"
import { env } from "../env"

interface GetTaxStatusReportGet {
  protocol: string
  companyDocument: string
  accessToken: string
  jwtToken: string
}

interface GetTaxStatusReportResponse {
  pdfInBase64: string
}

export async function getTaxStatusReport({
  protocol,
  companyDocument,
  accessToken,
  jwtToken,
}: GetTaxStatusReportGet): Promise<GetTaxStatusReportResponse> {
  const body = {
    contratante: {
      numero: env.SERPRO_CNPJ,
      tipo: 2,
    },
    autorPedidoDados: {
      numero: env.SERPRO_CNPJ,
      tipo: 2,
    },
    contribuinte: {
      numero: companyDocument,
      tipo: 2,
    },
    pedidoDados: {
      idSistema: "SITFIS",
      idServico: "RELATORIOSITFIS92",
      versaoSistema: "2.0",
      dados: JSON.stringify({ protocoloRelatorio: protocol }),
    },
  }

  interface GetTaxStatusHttpResponse {
    status: number
    mensagens: string[]
    dados: string
  }

  const { data: getTaxStatusResponse } =
    await axios.post<GetTaxStatusHttpResponse>(env.EMITIR_ENDPOINT, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        jwt_token: jwtToken,
      },
    })

  interface DadosTaxStatusProps {
    pdf: string
    tempoEspera: number
  }

  const { pdf }: DadosTaxStatusProps = JSON.parse(getTaxStatusResponse.dados)

  return {
    pdfInBase64: pdf,
  }
}
