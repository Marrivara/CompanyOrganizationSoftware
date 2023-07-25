import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { url } from '../Url';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import FormDialog from './FormDialog';

const columns = [
    { id: 'name', label: 'Name', minWidth: 130 },
    { id: 'surname', label: 'Surname', minWidth: 130 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
    },
    {
        id: 'department',
        label: 'Department',
        type: 'nested',
        minWidth: 150,
    },
    {
        id: 'role',
        label: 'Role',
        type: 'nested',
        minWidth: 50,
    },
    {
        id: "buttons",
        label: "",
        type: "buttons",
        minWidth: 80
    }


];

const users = [
    { name: "System", surname: "Administrator", email: "admin@delta.smart", department: { id: 1, name: "Genel Müdürlük" }, role: { id: 1, name: "Admin" }, company: { id: 1, name: "Delta Akıllı Teknolojiler" } },
    { name: "Tolgahan", surname: "Oysal", email: "tolgahan.oysal@deltasmart.tech", department: { id: 1, name: "Genel Müdürlük" }, role: { id: 2, name: "Manager" }, company: { id: 1, name: "Delta Akıllı Teknolojiler" } }
];

const deleteUser = () => {
    axios.delete(url + "/users/")
        .then((response) => {
            if(response.ok){
                //onDeleteUser()
            }
        })
        .catch((err) => { console.log(err) })
    
}

const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: '#fff',
    marginRight: '8px',
};

export default function StickyHeadTable() {

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.type == 'nested'
                                                        ? value.name
                                                        : value}
                                                    {column.type == 'buttons' ? <>
                                                    <IconButton onClick={deleteUser} style={deleteButtonStyle}>
                                                        <Delete />
                                                    </IconButton>
                                                    <FormDialog isEdit={true} user={row} />
                                                    </>:<></>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}