import { Typography, TextField, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useMediarepoServerUsage } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"

export const MediaHomeserverUsage = () => {
  const connectionParams = useConnectionParams()
  const [server, setServer] = useState(connectionParams?.userID.split(":")[1] || "")
  const serverUsage = useMediarepoServerUsage(server)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Storage use by homeserver
      </Typography>
      {connectionParams && !connectionParams.mediarepoVersion ? (
        <Typography>matrix-media-repo not detected on {connectionParams?.server} - no usage data available</Typography>
      ) : (
        <>
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
      )}
    </>
  )
}
