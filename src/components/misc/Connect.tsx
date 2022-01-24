import { Alert, Button, Checkbox, FormControlLabel, Paper, TextField, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { ConnectionParams, useConnectionParams, useSetConnectionParams } from "../../context/ConnectionParamsContext"
import { useUpdateUIState } from "../../context/UIStateContext"

const tryConnect = async (server: string, token: string): Promise<ConnectionParams> => {
  const version = await fetch(`${server}/_matrix/federation/v1/version`)
    .then(r => r.json())
    .then((r: { server: { name: string; version: string } }) => {
      if (!r?.server?.name) throw new Error()
      return { serverVersion: `${r.server.name} ${r.server.version}` }
    })
    .catch(() => {
      throw new Error("Can't get version from homeserver")
    })

  const whoami = await fetch(`${server}/_matrix/client/r0/account/whoami`, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then((r: { user_id: string }) => {
      if (!r?.user_id) throw new Error()
      return { userID: r.user_id, serverName: r.user_id.split(":")[1] }
    })
    .catch(() => {
      throw new Error("Token not valid")
    })

  await fetch(`${server}/_synapse/admin/v1/users/${whoami.userID}/admin`, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then((r: { admin: boolean }) => {
      if (!r?.admin) throw new Error()
    })
    .catch(() => {
      throw new Error("User is not an admin")
    })

  const mediarepo = await fetch(`${server}/_matrix/media/version`, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then((r: { Version?: string }) => ({ mediarepoVersion: r.Version }))
    .catch(() => ({ mediarepoVersion: undefined }))

  return { server, token, ...version, ...whoami, ...mediarepo }
}

export const Connect = () => {
  const connectionParams = useConnectionParams()
  const setConnectionParams = useSetConnectionParams()
  const [connecting, setConnecting] = useState(false)
  const [server, setServer] = useState(connectionParams?.server || localStorage.getItem("server") || "")
  const [token, setToken] = useState(connectionParams?.token || localStorage.getItem("token") || "")
  const [remember, setRemember] = useState(localStorage.getItem("server") !== null)
  const [error, setError] = useState<string | null>(null)
  const updateUIState = useUpdateUIState()

  useEffect(() => {
    if (remember) {
      if (connectionParams) {
        localStorage.setItem("server", connectionParams.server)
        localStorage.setItem("token", connectionParams.token)
      }
    } else {
      localStorage.removeItem("server")
      localStorage.removeItem("token")
    }
  }, [remember, connectionParams])

  const connect = () => {
    if (!/https?:\/\/.+/.test(server)) {
      setError("Server URL should begin with http:// or https://")
      return
    }
    setConnecting(true)
    setError(null)
    tryConnect(server, token)
      .then(params => {
        setConnecting(false)
        setConnectionParams({ ...params, server, token })
        updateUIState({ userID: params.userID })
        if (remember) {
          localStorage.setItem("server", server)
          localStorage.setItem("token", token)
        }
      })
      .catch((e: Error) => {
        setConnecting(false)
        setError(e.message)
      })
  }

  const disconnect = () => {
    setConnectionParams(null)
  }

  return (
    <>
      <Paper
        sx={{
          "p": 2,
          "display": "flex",
          "flexDirection": "row",
          "& > :not(style)": { m: 1 },
        }}
      >
        <Tooltip title='Full URL to the homeserver, including scheme (the server address, not the "server name")'>
          <TextField
            label="Homeserver URL"
            placeholder="https://matrix.example.com"
            variant="standard"
            sx={{ width: "30ch" }}
            value={server}
            onChange={e => setServer(e.target.value)}
            disabled={connecting}
          />
        </Tooltip>
        <Tooltip title="In Element this can be found in Settings -> Help & About -> Advanced -> Access Token">
          <TextField
            label="Access token"
            variant="standard"
            type="password"
            sx={{ flexGrow: 1 }}
            value={token}
            onChange={e => setToken(e.target.value)}
            disabled={connecting}
          />
        </Tooltip>
        {connectionParams ? (
          <Button variant="contained" onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button variant="contained" onClick={connect} disabled={server === "" || token === "" || connecting}>
            {connecting ? "Connecting" : "Connect"}
          </Button>
        )}
        <Tooltip title="Save the homeserver url and token into browser localstorage">
          <FormControlLabel label="Remember details" control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />} />
        </Tooltip>
      </Paper>
      {error && (
        <Alert sx={{ m: 2 }} severity="error">
          {error}
        </Alert>
      )}
    </>
  )
}
