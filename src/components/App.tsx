import { ApiClientProvider } from "../context/ApiClientContext"
import { ConnectionParamsProvider } from "../context/ConnectionParamsContext"
import { ReactQueryProvider } from "../context/ReactQueryContext"
import { UIStateProvider } from "../context/UIStateContext"
import { MatrixAdmin } from "./MatrixAdmin"

export const App = () => (
  <ConnectionParamsProvider>
    <ApiClientProvider>
      <ReactQueryProvider>
        <UIStateProvider>
          <MatrixAdmin />
        </UIStateProvider>
      </ReactQueryProvider>
    </ApiClientProvider>
  </ConnectionParamsProvider>
)
