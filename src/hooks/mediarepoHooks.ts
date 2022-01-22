import { useQuery } from "react-query"
import uri from "uri-tag"
import { useApiClient } from "../context/ApiClientContext"
import { useConnectionParams } from "../context/ConnectionParamsContext"

export interface MediaConfig {
  "m.upload.size": number
}

export const useMediaConfig = () => {
  const apiClient = useApiClient()
  return useQuery("media-config", () => apiClient.get<MediaConfig>("/_matrix/media/v1/config"), {
    enabled: apiClient.configured,
  })
}

export type MediarepoDatastores = Record<string, MediarepoDatastore>

export interface MediarepoDatastore {
  type: string
  uri: string
}

export const useMediarepoDatastores = () => {
  const apiClient = useApiClient()
  const connectionParams = useConnectionParams()
  return useQuery("mediarepo-datastores", () => apiClient.get<MediarepoDatastores>("/_matrix/media/unstable/admin/datastores"), {
    enabled: apiClient.configured && !!connectionParams?.mediarepoVersion,
  })
}

export interface MediarepoDatastoreSize {
  media_affected: number
  media_bytes: number
  media_hashes_affected: number
  thumbnail_bytes: number
  thumbnail_hashes_affected: number
  thumbnails_affected: number
  total_bytes: number
  total_hashes_affected: number
}

export const useMediarepoDatastoreSize = (id: string) => {
  const apiClient = useApiClient()
  const connectionParams = useConnectionParams()
  return useQuery(
    ["mediarepo-datastore-size", id],
    () => apiClient.get<MediarepoDatastoreSize>(uri`/_matrix/media/unstable/admin/datastores/${id}/size_estimate`),
    {
      enabled: apiClient.configured && !!connectionParams?.mediarepoVersion,
      staleTime: 60000,
    }
  )
}

export interface MediarepoServerUsage {
  raw_bytes: {
    total: number
    media: number
    thumbnails: number
  }
  raw_counts: {
    total: number
    media: number
    thumbnails: number
  }
}

export const useMediarepoServerUsage = (server: string) => {
  const apiClient = useApiClient()
  const connectionParams = useConnectionParams()
  return useQuery(["mediarepo-server-usage", server], () => apiClient.get<MediarepoServerUsage>(uri`/_matrix/media/unstable/admin/usage/${server}`), {
    enabled: apiClient.configured && !!connectionParams?.mediarepoVersion && server !== "",
    staleTime: 60000,
  })
}

export type MediarepoUserUsage = Record<string, MediarepoUserUsageEntry>

export interface MediarepoUserUsageEntry {
  raw_bytes: {
    total: number
    media: number
  }
  raw_counts: {
    total: number
    media: number
  }
  uploaded: string[]
}

export const useMediarepoUserUsage = (user: string) => {
  const apiClient = useApiClient()
  const connectionParams = useConnectionParams()
  const split = user.split(":")
  return useQuery(
    ["mediarepo-user-usage", user],
    () => apiClient.get<MediarepoUserUsage>(uri`/_matrix/media/unstable/admin/usage/${split[1] || ""}/users?user_id=${user}`),
    {
      enabled: apiClient.configured && !!connectionParams?.mediarepoVersion && split[1] !== "" && split.length === 2,
      staleTime: 60000,
    }
  )
}
