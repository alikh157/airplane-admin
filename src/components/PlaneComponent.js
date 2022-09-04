import { useState, useContext } from "react";
import {Box, Typography, useTheme, Button, Stack, ButtonGroup, IconButton} from "@mui/material"
import {common, grey} from "@mui/material/colors"
import noImage from "./no-image.png"
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TripComponent from "./TripComponent";
import CreateTripFormDialog from "./CreateTripFormDialog/CreateTripFormDialog"
import {Trip, Plane} from "../classes"
import {PlaneContext} from "../contexts/PlaneContext"
import {TripContext} from "../contexts/TripContext"
import CreateAirplaneFormDialog from "../components/CreateAirplaneFormDialog/CreateAirplaneFormDialog"
import DeleteDialog from "../components/DeleteDialog"
import apiConf from "../apiConfig.json";
export default function PlaneComponent({airplane, tickets}){
    const [showTrips, setShowTrips] = useState(false)
    
    const {planes, setPlanes}=useContext(PlaneContext)
    const {trips, setTrips}=useContext(TripContext)

    const updateData=()=>{
        Plane.apiGetAll((data)=>{setPlanes(data)})
        Trip.apiGetAll((data)=>{setTrips(data)})
    }
    const handleDelete=()=>{
        airplane.apiDelete(()=>{updateData()})
    }
    


    const theme=useTheme()
    return(
        <Stack direction={"column"} alignItems="center" sx={{
        }}>

            <Box
                sx={{
                    position:"relative",
                    width:"100%",
                    display:"flex",
                    flexDirection:"row",
                    alignItems:'center',
                    justifyContent:"space-between",
                    background:grey[300],
                    padding:'5px 20px',
                    minHeight:"50px",
                    borderRadius:showTrips ? "10px 10px 0px 0px" : "10px",
                    ":first-of-type":{
                        marginTop:"0px"
                    },
                    marginBottom: "10px",
                    marginTop:showTrips ? "15px" : "10px",
                    transition:"all 100ms",
                }}
            >
                
                <Box>
                    <Stack direction={'row'} alignItems="center" justifyContent={"flex-start"} gap="10px">
                        <img src={apiConf.baseUrl+"/airplane/get/img?fileName="+airplane.airlineImage || noImage} width="40px" height="40px" style={{borderRadius:"10px", opacity:airplane.airlineImage ? "1":"0.3"}} alt={airplane.airlineName}/>
                        <Stack direction={"column"} alignItems="flex-start" justifyContent={"center"}
                            sx={{
                                "& .MuiTypography-root":{
                                    fontSize:'12px'
                                },
                            }}
                        >
                            <Typography fontWeight={"bold"}>{airplane.flightNumber}</Typography>
                            <Typography>{airplane.airlineName}</Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Stack direction={"column"} alignItems="center" gap="3px"
                    sx={{
                        position:"absolute",
                        top:"50%",
                        right:"50%",
                        transform:'translateX(50%) translateY(-50%)'
                    }}
                >
                    {airplane.model}
                    <Stack direction="row" sx={{fontSize:"14px"}} alignItems="center" gap="5px">
                        <AirlineSeatReclineNormalIcon sx={{fontSize:"18px", opacity:"0.9"}}/>
                        <Typography variant="a" fontSize={"inherit"}>{airplane.capacity}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column" alignItems={"flex-end"} gap="3px"
                    sx={{
                        "& .MuiButton-root":{
                            fontSize:'11px',
                            margin:'5px'
                        },
                    }}
                >
                    <ButtonGroup variant="outlined">
                        <CreateAirplaneFormDialog airplane={airplane} onUpdate={updateData}>
                            <Button endIcon={<EditIcon/>}>
                                تغییر
                            </Button>
                        </CreateAirplaneFormDialog>
                        <DeleteDialog title={`${airplane.flightNumber} پاک شود`} onAccept={handleDelete}>
                            <Button color="error" endIcon={<DeleteIcon/>}>
                                حذف
                            </Button>
                        </DeleteDialog>
                    </ButtonGroup>
                    <Stack direction={"row"} alignItems="center">
                        <CreateTripFormDialog airplane={airplane} onClose={updateData}>
                            <IconButton color={"success"} variant="outlined" size="small" style={{marginLeft:'20px'}}>
                                <AddIcon/>
                            </IconButton>
                        </CreateTripFormDialog>
                        <Button onClick={()=>{setShowTrips(!showTrips)}} variant="outlined" endIcon={showTrips ? <ExpandLessIcon/> : <ExpandMoreIcon/>}>
                            {`${tickets.length} بلیط`}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            {showTrips ?
                tickets.map((trip, index)=><TripComponent trip={trip} airplane={airplane} key={index}/>)
                :null
            }
        </Stack>
    )
}