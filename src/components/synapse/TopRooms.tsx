import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useRoomList } from "../../hooks/synapseHooks"

export const TopRooms = () => {
  const roomList = useRoomList("joined_members", 20)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Top 20 largest rooms {roomList.isSuccess && `(out of ${roomList.data.total_rooms} known rooms)`}
      </Typography>
      {roomList.isLoading && <Typography>Loading rooms</Typography>}
      {roomList.isError && <Typography>Failed to load rooms</Typography>}
      {roomList.isSuccess && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Alias</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Local members</TableCell>
              <TableCell>State events</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.data.rooms.map(room => (
              <TableRow key={room.room_id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.canonical_alias}</TableCell>
                <TableCell>{room.joined_members}</TableCell>
                <TableCell>{room.joined_local_members}</TableCell>
                <TableCell>{room.state_events}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
