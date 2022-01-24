import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { MouseEventHandler } from "react"
import { useUpdateUIState } from "../../context/UIStateContext"
import { useRoomMembership, useRoomDetails } from "../../hooks/synapseHooks"
import { pageIndexes } from "../MatrixAdmin"

export const UserRoomMembership = ({ userID }: { userID: string }) => {
  const roomMembership = useRoomMembership(userID)
  const updateUIState = useUpdateUIState()

  const onClick = (roomID: string) => () => updateUIState({ tabIndex: pageIndexes.Rooms, roomID })

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Room memberships
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Internal ID</TableCell>
            <TableCell>Members</TableCell>
            <TableCell>Local members</TableCell>
            <TableCell>Encrypted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomMembership.data?.joined_rooms?.map(roomID => (
            <RoomEntry key={roomID} roomID={roomID} onClick={onClick(roomID)} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}

const RoomEntry = ({ roomID, onClick }: { roomID: string; onClick: MouseEventHandler<HTMLTableRowElement> }) => {
  const roomDetails = useRoomDetails(roomID)
  return (
    <TableRow hover sx={{ cursor: "pointer" }} onClick={onClick}>
      <TableCell>{roomDetails.isSuccess ? roomDetails.data.name : ""}</TableCell>
      <TableCell>{roomID}</TableCell>
      <TableCell>{roomDetails.data?.joined_members}</TableCell>
      <TableCell>{roomDetails.data?.joined_local_members}</TableCell>
      <TableCell>{roomDetails.data?.encryption ? "Yes" : "No"}</TableCell>
    </TableRow>
  )
}
