import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useRoomList } from "../../hooks/synapseHooks"
import useInView from "react-cool-inview"
import { useUpdateUIState } from "../../context/UIStateContext"

export const RoomList = () => {
  const roomList = useRoomList("name")
  const updateUIState = useUpdateUIState()

  const { observe } = useInView({
    rootMargin: "500px 0px",
    onEnter: () => void roomList.fetchNextPage(),
  })

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Rooms
      </Typography>
      {roomList.isLoading && <Typography>Loading rooms</Typography>}
      {roomList.isError && <Typography>Failed to load rooms</Typography>}
      {roomList.isSuccess && (
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
            {roomList.data.pages[0].rooms.map(room => (
              <TableRow key={room.room_id} hover sx={{ cursor: "pointer" }} onClick={() => updateUIState({ roomID: room.room_id })}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.room_id}</TableCell>
                <TableCell>{room.joined_members}</TableCell>
                <TableCell>{room.joined_local_members}</TableCell>
                <TableCell>{room.encryption ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div ref={observe}></div>
    </>
  )
}
