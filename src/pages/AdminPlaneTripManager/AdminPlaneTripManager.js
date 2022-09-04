import React,{useEffect, useContext} from "react"
import {Box, Grid, Button} from "@mui/material"
import {PlaneContext} from "../../contexts/PlaneContext"
import {TripContext} from "../../contexts/TripContext"
import { Plane, Trip } from "../../classes"
import PlaneComponent from "../../components/PlaneComponent"
import CreateAirplaneFormDialog from "../../components/CreateAirplaneFormDialog/CreateAirplaneFormDialog"
import AddIcon from '@mui/icons-material/Add';
export default function AdminPlaneTripManager(){
    const {planes, setPlanes}=useContext(PlaneContext)
    const {trips, setTrips}=useContext(TripContext)

    const getData=()=>{
        Plane.apiGetAll((data)=>{setPlanes(data)})
        Trip.apiGetAll((data)=>{setTrips(data)})
    }


    useEffect(()=>{
        if(planes == null || trips == null){
            getData()
            // Plane.apiGetAll(data=>setPlanes(data))
            // Trip.apiGetAll(data=>{setTrips(data)})
        }
    },[])
    
    return(
        <Grid container component={Box}
            className="flex-center"
            sx={{
                width:"100%",
                minHeight:"calc( 100vh - 50px )",
            }}
        >
            <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
                <Box
                    sx={{
                        width:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"flex-end"
                    }}
                >
                    <CreateAirplaneFormDialog onUpdate={()=>{getData()}}>
                        <Button variant="outlined" endIcon={<AddIcon/>} sx={{mb:"10px"}}>ساخت هواپیما</Button>
                    </CreateAirplaneFormDialog>
                </Box>
                {planes ? planes.map((plane, index)=><PlaneComponent 
                    airplane={plane} 
                    key={index}
                    tickets={Array.isArray(trips) ? trips.filter(t=>t.airplaneId == plane.id):[]}
                    />) : null}
            </Grid>

        </Grid>
    )
}