import { AppBar, Box, Container, Fab, Grid, LinearProgress, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../context/ConnectionParamsContext"
import { Connect } from "./misc/Connect"
import { Rooms } from "./pages/Rooms"
import { Overview } from "./pages/Overview"
import { Users } from "./pages/Users"
import { useIsFetching, useQueryClient } from "react-query"
import RefreshIcon from "@mui/icons-material/Refresh"

const pages = [
  { name: "Overview", Component: Overview },
  { name: "Users", Component: Users },
  { name: "Rooms", Component: Rooms },
]

export const MatrixAdmin = () => {
  const connectionParams = useConnectionParams()
  const [tab, setTab] = useState(0)
  return (
    <>
      <Box>
        <AppBar position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" sx={{ p: 2 }}>
              matrix-admin
            </Typography>
            <ServerInfo />
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {!connectionParams ? (
              <Grid item xs={12} md={8}>
                <Connect />
              </Grid>
            ) : (
              <>
                <Loader />
                <Grid item xs={12}>
                  <Tabs value={tab} centered onChange={(_, v: number) => setTab(v)}>
                    {pages.map(page => (
                      <Tab key={page.name} label={page.name} />
                    ))}
                  </Tabs>
                </Grid>
                {pages.map(({ name, Component }, i) => tab === i && <Component key={name} />)}
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

const Loader = () => {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
  if (isFetching)
    return (
      <Box sx={{ position: "absolute" }}>
        <LinearProgress />
        <Typography color="gray">Updating data...</Typography>
      </Box>
    )
  return (
    <Fab size="small" color="primary" sx={{ m: 2, position: "absolute", zIndex: 1 }} onClick={() => queryClient.invalidateQueries()}>
      <RefreshIcon />
    </Fab>
  )
}

const ServerInfo = () => {
  const connectionParams = useConnectionParams()

  if (!connectionParams) return null
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        {connectionParams.server}
      </Typography>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        {connectionParams.serverVersion}
      </Typography>
      {connectionParams.mediarepoVersion && (
        <Typography component="h1" variant="h6" sx={{ p: 2 }}>
          Mediarepo {connectionParams.mediarepoVersion}
        </Typography>
      )}
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        User {connectionParams.userID}
      </Typography>
    </>
  )
}
