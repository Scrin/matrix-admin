import { Divider, Grid, Paper, Typography } from "@mui/material"
import { useMediaConfig } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"
import { MediaDatastoreUsage } from "../media/MediaDatastoreUsage"
import { MediaHomeserverUsage } from "../media/MediaHomeserverUsage"
import { BackgroundUpdates } from "../misc/BackgroundUpdates"
import { Federation } from "../misc/Federation"
import { UserSummary } from "../user/UserSummary"

export const Overview = () => {
  return (
    <>
      <Grid item lg={12} xl={6}>
        <SynapseOverview />
      </Grid>
      <Grid item lg={12} xl={6}>
        <MediaOverview />
      </Grid>
    </>
  )
}

const SynapseOverview = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Synapse
      </Typography>
      <BackgroundUpdates />
      <Divider light />
      <UserSummary />
      <Federation />
    </Paper>
  )
}

const MediaOverview = () => {
  const mediaConfig = useMediaConfig()

  const maxUpload = mediaConfig.isLoading ? "loading..." : mediaConfig.isSuccess ? formatBytes(mediaConfig.data["m.upload.size"]) : "unknown"
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Media
      </Typography>
      <Typography>Max upload size: {maxUpload}</Typography>
      <Divider light />
      <MediaHomeserverUsage />
      <MediaDatastoreUsage />
    </Paper>
  )
}
