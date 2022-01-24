import { FC, useState, createContext, useContext } from "react"

export interface ConnectionParams {
  server: string
  token: string
  userID: string
  serverName: string
  serverVersion: string
  mediarepoVersion?: string
}

const ConnectionParamsContext = createContext<ConnectionParams | null>(null)
const SetConnectionParamsContext = createContext<((params: ConnectionParams | null) => void) | null>(null)

export const useConnectionParams = () => useContext(ConnectionParamsContext)
export const useSetConnectionParams = () => {
  const context = useContext(SetConnectionParamsContext)
  if (context === null) throw new Error("useSetConnectionParams used outside Provider")
  return context
}

export const ConnectionParamsProvider: FC = ({ children }) => {
  const [connectionParams, setConnectionParams] = useState<ConnectionParams | null>(null)

  return (
    <ConnectionParamsContext.Provider value={connectionParams}>
      <SetConnectionParamsContext.Provider value={setConnectionParams}>{children}</SetConnectionParamsContext.Provider>
    </ConnectionParamsContext.Provider>
  )
}
