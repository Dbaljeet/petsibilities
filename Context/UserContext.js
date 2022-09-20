const { createContext, useState, useContext } = require('react')
const UserContext = createContext()
export function UserProvider({ children }) {
  const [jwt, setJwt] = useState(true)
  //useState(()=>window.sessionStorage.getItem("jwt"))
  return (
    <UserContext.Provider value={{ jwt, setJwt }}>
      {children}
    </UserContext.Provider>
  )
}
export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('User must be used within a UserProvider')
  }
  return context
}
