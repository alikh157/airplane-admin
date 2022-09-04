import { createContext, useState } from "react";

export const TripContext = createContext()

export const TripContextProvider = ({children})=>{
    const [trips,setTrips] = useState(null)

    return (
        <TripContext.Provider value={{trips,setTrips}}>
            {children}
        </TripContext.Provider>
    )
}