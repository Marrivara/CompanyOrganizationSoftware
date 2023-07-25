import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { url } from '../Url';
import FormDialog from './FormDialog';
import { LanguageContext } from '../Pages/Pages';

const User = ({ user , onDeleteUser}) => {

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
    const language = React.useContext(LanguageContext);

    

    const deleteUser = () => {
        axios.delete(url + "/users/" + user.id)
            .then((response) => {
                if(response.ok){
                    onDeleteUser()
                }
            })
            .catch((err) => { console.log(err) })
        
    }

    const [allowed, setAllowed] = useState(localStorage.getItem("role")==="1" ? true : true)

    return (
        <div>
            <Box style={userBoxStyle}>
                <Box style={userInfoStyle}>
                    <Typography style={userNameStyle} variant="h6">
                        {user.name} {user.surname}
                    </Typography>
                    <Typography style={userDetailsStyle}>
                        {language.user.email} {user.email}
                    </Typography>
                    <Typography style={userDetailsStyle}>{language.user.department} {user.department.name}</Typography>
                    <Typography style={userDetailsStyle}>{language.user.role} {user.role.name}</Typography>
                </Box>
                {allowed && <Box style={actionButtonsStyle}>
                    <IconButton onClick={deleteUser} style={deleteButtonStyle}>
                        <Delete/>
                    </IconButton>
                    {/*<FormDialog isEdit={true} user={user}/>*/}
                </Box>}
            </Box>
        </div>
    )
}

export default User