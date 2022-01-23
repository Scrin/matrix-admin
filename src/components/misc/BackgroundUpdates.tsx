import { Typography } from "@mui/material"
import { useBackgroundUpdates } from "../../hooks/synapseHooks"

export const BackgroundUpdates = () => {
  const backgroundUpdates = useBackgroundUpdates()
  const updateDbNames = Object.keys(backgroundUpdates.data?.current_updates || {})
  return (
    <>
      {backgroundUpdates.isLoading && <Typography>Loading background updates...</Typography>}
      {backgroundUpdates.isError && <Typography>Failed to load background updates</Typography>}
      {backgroundUpdates.isSuccess && (
        <>
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
