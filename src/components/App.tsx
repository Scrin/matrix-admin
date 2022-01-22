import { ApiClientProvider } from "../context/ApiClientContext"
import { ConnectionParamsProvider } from "../context/ConnectionParamsContext"
import { ReactQueryProvider } from "../context/ReactQueryContext"
import { MatrixAdmin } from "./MatrixAdmin"

export const App = () => (
  <ConnectionParamsProvider>
    <ApiClientProvider>
      <ReactQueryProvider>
        <MatrixAdmin />
      </ReactQueryProvider>
    </ApiClientProvider>
  </ConnectionParamsProvider>
)
