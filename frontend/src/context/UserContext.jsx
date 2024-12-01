import { createContext, useContext } from "react"; 

const userContext = createContext();

export const userContextProvider = ({children})=>{
    return <userContext.Provider value={{user: "xyz"}}>{children}</userContext.Provider>
}

export const UserData = ()=>useContext(userContext)