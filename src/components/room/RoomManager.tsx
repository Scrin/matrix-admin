import { Box, TextField } from "@mui/material"
import { useUIState, useUpdateUIState } from "../../context/UIStateContext"
import { RoomDelete } from "./RoomDelete"
import { RoomDetails } from "./RoomDetails"
import { RoomMembers } from "./RoomMembers"

export const RoomManager = () => {
  const { roomID } = useUIState()
  const updateUIState = useUpdateUIState()

  return (
    <>
      <Box
        sx={{
          "p": 2,
          "display": "flex",
          "flexDirection": "row",
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField label="Room ID" variant="standard" sx={{ flexGrow: 1 }} value={roomID} onChange={e => updateUIState({ roomID: e.target.value })} />
        <RoomDelete roomID={roomID} />
      </Box>
      <RoomDetails roomID={roomID} />
      <RoomMembers roomID={roomID} localOnly />
      <RoomMembers roomID={roomID} />
    </>
  )
}
