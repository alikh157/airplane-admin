import { Stack,Box, Typography, Chip, IconButton } from "@mui/material"
import React from "react"
import {grey} from "@mui/material/colors"
import SpanText from "./SpanText"
import { Delete, Edit } from "@mui/icons-material"
import CreateTripFormDialog from "./CreateTripFormDialog/CreateTripFormDialog"
import DeleteDialog from "./DeleteDialog"
import {TripContext} from "../contexts/TripContext"
import {Trip} from '../classes'
export default function TripComponent({trip, airplane}){

    const {trips,setTrips} = React.useContext(TripContext)
    const handleDelete=()=>{
        trip.apiDelete(()=>{
            Trip.apiGetAll((res)=>{
                setTrips(res)
            })
        })
    }
    return(
        <Stack
            component={Box}
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
                padding:"5px",
                width:"100%",
                background:grey[100],
                position:"relative"
            }}
        >
            <Stack direction={"column"} alignItems="flex-start">
                <Typography>{trip.number}</Typography>
                <Typography>{trip.tripDate}</Typography>
                <Chip label={trip.class} color="primary"/>
            </Stack>
            <Stack 
                sx={{
                    minWidth: "30%",
                    position:"absolute",
                    top:"50%",
                    right:"50%",
                    transform:'translateX(50%) translateY(-50%)'
                }} direction="column" alignItems={"center"}>
                <SpanText>
                    <Typography>{trip.tripTakeOffTime}</Typography>
                    <Typography>{trip.tripLandingTime}</Typography>
                </SpanText>
                <SpanText>
                    <Typography>{trip.src}</Typography>
                    <Typography>{trip.dst}</Typography>
                </SpanText>
            </Stack>
            <Stack direction={"row"}>
                <CreateTripFormDialog airplane={airplane} trip={trip}>
                    <IconButton><Edit/></IconButton>
                </CreateTripFormDialog>
                <DeleteDialog title={`${trip.name} پاک شود؟`} onAccept={handleDelete}>
                    <IconButton><Delete/></IconButton>
                </DeleteDialog>
            </Stack>
        </Stack>
    )
}