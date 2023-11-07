import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AppContext = createContext()

export function ContextProvider(props) {
  const [user, setUser] = useLocalStorage('user', null)
  const [expense, setExpense] = useLocalStorage('expense', null)
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      expense,
      setExpense
    }),
    [user, setUser, expense, setExpense],
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
