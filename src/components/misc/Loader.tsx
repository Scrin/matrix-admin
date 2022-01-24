import { Box, LinearProgress, Typography, Fab } from "@mui/material"
import { useState, useEffect } from "react"
import { useQueryClient, useIsFetching } from "react-query"
import RefreshIcon from "@mui/icons-material/Refresh"

export const Loader = () => {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isFetching) {
      setLoading(true)
    } else {
      const id = setTimeout(() => setLoading(false), 100)
      return () => clearTimeout(id)
    }
  }, [setLoading, isFetching])

  if (loading)
    return (
      <Box sx={{ position: "absolute" }}>
        <LinearProgress />
        <Typography color="gray">Updating data...</Typography>
      </Box>
    )
  return (
    <Fab size="small" color="primary" sx={{ m: 2, position: "absolute", zIndex: 1 }} onClick={() => queryClient.invalidateQueries()}>
      <RefreshIcon />
    </Fab>
  )
}
