export const formatBytes = (bytes?: number | null): string => {
  if (bytes === undefined || bytes === null) return ""

  let postfix = "B"
  if (bytes >= 1099511627776) {
    bytes /= 1099511627776
    postfix = "TB"
  } else if (bytes >= 1073741824) {
    bytes /= 1073741824
    postfix = "GB"
  } else if (bytes >= 1048576) {
    bytes /= 1048576
    postfix = "MB"
  } else if (bytes >= 1024) {
    bytes /= 1024
    postfix = "kB"
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(bytes).replace(/,/g, " ") + " " + postfix
}

export const formatTS = (ts?: number | null): string => {
  if (ts === undefined || ts === null) return ""
  return new Date(ts).toISOString().replace(/T/, " ").replace(/\..*/, "")
}

export const formatDuration = (durationMs?: number | null, maxParts = 3): string => {
  if (durationMs === undefined || durationMs === null) return ""
  const parts = []
  const days = Math.floor(durationMs / (24 * 60 * 60 * 1000))
  if (days > 0) {
    parts.push(`${days}d`)
    durationMs -= days * 24 * 60 * 60 * 1000
  }
  const hours = Math.floor(durationMs / (60 * 60 * 1000))
  if (hours > 0) {
    parts.push(`${hours}h`)
    durationMs -= hours * 60 * 60 * 1000
  }
  const minutes = Math.floor(durationMs / (60 * 1000))
  if (minutes > 0) {
    parts.push(`${minutes}m`)
    durationMs -= minutes * 60 * 1000
  }
  const seconds = Math.floor(durationMs / 1000)
  if (seconds > 0) {
    parts.push(`${seconds}s`)
    durationMs -= seconds * 1000
  }
  parts.push(`${durationMs} ms`)
  return parts.slice(0, maxParts).join(" ")
}
