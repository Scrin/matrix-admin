import { FC, useState, createContext, useContext } from "react"

export interface UIState {
  userID: string
  roomID: string
  tabIndex: number
}

const initialState: UIState = {
  userID: "",
  roomID: "",
  tabIndex: 0,
}

const UIStateContext = createContext<UIState>(initialState)
const UpdateUIStateContext = createContext<((state: Partial<UIState>) => void) | null>(null)

export const useUIState = () => useContext(UIStateContext)
export const useUpdateUIState = () => {
  const context = useContext(UpdateUIStateContext)
  if (context === null) throw new Error("useSetConnectionParams used outside Provider")
  return context
}

export const UIStateProvider: FC = ({ children }) => {
  const [uiState, setUiState] = useState<UIState>(initialState)

  const updateUiState = (state: Partial<UIState>) => setUiState({ ...uiState, ...state })

  return (
    <UIStateContext.Provider value={uiState}>
      <UpdateUIStateContext.Provider value={updateUiState}>{children}</UpdateUIStateContext.Provider>
    </UIStateContext.Provider>
  )
}
