import { AppBar, Box, Container, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useConnectionParams } from "../context/ConnectionParamsContext"
import { Connect } from "./misc/Connect"
import { Rooms } from "./pages/Rooms"
import { Overview } from "./pages/Overview"
import { Users } from "./pages/Users"
import { Loader } from "./misc/Loader"
import { ServerInfo } from "./misc/ServerInfo"
import { useUIState, useUpdateUIState } from "../context/UIStateContext"

interface Page {
  name: string
  Component: React.FC
}

const pages = (<T extends readonly Page[] & { name: V }[], V extends string>(...p: T) => p)(
  { name: "Overview", Component: Overview },
  { name: "Users", Component: Users },
  { name: "Rooms", Component: Rooms }
)

export const pageIndexes = pages.reduce((p, n, i) => ({ ...p, [n.name]: i }), {} as Record<typeof pages[number]["name"], number>)

export const MatrixAdmin = () => {
  const connectionParams = useConnectionParams()
  const { tabIndex } = useUIState()
  const updateUIState = useUpdateUIState()
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
                  <Tabs value={tabIndex} centered onChange={(_, v: number) => updateUIState({ tabIndex: v })}>
                    {pages.map(page => (
                      <Tab key={page.name} label={page.name} />
                    ))}
                  </Tabs>
                </Grid>
                {pages.map(({ name, Component }, i) => tabIndex === i && <Component key={name} />)}
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
