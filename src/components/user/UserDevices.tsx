import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useUserDevices } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"

export const UserDevices = ({ userID }: { userID: string }) => {
  const userDevices = useUserDevices(userID)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Devices
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Display name</TableCell>
            <TableCell>Last seen</TableCell>
            <TableCell>Last seen IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDevices.data?.devices?.map(device => (
            <TableRow key={device.device_id}>
              <TableCell>{device.device_id}</TableCell>
              <TableCell>{device.display_name}</TableCell>
              <TableCell>{formatTS(device.last_seen_ts)}</TableCell>
              <TableCell>{device.last_seen_ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
