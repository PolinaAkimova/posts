import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {AuthContext} from "./context";
import AppRouter from "./router/AppRouter";
import {useHistory} from "react-router-dom";

function App() {
  const router = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem("auth") === "Polina") {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
