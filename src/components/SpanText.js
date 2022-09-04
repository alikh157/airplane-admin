import { Box, Stack } from "@mui/material"
export default function SpanText({children, sx={}}){
    return(
        <Stack direction={"row"} sx={{width:"100%" ,...sx}} alignItems="center" gap="2px">
            <>{children[0]}</>
            <div className="spantext-mid" 
                style={{
                    flex:"1",
                    border:"1px solid black",
                    borderRadius:"5px",
                    height:"0",
                    opacity:'0.5',
                    position:"relative",
                    "&:before":{
                        content: '""',
                        display: "block",
                        border:"5px solid red",
                        position:"absolute",
                        left:0,
                        top:50
                    }
                }}
            ></div>
            <>{children[1]}</>
        </Stack>
    )
}