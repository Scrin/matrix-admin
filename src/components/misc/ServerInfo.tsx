import { Typography } from "@mui/material"
import { useConnectionParams } from "../../context/ConnectionParamsContext"

export const ServerInfo = () => {
  const connectionParams = useConnectionParams()

  if (!connectionParams) return null
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        {connectionParams.server}
      </Typography>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        {connectionParams.serverVersion}
      </Typography>
      {connectionParams.mediarepoVersion && (
        <Typography component="h1" variant="h6" sx={{ p: 2 }}>
          Mediarepo {connectionParams.mediarepoVersion}
        </Typography>
      )}
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        User {connectionParams.userID}
      </Typography>
    </>
  )
}
