import io from 'socket.io-client'
import React, { useContext, createContext, useEffect, useState } from 'react'

const SocketContext = createContext()

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
    })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}