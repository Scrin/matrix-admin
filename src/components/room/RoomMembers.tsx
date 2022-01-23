import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useRoomMembers } from "../../hooks/synapseHooks"

export const RoomMembers = ({ roomID }: { roomID: string }) => {
  const roomMembers = useRoomMembers(roomID)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Room members
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomMembers.data?.members?.map(member => (
            <TableRow key={member}>
              <TableCell>{member}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
