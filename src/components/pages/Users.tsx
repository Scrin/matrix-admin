import { Grid, Paper, Typography } from "@mui/material"
import { UserList } from "../user/UserList"
import { UserManager } from "../user/UserManager"

export const Users = () => {
  return (
    <>
      <Grid item lg={12} xl={6}>
        <UserManagement />
      </Grid>
      <Grid item lg={12} xl={6}>
        <UserListing />
      </Grid>
    </>
  )
}

const UserManagement = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        User management
      </Typography>
      <UserManager />
    </Paper>
  )
}

const UserListing = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        User list
      </Typography>
      <UserList />
    </Paper>
  )
}
