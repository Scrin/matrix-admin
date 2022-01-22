import { AppBar, Box, Container, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../context/ConnectionParamsContext"
import { Connect } from "./Connect"
import { Mediarepo } from "./mediarepo/Mediarepo"
import { Synapse } from "./synapse/Synapse"

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
                <Grid item xs={12}>
                  <Tabs value={tab} centered onChange={(_, v: number) => setTab(v)}>
                    <Tab label="Synapse" />
                    <Tab label="Mediarepo" />
                  </Tabs>
                </Grid>
                {tab === 0 && <Synapse />}
                {tab === 1 && <Mediarepo />}
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
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
