import React,{useState} from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Box} from "@mui/material";

export default function DeleteDialog({children, title, onAccept=()=>{}, onDeny=()=>{}}){
    const [open, setOpen]=useState(false)
    const handleOpen=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }
    return(
        <>
            <Dialog open={open}  onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogActions sx={{display:"flex", justifyContent:"space-between"}}>
                    <Button color="error" onClick={()=>{handleClose();onAccept()}}>بله</Button>
                    <Button color="primary" variant="contained" onClick={()=>{handleClose();onDeny()}}>خیر</Button>
                </DialogActions>
            </Dialog>
            <Box onClick={handleOpen}>
                {children}
            </Box>
        </>
    )
}