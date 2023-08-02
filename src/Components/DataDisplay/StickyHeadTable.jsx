import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { url } from '../../Resources/Url';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import FormDialog from '../OpenableComponents/FormDialog';
import DeleteAlert from '../OpenableComponents/DeleteAlert';
import { useState } from 'react';
import { LanguageContext } from '../../Pages/Pages';




export default function StickyHeadTable({ users, onUsersChange, setSnackbarState }) {

    const language = React.useContext(LanguageContext);


    const columns = [
        { id: 'name', label: language.userAttributes.name , minWidth: 130 },
        { id: 'surname', label: language.userAttributes.surname, minWidth: 130 },
        {
            id: 'email',
            label: language.userAttributes.email,
            minWidth: 170,
        },
        {
            id: 'company',
            label: language.userAttributes.company,
            type: 'nested',
            minWidth: 50,
        },
        {
            id: 'department',
            label: language.userAttributes.department,
            type: 'nested',
            minWidth: 100,
        },
        {
            id: 'role',
            label: language.userAttributes.role,
            type: 'nested',
            minWidth: 50,
        },
        {
            id: "buttons",
            label: "",
            type: "buttons",
            minWidth: 0
        }
    
    
    ];

    const deleteButtonStyle = {
        backgroundColor: '#f44336',
        color: '#fff',
        marginRight: '8px',
    };

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)

    const [userIdToDelete, setUserIdToDelete] = useState()

    const openDeleteAlert = (userId) => {
        setDeleteAlertOpen(true)
        setUserIdToDelete(userId)
    }

    const handleDeleteAlertClose = (choice) => {
        setDeleteAlertOpen(false)
        if (choice) {
            deleteUser()
        }

    }

    const deleteUser = () => {
        axios.delete(url + "/users/" + userIdToDelete, {
            headers: {
                'Authorization': localStorage.getItem("userToken"),
                'Accept-Language': language.language
            }
        }).then((response) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.userDeleted,
                severity: "success"
            })
            onUsersChange()

        }).catch((error) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.deletedError,
                severity: "error"
            })
        })
    }

    const allowed = localStorage.getItem("role") == "Admin";

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
            <TableContainer sx={{ maxHeight: '70vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (

                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: '#F0F0F0' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.type == 'nested'
                                                        ? value.name
                                                        : value}
                                                    {column.type == 'buttons' & allowed ? <>
                                                        <Box display={'flex'} flexDirection={'row'}>
                                                            <IconButton onClick={({ }) => { openDeleteAlert(row.id) }} style={deleteButtonStyle}>
                                                                <Delete />
                                                            </IconButton>
                                                            <FormDialog isEdit={true} user={row} onUsersChange={onUsersChange} setSnackbarState={setSnackbarState} />
                                                        </Box>
                                                    </> : <></>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteAlert open={deleteAlertOpen} handleClose={handleDeleteAlertClose} />
        </Paper>
    );
}