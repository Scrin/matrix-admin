import { TextField } from "@mui/material"
import { useUIState, useUpdateUIState } from "../../context/UIStateContext"
import { MediaUserUsage } from "../media/MediaUserUsage"
import { UserDetails } from "./UserDetails"
import { UserDevices } from "./UserDevices"
import { UserSessions } from "./UserSessions"

export const UserManager = () => {
  const { userID } = useUIState()
  const updateUIState = useUpdateUIState()

  return (
    <>
      <TextField label="User ID" variant="standard" value={userID} onChange={e => updateUIState({ userID: e.target.value })} />
      <UserDetails userID={userID} />
      <MediaUserUsage userID={userID} />
      <UserDevices userID={userID} />
      <UserSessions userID={userID} />
    </>
  )
}
