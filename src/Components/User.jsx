import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'

const User = ({ user }) => {

    const userBoxStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: '16px',
        borderRadius: '4px',
        marginBottom: '16px',
    };

    const userInfoStyle = {
        flex: 1,
        marginRight: '16px',
    };

    const userNameStyle = {
        fontSize: '1.25rem',
        marginBottom: '8px',
    };

    const userDetailsStyle = {
        marginBottom: '4px',
    };

    const actionButtonsStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const deleteButtonStyle = {
        backgroundColor: '#f44336',
        color: '#fff',
        marginRight: '8px',
    };

    const editButtonStyle = {
        backgroundColor: '#3f51b5',
        color: '#fff',
    };

    const [disabled, setDisabled] = useState(user.role==='manager' ? true : false)

    return (
        <div>
            <Box style={userBoxStyle}>
                <Box style={userInfoStyle}>
                    <Typography style={userNameStyle} variant="h6">
                        {user.name}
                    </Typography>
                    <Typography style={userDetailsStyle}>
                        Email: {user.email}
                    </Typography>
                    <Typography style={userDetailsStyle}>Department: {user.department}</Typography>
                    <Typography style={userDetailsStyle}>Role: {user.role}</Typography>
                </Box>
                <Box style={actionButtonsStyle}>
                    <IconButton disabled={disabled} style={deleteButtonStyle}>
                        <Delete/>
                    </IconButton>
                    <IconButton style={editButtonStyle}>
                        <Edit />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}

export default User