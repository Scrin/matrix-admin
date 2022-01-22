import { useQuery } from "react-query"
import uri from "uri-tag"
import { useApiClient } from "../context/ApiClientContext"

export interface BackgroundUpdates {
  enabled: boolean
  current_updates: Record<string, BackgroundUpdate>
}

export interface BackgroundUpdate {
  name: string
  total_item_count: number
  total_duration_ms: number
  average_items_per_ms: number
}

export const useBackgroundUpdates = () => {
  const apiClient = useApiClient()
  return useQuery("synapse-background-updates", () => apiClient.get<BackgroundUpdates>("/_synapse/admin/v1/background_updates/status"), {
    enabled: apiClient.configured,
    staleTime: 10000,
  })
}

export interface RoomList {
  rooms: Room[]
  offset: number
  total_rooms: number
}

export interface Room {
  room_id: string
  name: string
  canonical_alias: string
  joined_members: number
  joined_local_members: number
  version: string
  creator: string
  encryption: string | null
  federatable: boolean
  public: boolean
  join_rules: string
  guest_access: string | null
  history_visibility: string
  state_events: number
}

export type RoomListSort =
  | "name"
  | "canonical_alias"
  | "joined_members"
  | "joined_local_members"
  | "version"
  | "creator"
  | "encryption"
  | "federatable"
  | "public"
  | "guest_access"
  | "history_visibility"
  | "state_events"

export const useRoomList = (sort: RoomListSort, limit = 100, reverse = false) => {
  const apiClient = useApiClient()
  return useQuery(
    ["synapse-room-list", sort, limit, reverse],
    () => apiClient.get<RoomList>(uri`/_synapse/admin/v1/rooms?order_by=${sort}&limit=${limit}&dir=${reverse ? "b" : "f"}`),
    {
      enabled: apiClient.configured,
      staleTime: 60000,
    }
  )
}

export interface UserList {
  users: User[]
  next_token: number
  total: number
}

export interface User {
  name: string
  is_guest: number
  admin: number
  user_type: unknown
  deactivated: number
  shadow_banned: number
  displayname: string
  avatar_url: string
  creation_ts: number
}

export type UserListSort = "name" | "is_guest" | "admin" | "user_type" | "deactivated" | "shadow_banned" | "displayname" | "avatar_url" | "creation_ts"

export const useUserList = (sort: UserListSort, limit = 100, reverse = false) => {
  const apiClient = useApiClient()
  return useQuery(
    ["synapse-user-list", sort, limit, reverse],
    () => apiClient.get<UserList>(uri`/_synapse/admin/v2/users?order_by=${sort}&limit=${limit}&dir=${reverse ? "b" : "f"}`),
    {
      enabled: apiClient.configured,
      staleTime: 60000,
    }
  )
}

export interface FederationDestinations {
  destinations: FederationDestination[]
  total: number
}

export interface FederationDestination {
  destination: string
  retry_last_ts: number | null
  retry_interval: number | null
  failure_ts: number | null
  last_successful_stream_ordering: number | null
}

export type FederationDestinationSort = "destination" | "retry_last_ts" | "retry_interval" | "failure_ts" | "last_successful_stream_ordering"

export const useFederationDestinations = (sort: FederationDestinationSort, limit = 100, reverse = false) => {
  const apiClient = useApiClient()
  return useQuery(
    ["synapse-federation-destinations", sort, limit, reverse],
    () => apiClient.get<FederationDestinations>(uri`/_synapse/admin/v1/federation/destinations?order_by=${sort}&limit=${limit}&dir=${reverse ? "b" : "f"}`),
    {
      enabled: apiClient.configured,
      staleTime: 60000,
    }
  )
}

export interface UserDetails {
  error?: string
  displayname: string
  threepids: {
    medium: string
    address: string
    added_at: number
    validated_at: number
  }[]
  avatar_url: string
  admin: number
  deactivated: number
  shadow_banned: number
  password_hash: string
  creation_ts: number
  appservice_id: string | null
  consent_server_notice_sent: unknown
  consent_version: unknown
  external_ids: {
    auth_provider: string
    external_id: string
  }[]
  is_guest: number
  user_type: unknown
}

export const useUserDetails = (userId: string) => {
  const apiClient = useApiClient()
  return useQuery(["synapse-user-details", userId], () => apiClient.get<UserDetails>(uri`/_synapse/admin/v2/users/${userId}`), {
    enabled: apiClient.configured && userId !== "",
    staleTime: 60000,
  })
}

export interface UserDevices {
  error?: string
  devices: UserDevice[]
  total: number
}

export interface UserDevice {
  device_id: string
  display_name: string
  last_seen_ip: string
  last_seen_ts: number
  user_id: string
}

export const useUserDevices = (userId: string) => {
  const apiClient = useApiClient()
  return useQuery(["synapse-user-devices", userId], () => apiClient.get<UserDevices>(uri`/_synapse/admin/v2/users/${userId}/devices`), {
    enabled: apiClient.configured && userId !== "",
    staleTime: 60000,
  })
}
