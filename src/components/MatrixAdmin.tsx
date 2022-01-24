import { AppBar, Box, Container, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../context/ConnectionParamsContext"
import { Connect } from "./misc/Connect"
import { Rooms } from "./pages/Rooms"
import { Overview } from "./pages/Overview"
import { Users } from "./pages/Users"
import { Loader } from "./misc/Loader"
import { ServerInfo } from "./misc/ServerInfo"

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
