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
  return new Date(ts).toISOString()
}

export const formatDuration = (durationMs?: number | null): string => {
  if (durationMs === undefined || durationMs === null) return ""
  let result = ""
  const days = Math.floor(durationMs / (24 * 60 * 60 * 1000))
  if (days > 0) {
    result += `${days}d `
    durationMs -= days * 24 * 60 * 60 * 1000
  }
  const hours = Math.floor(durationMs / (60 * 60 * 1000))
  if (hours > 0) {
    result += `${hours}h `
    durationMs -= hours * 60 * 60 * 1000
  }
  const minutes = Math.floor(durationMs / (60 * 1000))
  if (minutes > 0) {
    result += `${minutes}m `
    durationMs -= minutes * 60 * 1000
  }
  const seconds = Math.floor(durationMs / 1000)
  if (seconds > 0) {
    result += `${seconds}s `
    durationMs -= seconds * 1000
  }
  result += `${durationMs} ms`
  return result
}
