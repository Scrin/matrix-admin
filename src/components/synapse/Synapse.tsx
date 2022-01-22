import { Grid } from "@mui/material"
import { SynapseSummary } from "./SynapseSummary"
import { SynapseManager } from "./SynapseManager"

export const Synapse = () => {
  return (
    <>
      <Grid item lg={12} xl={6}>
        <SynapseManager />
      </Grid>
      <Grid item lg={12} xl={6}>
        <SynapseSummary />
      </Grid>
    </>
  )
}
