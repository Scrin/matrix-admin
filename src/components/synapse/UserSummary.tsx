import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useUserList } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"

export const UserSummary = () => {
  const roomList = useUserList("admin", 100, true)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Admin users {roomList.isSuccess && `(${roomList.data.total} total users)`}
      </Typography>
      {roomList.isLoading && <Typography>Loading rooms</Typography>}
      {roomList.isError && <Typography>Failed to load rooms</Typography>}
      {roomList.isSuccess && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Display name</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.data.users
              .filter(u => u.admin === 1)
              .map(user => (
                <TableRow key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.displayname}</TableCell>
                  <TableCell>{formatTS(user.creation_ts)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
