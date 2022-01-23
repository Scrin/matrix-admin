import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useMediarepoUserUsage } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"

export const MediaUserUsage = ({ userID }: { userID: string }) => {
  const connectionParams = useConnectionParams()
  const userUsage = useMediarepoUserUsage(userID)
  const userUsageEntry = userUsage.data?.[userID]
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Storage use by user
      </Typography>
      {connectionParams && !connectionParams.mediarepoVersion ? (
        <Typography>matrix-media-repo not detected on {connectionParams?.server} - no usage data available</Typography>
      ) : (
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
              <TableCell sx={{ width: "25%" }}>{formatBytes(userUsageEntry?.raw_bytes.media)}</TableCell>
              <TableCell sx={{ width: "25%" }}>{userUsageEntry?.raw_counts.media}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>Total</TableCell>
              <TableCell sx={{ width: "25%" }}>{formatBytes(userUsageEntry?.raw_bytes.total)}</TableCell>
              <TableCell sx={{ width: "25%" }}>{userUsageEntry?.raw_counts.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  )
}
