import { FC, createContext, useContext, ReactElement } from "react"
import { useConnectionParams } from "./ConnectionParamsContext"

export interface ApiClient {
  configured: boolean
  get: <T>(path: string) => Promise<T>
  post: <T>(path: string, body?: BodyType) => Promise<T>
  put: <T>(path: string, body?: BodyType) => Promise<T>
  patch: <T>(path: string, body?: BodyType) => Promise<T>
  delete: <T>(path: string, body?: BodyType) => Promise<T>
}

type BodyType = string | Record<string, unknown> | undefined

const dummyFn = () => {
  throw new Error("Connection params missing")
}

const dummyClient: ApiClient = {
  configured: false,
  get: dummyFn,
  post: dummyFn,
  put: dummyFn,
  patch: dummyFn,
  delete: dummyFn,
}

const ApiClientContext = createContext<ApiClient>(dummyClient)

export const useApiClient = () => useContext(ApiClientContext)

export const ApiClientProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const connectionParams = useConnectionParams()

  const headers = { Authorization: `Bearer ${connectionParams?.token || ""}` }

  const apiClient: ApiClient = !connectionParams
    ? dummyClient
    : {
        configured: true,
        get: <T,>(path: string) => fetch(`${connectionParams.server}${path}`, { headers }).then<T>(r => r.json()),
        post: <T,>(path: string, body: BodyType) =>
          fetch(`${connectionParams.server}${path}`, {
            method: "POST",
            body: mapBody(body),
            headers,
          }).then<T>(r => r.json()),
        put: <T,>(path: string, body: BodyType) =>
          fetch(`${connectionParams.server}${path}`, {
            method: "PUT",
            body: mapBody(body),
            headers,
          }).then<T>(r => r.json()),
        patch: <T,>(path: string, body: BodyType) =>
          fetch(`${connectionParams.server}${path}`, {
            method: "PATCH",
            body: mapBody(body),
            headers,
          }).then<T>(r => r.json()),
        delete: <T,>(path: string, body: BodyType) =>
          fetch(`${connectionParams.server}${path}`, {
            method: "DELETE",
            body: mapBody(body),
            headers,
          }).then<T>(r => r.json()),
      }

  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>
}

const mapBody = (body: BodyType) => {
  if (body === undefined) {
    return undefined
  } else if (typeof body === "string") {
    return body
  } else {
    return JSON.stringify(body)
  }
}
