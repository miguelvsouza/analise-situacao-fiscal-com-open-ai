import axios from "axios"
import { env } from "../env"

interface RequestTaxStatusReportRequest {
  companyDocument: string
  accessToken: string
  jwtToken: string
}

interface RequestTaxStatusReportResponse {
  protocol: string
  waitingTime: number
}

export async function requestTaxStatusReport({
  companyDocument,
  accessToken,
  jwtToken,
}: RequestTaxStatusReportRequest): Promise<RequestTaxStatusReportResponse> {
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
      idServico: "SOLICITARPROTOCOLO91",
      versaoSistema: "2.0",
      dados: "",
    },
  }

  interface RequestTaxStatusHttpResponse {
    status: number
    mensagens: string[]
    dados: string
  }

  const { data: requestTaxStatusResponse } =
    await axios.post<RequestTaxStatusHttpResponse>(env.APOIAR_ENDPOINT, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        jwt_token: jwtToken,
      },
    })

  interface DadosTaxStatusProps {
    protocoloRelatorio: string
    tempoEspera: number
  }

  const { protocoloRelatorio, tempoEspera }: DadosTaxStatusProps = JSON.parse(
    requestTaxStatusResponse.dados
  )

  return {
    protocol: protocoloRelatorio,
    waitingTime: tempoEspera,
  }
}
