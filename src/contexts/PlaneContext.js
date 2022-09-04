import { createContext, useState } from "react";

export const PlaneContext = createContext()

export const PlaneContextProvider = ({children})=>{
    const [planes,setPlanes] = useState(null)

    return (
        <PlaneContext.Provider value={{planes,setPlanes}}>
            {children}
        </PlaneContext.Provider>
    )
}