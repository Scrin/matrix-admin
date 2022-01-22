import { Grid } from "@mui/material"
import { DatastoreInfo } from "./DatastoreInfo"
import { MediarepoManager } from "./MediarepoManager"

export const Mediarepo = () => {
  return (
    <>
      <Grid item lg={12} xl={6}>
        <MediarepoManager />
      </Grid>
      <Grid item lg={12} xl={6}>
        <DatastoreInfo />
      </Grid>
    </>
  )
}
