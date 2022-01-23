import { Grid, Paper, Typography } from "@mui/material"
import { RoomList } from "../room/RoomList"
import { RoomManager } from "../room/RoomManager"

export const Rooms = () => {
  return (
    <>
      <Grid item lg={12} xl={6}>
        <RoomManagement />
      </Grid>
      <Grid item lg={12} xl={6}>
        <RoomListing />
      </Grid>
    </>
  )
}

const RoomManagement = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Room management
      </Typography>
      <RoomManager />
    </Paper>
  )
}

const RoomListing = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Room list
      </Typography>
      <RoomList />
    </Paper>
  )
}
