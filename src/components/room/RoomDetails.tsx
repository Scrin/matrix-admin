import { Grid, List, ListItem, ListItemText } from "@mui/material"
import { useRoomDetails } from "../../hooks/synapseHooks"
import { mapBool } from "../../utils"

export const RoomDetails = ({ roomID }: { roomID: string }) => {
  const roomDetails = useRoomDetails(roomID)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Name" secondary={roomDetails.data?.name || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Alias" secondary={roomDetails.data?.canonical_alias || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Topic" secondary={roomDetails.data?.topic || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Creator" secondary={roomDetails.data?.creator || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Room version" secondary={roomDetails.data?.version || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Encryption" secondary={roomDetails.data?.encryption || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Avatar URL" secondary={roomDetails.data?.avatar || "\u00A0"} />
          </ListItem>
        </List>
      </Grid>
      <Grid item md={12} lg={4}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Members" secondary={roomDetails.data?.joined_members || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Local members" secondary={roomDetails.data?.joined_local_members || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Local devices" secondary={roomDetails.data?.joined_local_devices || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="State events" secondary={roomDetails.data?.state_events || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Public" secondary={mapBool(roomDetails.data?.public)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Federatable" secondary={mapBool(roomDetails.data?.federatable)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="History visibility" secondary={roomDetails.data?.history_visibility || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Guest access" secondary={roomDetails.data?.guest_access || "\u00A0"} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}
