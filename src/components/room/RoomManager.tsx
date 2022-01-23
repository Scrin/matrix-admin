import { TextField } from "@mui/material"
import { useUIState, useUpdateUIState } from "../../context/UIStateContext"
import { RoomDetails } from "./RoomDetails"
import { RoomMembers } from "./RoomMembers"

export const RoomManager = () => {
  const { roomID } = useUIState()
  const updateUIState = useUpdateUIState()

  return (
    <>
      <TextField label="Room ID" variant="standard" value={roomID} onChange={e => updateUIState({ roomID: e.target.value })} />
      <RoomDetails roomID={roomID} />
      <RoomMembers roomID={roomID} />
    </>
  )
}
