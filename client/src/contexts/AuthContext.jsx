import { getCurrentUserQuery } from "hooks/user";
import { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = () => {
    const accessToken = localStorage.getItem("access_token");
    return accessToken ? true : false;
  }

  const {data, isLoading} = useQuery(getCurrentUserQuery(), {
    enabled: isLoggedIn()
  })

  useEffect(() => {
    if (!isLoading) {
      setUser(data)
      setLoading(false)
    }

    if (typeof data !== 'object') {
      setUser(null)
      setLoading(false)
    }
  } , [data, isLoading])

  return (
    <AuthContext.Provider value={{ user, setUser, loading}}>
      {children}
    </AuthContext.Provider>
  )
}
