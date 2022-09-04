import {useState, useEffect} from 'react';
import {Box,Dialog,DialogContent,TextField,Button,Grid, DialogTitle, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText}
    from '@mui/material';
import { useForm } from "react-hook-form";

import Trip from "../../classes/Trip";
import Plane from "../../classes/Plane";

export default function CreateTripFormDialog({children,airplane,trip = new Trip(), onClose=()=>{}}){
    const [open,setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOpen=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
        onClose()
    }
    const onSubmit=(data)=>{
        const resTrip=new Trip(data)
        if(trip.id == ""){
            resTrip.airplaneId=airplane.id
            resTrip.apipost(()=>{handleClose()})
        }
        else{
            resTrip.id=trip.id
            resTrip.airplaneId=airplane.id
            console.log("resTrip",resTrip)
            resTrip.apiUpdate(()=>{handleClose()})
        }
    }
    return(
        <>
            <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
                <DialogTitle>
                    {`ساخت بلیط- ${airplane.airlineName}-${airplane.flightNumber}`}
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
                        <Grid container spacing={2}
                            // sx={{
                            //     "& "
                            // }}
                        >
                            <Grid item xs={12}>
                                <Typography>هواپیمایی {airplane.airlineName}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={"شماره سفر"}
                                    inputProps={{...register("tripNumber", {required:true})}}
                                    error = {errors.tripNumber?.type === 'required'}
                                    helperText={errors.tripNumber?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.number}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>مبدا</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label={"شهر مبدا"}
                                    inputProps={{...register("tripSrc", {required:true})}}
                                    error = {errors.airlineName?.type === 'required'}
                                    helperText={errors.airlineName?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.src}

                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label={"زمان حرکت"}
                                    InputLabelProps={{shrink:true}}
                                    inputProps={{...register("tripSrcTime", {required:true}),type:"date"}}
                                    error = {errors.tripSrcTime?.type === 'required'}
                                    helperText={errors.tripSrcTime?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.srcTime}

                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={4}>*/}
                            {/*    <TextField*/}
                            {/*        fullWidth*/}
                            {/*        label={"فرودگاه مبدا"}*/}
                            {/*        inputProps={{...register("tripSrcAirport", {required:true})}}*/}
                            {/*        error = {errors.tripSrcAirport?.type === 'required'}*/}
                            {/*        helperText={errors.tripSrcAirport?.type === 'required' && "این فیلد ضروری است"}*/}
                            {/*        defaultValue={trip.srcAirport}*/}

                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <Typography>مقصد</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label={"شهر مقصد"}
                                    inputProps={{...register("tripDst", {required:true})}}
                                    error = {errors.tripDst?.type === 'required'}
                                    helperText={errors.tripDst?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.dst}

                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{shrink:true}}
                                    label={"زمان رسیدن"}
                                    inputProps={{...register("tripDstTime", {required:true}),type:"date"}}
                                    error = {errors.tripDstTime?.type === 'required'}
                                    helperText={errors.tripDstTime?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.dstTime}
                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={4}>*/}
                            {/*    <TextField*/}
                            {/*        fullWidth*/}
                            {/*        label={"فرودگاه مقصد"}*/}
                            {/*        inputProps={{...register("tripDstAirport", {required:true})}}*/}
                            {/*        error = {errors.tripDstAirport?.type === 'required'}*/}
                            {/*        helperText={errors.tripDstAirport?.type === 'required' && "این فیلد ضروری است"}*/}
                            {/*        defaultValue={trip.dstAirport}*/}

                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={"قیمت بلیط"}
                                    inputProps={{...register("tripPrice", {required:true}),type:"number"}}
                                    error = {errors.tripPrice?.type === 'required'}
                                    helperText={errors.tripPrice?.type === 'required' && "این فیلد ضروری است"}
                                    defaultValue={trip.price}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel >نوع بلیط</InputLabel>
                                    <Select
                                        fullWidth
                                        label={"نوع بلیط"}
                                        inputProps={{...register("tripClass", {required:true})}}
                                        error = {errors.tripClass?.type === 'required'}
                                        // helperText={errors.tripClass?.type === 'required' && "این فیلد ضروری است"}
                                        defaultValue={trip.class}

                                    >
                                        <MenuItem value={"economy"}>Economy</MenuItem>
                                        <MenuItem value={"business"}>Business</MenuItem>
                                        <MenuItem value={"first class"}>First class</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.tripClass?.type === 'required' && "این فیلد ضروری است"}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant='contained'>ساخت سفر</Button>
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