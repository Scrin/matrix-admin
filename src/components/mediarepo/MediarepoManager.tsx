import { Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useMediaConfig, useMediarepoServerUsage, useMediarepoUserUsage } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"

export const MediarepoManager = () => {
  const connectionParams = useConnectionParams()
  const mediaConfig = useMediaConfig()

  const maxUpload = mediaConfig.isLoading ? "loading..." : mediaConfig.isSuccess ? formatBytes(mediaConfig.data["m.upload.size"]) : "unknown"

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Mediarepo
      </Typography>
      <Typography>Max upload size: {maxUpload}</Typography>
      <Divider light />
      {connectionParams && !connectionParams.mediarepoVersion ? (
        <Typography>matrix-media-repo not detected on {connectionParams?.server} - no management utilites available</Typography>
      ) : (
        <>
          <ServerUsage />
          <UserUsage />
        </>
      )}
    </Paper>
  )
}

const ServerUsage = () => {
  const connectionParams = useConnectionParams()
  const [server, setServer] = useState(connectionParams?.userID.split(":")[1] || "")
  const serverUsage = useMediarepoServerUsage(server)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Storage use by homeserver
      </Typography>
      <TextField label="Server name" variant="standard" value={server} onChange={e => setServer(e.target.value)} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Type</TableCell>
            <TableCell sx={{ width: "25%" }}>Size</TableCell>
            <TableCell sx={{ width: "25%" }}>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Media</TableCell>
            <TableCell sx={{ width: "25%" }}>{formatBytes(serverUsage.data?.raw_bytes.media)}</TableCell>
            <TableCell sx={{ width: "25%" }}>{serverUsage.data?.raw_counts.media}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Thumbnails</TableCell>
            <TableCell sx={{ width: "25%" }}>{formatBytes(serverUsage.data?.raw_bytes.thumbnails)}</TableCell>
            <TableCell sx={{ width: "25%" }}>{serverUsage.data?.raw_counts.thumbnails}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Total</TableCell>
            <TableCell sx={{ width: "25%" }}>{formatBytes(serverUsage.data?.raw_bytes.total)}</TableCell>
            <TableCell sx={{ width: "25%" }}>{serverUsage.data?.raw_counts.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

const UserUsage = () => {
  const connectionParams = useConnectionParams()
  const [user, setUser] = useState(connectionParams?.userID || "")
  const userUsage = useMediarepoUserUsage(user)

  const data = userUsage.data?.[user]

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Storage use by user
      </Typography>
      <TextField label="User ID" variant="standard" value={user} onChange={e => setUser(e.target.value)} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Type</TableCell>
            <TableCell sx={{ width: "25%" }}>Size</TableCell>
            <TableCell sx={{ width: "25%" }}>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Media</TableCell>
            <TableCell sx={{ width: "25%" }}>{formatBytes(data?.raw_bytes.media)}</TableCell>
            <TableCell sx={{ width: "25%" }}>{data?.raw_counts.media}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>Total</TableCell>
            <TableCell sx={{ width: "25%" }}>{formatBytes(data?.raw_bytes.total)}</TableCell>
            <TableCell sx={{ width: "25%" }}>{data?.raw_counts.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
