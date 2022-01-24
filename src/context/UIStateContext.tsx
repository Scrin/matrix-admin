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

  const updateUiState = (state: Partial<UIState>) => {
    setUiState({ ...uiState, ...state })
    // Scroll to top if any of these were changed
    if (state.userID !== undefined && state.userID !== uiState.userID) window.scrollTo(0, 0)
    if (state.roomID !== undefined && state.roomID !== uiState.roomID) window.scrollTo(0, 0)
    if (state.tabIndex !== undefined && state.tabIndex !== uiState.tabIndex) window.scrollTo(0, 0)
  }

  return (
    <UIStateContext.Provider value={uiState}>
      <UpdateUIStateContext.Provider value={updateUiState}>{children}</UpdateUIStateContext.Provider>
    </UIStateContext.Provider>
  )
}
