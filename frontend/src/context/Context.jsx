import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AppContext = createContext()

export function ContextProvider(props) {
  const [user, setUser] = useLocalStorage('user', null)
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  )
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}

export default function useAppContext() {
  return useContext(AppContext)
}
