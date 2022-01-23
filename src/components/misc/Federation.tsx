import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useFederationDestinations } from "../../hooks/synapseHooks"
import { formatDuration, formatTS } from "../../utils"

export const Federation = () => {
  const federationDestinations = useFederationDestinations("destination")
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    if (federationDestinations.hasNextPage) void federationDestinations.fetchNextPage()
    if (federationDestinations.isSuccess) {
      const pages = federationDestinations.data.pages
      setLoadedCount((pages.length - 1) * 100 + pages[pages.length - 1].destinations.length)
    }
  }, [federationDestinations, setLoadedCount])

  const totalDestinations = federationDestinations.isSuccess ? federationDestinations.data.pages[0].total : 0

  return (
    <>
      <Typography component="h1" variant="h6" sx={{ p: 2 }}>
        Latest 20 federation failures ({totalDestinations} known federation destinations)
        {loadedCount < totalDestinations ? ` (${Number((loadedCount / totalDestinations) * 100).toFixed(2)}% loaded)` : ""}
      </Typography>
      {federationDestinations.isLoading && <Typography>Loading federation details...</Typography>}
      {federationDestinations.isError && <Typography>Failed to load federation details</Typography>}
      {federationDestinations.isSuccess && (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>First failure</TableCell>
                <TableCell>Latest retry</TableCell>
                <TableCell>Retry interval</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {federationDestinations.data.pages
                .flatMap(page => page.destinations)
                .filter(destination => (destination.failure_ts || 0) > 0)
                .sort((a, b) => (b.failure_ts || 0) - (a.failure_ts || 0))
                .slice(0, 20)
                .map(destination => (
                  <TableRow key={destination.destination}>
                    <TableCell>{destination.destination}</TableCell>
                    <TableCell>{formatTS(destination.failure_ts)}</TableCell>
                    <TableCell>{formatTS(destination.retry_last_ts)}</TableCell>
                    <TableCell>{formatDuration(destination.retry_interval)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}
