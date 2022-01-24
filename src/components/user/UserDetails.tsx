import { Grid, List, ListItem, ListItemText } from "@mui/material"
import { useUserDetails } from "../../hooks/synapseHooks"
import { formatTS, mapBool } from "../../utils"

export const UserDetails = ({ userID }: { userID: string }) => {
  const userDetails = useUserDetails(userID)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Display name" secondary={userDetails.data?.displayname || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Account created"
              secondary={formatTS(userDetails.data?.creation_ts ? userDetails.data.creation_ts * 1000 : null) || "\u00A0"}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Avatar URL" secondary={userDetails.data?.avatar_url || "\u00A0"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Appservice ID" secondary={userDetails.data?.appservice_id || "\u00A0"} />
          </ListItem>
        </List>
      </Grid>
      <Grid item md={12} lg={4}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Admin" secondary={mapBool(userDetails.data?.admin)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Deactivated" secondary={mapBool(userDetails.data?.deactivated)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Shadow banned" secondary={mapBool(userDetails.data?.shadow_banned)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Guest" secondary={mapBool(userDetails.data?.is_guest)} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}
