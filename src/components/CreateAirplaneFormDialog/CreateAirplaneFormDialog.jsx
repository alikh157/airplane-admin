import {useState, useEffect} from 'react'
import {Box,Dialog,DialogContent,TextField,Button,Grid, DialogTitle} from '@mui/material'
import { useForm } from "react-hook-form";
import Plane from '../../classes/Plane';
export default function CreateAirplaneFormDialog({children,airplane= new Plane(), onUpdate=()=>{}}){


    const [open,setOpen] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleOpen=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
        onUpdate()
    }
    const onSubmit=(data)=>{
        const newPlane=new Plane(data)
        if(airplane.id == ""){
            newPlane.apipost(()=>{handleClose()})
        }
        else{
            newPlane.airplaneId=airplane.id
            newPlane.airlineImage=airplane.airplaneImageSrc
            console.log(newPlane)
            newPlane.apiUpdate(()=>{handleClose()})
        }
    }


    return(
        <>
            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
                <DialogTitle>
                    ساخت هواپیما
                </DialogTitle>
                <DialogContent sx={{
                    pt:'5px !important',
                    "& form":{
                        width:'100%'
                        // display:'flex',
                        // flexDirection:'column',
                        // alignItems:'center',
                        // justifyContent:'flex-start'
                    }
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={"نام خط هوایی"}
                                    inputProps={{...register("airplaneAirlineName", {required:true})}}
                                    error = {errors.airlineName?.type === 'required'}
                                    helperText={errors.airlineName?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={airplane.airlineName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={"نوع هواپیما"}
                                    inputProps={{...register("airplaneModel", {required:true})}}
                                    error = {errors.airplaneModel?.type === 'required'}
                                    helperText={errors.airplaneModel?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={airplane.model}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={"ظرفیت هواپیما"}
                                    inputProps={{...register("airplaneCapacity", {required:true}),type:"number"}}
                                    error = {errors.airplaneCapacity?.type === 'required'}
                                    helperText={errors.airplaneCapacity?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={airplane.capacity}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={"شماره پرواز"}
                                    inputProps={{...register("airplaneFlightNumber", {required:true})}}
                                    error = {errors.airplaneFlightNumber?.type === 'required'}
                                    helperText={errors.airplaneFlightNumber?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={airplane.flightNumber}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width:"100%"
                                    }}
                                    type="submit">ساخت هواپیما</Button>
                            </Grid>
                        </Grid>
                    </form>

                </DialogContent>
            </Dialog>
            <Box onClick={handleOpen}>
                {children}
            </Box>
        </>
    )
}