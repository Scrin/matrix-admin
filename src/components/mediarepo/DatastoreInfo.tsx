import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useConnectionParams } from "../../context/ConnectionParamsContext"
import { MediarepoDatastore, useMediarepoDatastoreSize, useMediarepoDatastores } from "../../hooks/mediarepoHooks"
import { formatBytes } from "../../utils"

export const DatastoreInfo = () => {
  const connectionParams = useConnectionParams()
  const mediarepoDatastores = useMediarepoDatastores()

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ p: 2 }}>
        Datastores
      </Typography>
      {connectionParams && !connectionParams.mediarepoVersion ? (
        <Typography>matrix-media-repo not detected on {connectionParams?.server} - no usage data available</Typography>
      ) : (
        <>
          {mediarepoDatastores.isLoading && <Typography>Loading...</Typography>}
          {mediarepoDatastores.isError && <Typography>Error loading datastores from mediarepo</Typography>}
          {mediarepoDatastores.isSuccess &&
            Object.keys(mediarepoDatastores.data).map(id => <DatastoreSize key={id} id={id} info={mediarepoDatastores.data[id]} />)}
        </>
      )}
    </Paper>
  )
}

const DatastoreSize = ({ id, info }: { id: string; info: MediarepoDatastore }) => {
  const datastore = useMediarepoDatastoreSize(id)
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <Typography>{`Datastore type: ${info.type}, uri: ${info.uri}, ID: ${id}`}</Typography>
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
