import { Divider, Paper, Typography } from "@mui/material"
import { useBackgroundUpdates, useFederationDestinations } from "../../hooks/synapseHooks"
import { UserSearch } from "./UserSearch"

export const SynapseManager = () => {
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
      <UserSearch />
    </Paper>
  )
}

const BackgroundUpdates = () => {
  const backgroundUpdates = useBackgroundUpdates()
  const roomList = useFederationDestinations("destination", 0)
  const updateDbNames = Object.keys(backgroundUpdates.data?.current_updates || {})
  return (
    <>
      {backgroundUpdates.isLoading && <Typography>Loading background updates...</Typography>}
      {backgroundUpdates.isError && <Typography>Failed to load background updates</Typography>}
      {backgroundUpdates.isSuccess && (
        <>
          {roomList.isLoading && <Typography>Loading federation details...</Typography>}
          {roomList.isError && <Typography>Failed to load federation details</Typography>}
          {roomList.isSuccess && <Typography>{roomList.data.total} known federation destinations</Typography>}
          <Typography>Background updates {backgroundUpdates.data.enabled ? "enabled" : "disabled"}</Typography>
          {updateDbNames?.map(dbName => {
            const update = backgroundUpdates.data.current_updates[dbName]
            return (
              <Typography key={dbName}>
                {`${dbName}: ${update.name}: total items: ${update.total_item_count}, ${update.total_duration_ms / 1000} seconds at ${
                  update.average_items_per_ms * 1000
                } items/sec`}
              </Typography>
            )
          })}
        </>
      )}
    </>
  )
}
