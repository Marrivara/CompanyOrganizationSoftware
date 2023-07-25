import React from 'react'
import User from './User'
import { Box, Container } from '@mui/material'

const ShowUsers = ({ users , onDelete}) => {

    return (
        <Container maxWidth='lg' disableGutters
            sx={{
                maxHeight: '70vh',
                overflowY: 'auto',
                marginTop:'20px',
            }}>
            {users?.map((user) => (
                <User key={user.id} user={user} onDeleteUser={onDelete}></User>
            ))}
        </Container>
    )
}

export default ShowUsers