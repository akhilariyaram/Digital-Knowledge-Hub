import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Navbar from '../../../components/Navbar/Navbar'
import { AuthContextProvider, AuthContext } from "../context/AuthContext";
import { ChatContextProvider } from "../context/ChatContext";
const Home = () => {
  return (
    <>
      <Navbar/>
        <div className='home'>
          <div className="container">
            <AuthContextProvider>
              <ChatContextProvider>
                <Sidebar/>
                <Chat/>
            </ChatContextProvider>
            </AuthContextProvider>
        </div>
    </div>
    </>
  )
}

export default Home