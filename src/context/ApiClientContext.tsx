import { FC, createContext, useContext } from "react"
import { useConnectionParams } from "./ConnectionParamsContext"

export interface ApiClient {
  configured: boolean
  get: <T>(path: string) => Promise<T>
}

const dummyClient: ApiClient = {
  configured: false,
  get: () => {
    throw new Error("Connection params missing")
  },
}

const ApiClientContext = createContext<ApiClient>(dummyClient)

export const useApiClient = () => useContext(ApiClientContext)

export const ApiClientProvider: FC = ({ children }) => {
  const connectionParams = useConnectionParams()

  const apiClient: ApiClient = !connectionParams
    ? dummyClient
    : {
        configured: true,
        get: <T,>(path: string) =>
          fetch(`${connectionParams.server}${path}`, { headers: { Authorization: `Bearer ${connectionParams.token}` } }).then<T>(r => r.json()),
      }

  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>
}
