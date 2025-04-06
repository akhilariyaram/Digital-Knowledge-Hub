// Main.jsx

import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Login_main from "../../components/Login/Login_main";
import { AuthContextProvider, AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        {currentUser ? <Home /> : <Login_main />}
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
