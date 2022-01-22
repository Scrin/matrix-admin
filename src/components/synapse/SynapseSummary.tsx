import { Paper, Typography } from "@mui/material"
import { TopRooms } from "./TopRooms"
import { UserSummary } from "./UserSummary"

export const SynapseSummary = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Overview
      </Typography>
      <UserSummary />
      <TopRooms />
    </Paper>
  )
}
