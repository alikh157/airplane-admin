import React from "react";
import {Box, Typography, useTheme} from "@mui/material"

export default function HeaderAdmin({header}){
    const theme=useTheme()


    return (
        <Box
            className="flex-center"
            sx={{
                width:'100%',
                height:'50px',
                background:theme.palette.primary.main,
                boxShadow:"0px 5px 5px rgba(0,0,0,0.1)"
            }}
        >
            <Typography fontSize={"24px"} color={"white"}>
                {
                    header ? 
                        header
                    :
                        "پنل مدیریت"
                }
            </Typography>
        </Box>        
    )
}