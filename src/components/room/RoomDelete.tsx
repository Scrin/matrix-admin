import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Tooltip } from "@mui/material"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useUpdateUIState } from "../../context/UIStateContext"
import { RoomDetails, useDeleteRoom, useDeleteStatus, useRoomDetails } from "../../hooks/synapseHooks"

const deleteHelpText =
  "This will remove all local users from the room and make the homeserver forget its existence. Deleting a room does not propagate over federation other than making local users leave the room"

export const RoomDelete = ({ roomID }: { roomID: string }) => {
  const queryClient = useQueryClient()
  const deleteRoom = useDeleteRoom()
  const updateUIState = useUpdateUIState()
  const roomDetails = useRoomDetails(roomID)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [deleteID, setDeleteID] = useState("")

  const promptDelete = () => {
    setDeleteDialogOpen(true)
    setStatusDialogOpen(false)
    setDeleteID("")
  }

  const handleDelete = (block: boolean, purge: boolean) => {
    setDeleteDialogOpen(false)
    setStatusDialogOpen(true)
    void deleteRoom(roomID, block, purge).then(setDeleteID)
  }

  const handleDeleted = () => {
    setDeleteDialogOpen(false)
    setStatusDialogOpen(false)
    setDeleteID("")
    updateUIState({ roomID: "" })
    void queryClient.invalidateQueries()
  }

  return (
    <>
      <Tooltip title={roomDetails.isSuccess ? deleteHelpText : ""}>
        <Button variant="contained" color="error" onClick={promptDelete} disabled={!roomDetails.isSuccess}>
          Delete room
        </Button>
      </Tooltip>
      {roomDetails.isSuccess && (
        <>
          <DeleteDialog roomDetails={roomDetails.data} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDelete={handleDelete} />
          <StatusDialog roomID={roomID} deleteID={deleteID} open={statusDialogOpen} handleDeleted={handleDeleted} />
        </>
      )}
    </>
  )
}

interface DeleteProps {
  roomDetails: RoomDetails
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: (block: boolean, purge: boolean) => void
}

const DeleteDialog = ({ roomDetails, open, setOpen, handleDelete }: DeleteProps) => {
  const [block, setBlock] = useState(false)
  const [purge, setPurge] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete room {roomDetails.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{deleteHelpText}</DialogContentText>
        <Tooltip title="This room will be added to a blocking list, preventing future attempts to join the room">
          <FormControlLabel label="Block" control={<Checkbox checked={block} onChange={e => setBlock(e.target.checked)} />} />
        </Tooltip>
        <Tooltip title="Removes all traces of the room from your database">
          <FormControlLabel label="Purge" control={<Checkbox checked={purge} onChange={e => setPurge(e.target.checked)} />} />
        </Tooltip>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => handleDelete(block, purge)}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface StatusProps {
  roomID: string
  deleteID: string
  open: boolean
  handleDeleted: () => void
}

const StatusDialog = ({ roomID, deleteID, open, handleDeleted }: StatusProps) => {
  const deleteStatus = useDeleteStatus(deleteID)

  return (
    <Dialog open={open} onClose={handleDeleted}>
      <DialogTitle>Delete status for {roomID}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete ID: {deleteID} status: {deleteStatus.data?.status ?? "pending"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDeleted}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
