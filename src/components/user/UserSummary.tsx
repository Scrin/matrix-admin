import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useUserList } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"

export const UserSummary = () => {
  const userList = useUserList("admin", true)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Admin users {userList.isSuccess && `(${userList.data.pages[0].total} total users)`}
      </Typography>
      {userList.isLoading && <Typography>Loading admin users</Typography>}
      {userList.isError && <Typography>Failed to load admin users</Typography>}
      {userList.isSuccess && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Display name</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.data.pages[0].users
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
