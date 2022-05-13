import { FC, ReactElement } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity },
  },
})

export const ReactQueryProvider: FC<{ children: ReactElement }> = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
