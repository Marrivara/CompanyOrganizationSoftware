import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const StrengthBar = ({ strength }) => {

    const [text, setText] = useState("Very Weak");
    const [color, setColor] = useState("error");

    useEffect(() => {
        switch (strength) {
            case 0:
                setText("Not Valid")
                setColor("error")
                break;
            case 50:
                setText("Weak")
                setColor("warning")
                break;
            case 70:
                setText("Good")
                setColor("success")
                break;
            case 100:
                setText("Strong")
                setColor("success")
                break;
        }
    })

    return (
        <>
            <Box sx={{ width: '100%', mt: 0.5 }}>
                <LinearProgress color={color} variant="determinate" value={strength} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </Box>
        </>
    )
}

export default StrengthBar