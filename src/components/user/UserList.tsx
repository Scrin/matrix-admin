import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useUserList } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"
import { useInView } from "react-cool-inview"
import { useUpdateUIState } from "../../context/UIStateContext"

export const UserList = () => {
  const userList = useUserList("name")
  const updateUIState = useUpdateUIState()

  const { observe } = useInView({
    rootMargin: "500px 0px",
    onEnter: () => void userList.fetchNextPage(),
  })

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Users
      </Typography>
      {userList.isLoading && <Typography>Loading rooms</Typography>}
      {userList.isError && <Typography>Failed to load rooms</Typography>}
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
            {userList.data.pages.map(userlist =>
              userlist.users.map(user => (
                <TableRow key={user.name} hover sx={{ cursor: "pointer" }} onClick={() => updateUIState({ userID: user.name })}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.displayname}</TableCell>
                  <TableCell>{formatTS(user.creation_ts)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      <div ref={observe}></div>
    </>
  )
}
