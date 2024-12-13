import axios from "axios"
import { readFileSync } from "node:fs"
import { Agent } from "node:https"
import { env } from "../env"

interface AuthenticateUseCaseResponse {
  accessToken: string
  jwtToken: string
}

export async function authenticate(): Promise<AuthenticateUseCaseResponse> {
  const credential: string = Buffer.from(
    `${env.CONSUMER_KEY}:${env.CONSUMER_SECRET}`
  ).toString("base64")

  const agent: Agent = new Agent({
    pfx: readFileSync(env.PFX_CERT_PATH),
    passphrase: env.PFX_CERT_PASS,
  })

  interface AuthenticateHttpResponse {
    expires_in: number
    access_token: string
    jwt_token: string
  }

  const { data: authenticateResponse } =
    await axios.post<AuthenticateHttpResponse>(
      env.AUTHENTICATE_ENDPOINT,
      { "grant-type": "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${credential}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Role-Type": "TERCEIROS",
        },
        httpsAgent: agent,
      }
    )

  return {
    accessToken: authenticateResponse.access_token,
    jwtToken: authenticateResponse.jwt_token,
  }
}
