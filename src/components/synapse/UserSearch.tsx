import { Typography, TextField, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useUserDetails, useUserDevices, UserDetails, UserDevices } from "../../hooks/synapseHooks"
import { formatTS } from "../../utils"

export const UserSearch = () => {
  const connectionParams = useConnectionParams()
  const [user, setUser] = useState(connectionParams?.userID || "")
  const userDetails = useUserDetails(user)
  const userDevices = useUserDevices(user)

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        User details
      </Typography>
      <TextField label="User ID" variant="standard" value={user} onChange={e => setUser(e.target.value)} />
      {userDetails.isLoading && <Typography>Loading user details...</Typography>}
      {userDetails.isError && <Typography>Failed to load user details</Typography>}
      {userDetails.isSuccess && (userDetails.data.error ? <Typography>{userDetails.data.error}</Typography> : <Details user={userDetails.data} />)}
      {userDevices.isLoading && <Typography>Loading user devices...</Typography>}
      {userDevices.isError && <Typography>Failed to load user devices</Typography>}
      {userDetails.isSuccess && userDevices.isSuccess && !userDevices.data.error && <Devices devices={userDevices.data} />}
    </>
  )
}

const Details = ({ user }: { user: UserDetails }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Display name" secondary={user.displayname} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Account created" secondary={formatTS(user.creation_ts * 1000)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Avatar URL" secondary={user.avatar_url} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Appservice ID" secondary={user.appservice_id} />
          </ListItem>
        </List>
      </Grid>
      <Grid item md={12} lg={4}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemText primary="Admin" secondary={user.admin === 1 ? "Yes" : "No"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Deactivated" secondary={user.deactivated === 1 ? "Yes" : "No"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Shadow banned" secondary={user.shadow_banned === 1 ? "Yes" : "No"} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Guest" secondary={user.is_guest === 1 ? "Yes" : "No"} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

const Devices = ({ devices }: { devices: UserDevices }) => {
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Devices
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Display name</TableCell>
            <TableCell>Last seen</TableCell>
            <TableCell>Last seen IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.devices.map(device => (
            <TableRow key={device.device_id}>
              <TableCell>{device.device_id}</TableCell>
              <TableCell>{device.display_name}</TableCell>
              <TableCell>{formatTS(device.last_seen_ts)}</TableCell>
              <TableCell>{device.last_seen_ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
