import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useUserSessions } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"

export const UserSessions = ({ userID }: { userID: string }) => {
  const userSessions = useUserSessions(userID)
  const sessions = userSessions.data?.devices?.[""]?.sessions
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Sessions
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>IP</TableCell>
            <TableCell>Last seen</TableCell>
            <TableCell>User agent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions?.map(session =>
            session.connections?.map(connection => (
              <TableRow key={`${connection.ip}-${connection.last_seen}-${connection.user_agent}`}>
                <TableCell>{connection.ip}</TableCell>
                <TableCell>{formatTS(connection.last_seen)}</TableCell>
                <TableCell>{connection.user_agent}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
