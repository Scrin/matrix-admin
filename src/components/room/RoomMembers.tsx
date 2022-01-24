import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useUpdateUIState } from "../../context/UIStateContext"
import { useRoomMembers } from "../../hooks/synapseHooks"
import { pageIndexes } from "../MatrixAdmin"

export interface Props {
  roomID: string
  localOnly?: boolean
}

export const RoomMembers = ({ roomID, localOnly }: Props) => {
  const connectionParams = useConnectionParams()
  const roomMembers = useRoomMembers(roomID)
  const updateUIState = useUpdateUIState()

  const onClick = (userID: string) => () => updateUIState({ tabIndex: pageIndexes.Users, userID })
  const members = localOnly ? roomMembers.data?.members?.filter(member => member.endsWith(`:${connectionParams?.serverName || ""}`)) : roomMembers.data?.members
  const memberCount = members ? `(${members.length})` : ""

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        {localOnly ? `Local room members ${memberCount}` : `All room members ${memberCount}`}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members?.map(member => (
            <TableRow key={member} hover sx={{ cursor: "pointer" }} onClick={onClick(member)}>
              <TableCell>{member}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
