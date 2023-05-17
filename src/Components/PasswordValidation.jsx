import { Box, Typography } from '@mui/material';
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const PasswordValidation = ({ validations }) => {
    const tick = '\u2713'; // Tick mark
    const cross = '\u2717'; // Cross mark

    return (
        <Box component="div" justifyContent={'normal'} display={'flex'} flexDirection={'column'} >
            {validations.map((validation, index) => (
                <Typography key={index} variant="body2"  display={'flex'} alignItems={'center'}>
                    {validation.isValid ? <DoneIcon color='success' fontSize='small'/> : <CloseIcon color='error' fontSize='small'/>}
                     {" "}<span>{validation.condition}</span>
                </Typography>
            ))}
        </Box>
    );
};

export default PasswordValidation;

