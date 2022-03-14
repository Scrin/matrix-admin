import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel } from "@mui/material"
import { useState } from "react"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { useMediarepoDatastores, MediarepoDatastore, useMediarepoDatastoreSize } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"

export const MediaDatastoreUsage = () => {
  const connectionParams = useConnectionParams()
  const mediarepoDatastores = useMediarepoDatastores()
  const [showEmpty, setShowEmpty] = useState(false)
  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Datastores
      </Typography>
      {connectionParams && !connectionParams.mediarepoVersion ? (
        <Typography>matrix-media-repo not detected on {connectionParams?.server} - no usage data available</Typography>
      ) : (
        <>
          {mediarepoDatastores.isLoading && <Typography>Loading...</Typography>}
          {mediarepoDatastores.isError && <Typography>Error loading datastores from mediarepo</Typography>}
          {mediarepoDatastores.isSuccess && (
            <>
              <FormControlLabel label="Show empty datastores" control={<Checkbox checked={showEmpty} onChange={e => setShowEmpty(e.target.checked)} />} />
              {Object.keys(mediarepoDatastores.data).map(id => (
                <DatastoreSize key={id} id={id} info={mediarepoDatastores.data[id]} showEmpty={showEmpty} />
              ))}
            </>
          )}
        </>
      )}
    </>
  )
}

interface DatastoreSizeProps {
  id: string
  info: MediarepoDatastore
  showEmpty: boolean
}

const DatastoreSize = ({ id, info, showEmpty }: DatastoreSizeProps) => {
  const datastore = useMediarepoDatastoreSize(id)

  if (datastore.isSuccess && !showEmpty && datastore.data.total_bytes === 0) return null

  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <Typography>{`Datastore ${info.type} uri: ${info.uri}`}</Typography>
      <Typography>{`Datastore ID: ${id}`}</Typography>
      {datastore.isLoading && <Typography>Loading datastore size...</Typography>}
      {datastore.isError && <Typography>Error loading datastore size</Typography>}
      {datastore.isSuccess && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>Type</TableCell>
              <TableCell sx={{ width: "25%" }}>Size</TableCell>
              <TableCell sx={{ width: "25%" }}>Items affected</TableCell>
              <TableCell sx={{ width: "25%" }}>Hashes affected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>Media</TableCell>
              <TableCell sx={{ width: "25%" }}>{formatBytes(datastore.data.media_bytes)}</TableCell>
              <TableCell sx={{ width: "25%" }}>{datastore.data.media_affected}</TableCell>
              <TableCell sx={{ width: "25%" }}>{datastore.data.media_hashes_affected}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>Thumbnails</TableCell>
              <TableCell sx={{ width: "25%" }}>{formatBytes(datastore.data.thumbnail_bytes)}</TableCell>
              <TableCell sx={{ width: "25%" }}>{datastore.data.thumbnails_affected}</TableCell>
              <TableCell sx={{ width: "25%" }}>{datastore.data.thumbnail_hashes_affected}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>Total</TableCell>
              <TableCell sx={{ width: "25%" }}>{formatBytes(datastore.data.total_bytes)}</TableCell>
              <TableCell sx={{ width: "25%" }}></TableCell>
              <TableCell sx={{ width: "25%" }}>{datastore.data.total_hashes_affected}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}
