import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import FormDialog from '../OpenableComponents/FormDialog';
import DeleteAlert from '../OpenableComponents/DeleteAlert';
import { url } from '../../Resources/Url';
import axios from 'axios';
import { LanguageContext } from '../../Pages/Pages';





export default function DataTable({ users, onUsersChange, setSnackbarState }) {

  const language = React.useContext(LanguageContext)

  function ButtonCell(params) {
    return (
      <Box display={'flex'} flexDirection={'row'}>
        <IconButton onClick={({ }) => { openDeleteAlert(params.row.id) }} style={deleteButtonStyle}>
          <Delete />
        </IconButton>
        <FormDialog isEdit={true} user={params.row} onUsersChange={onUsersChange} setSnackbarState={setSnackbarState} />
      </Box>
    );
  }
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

  const definedColumns = [
    {
      field: 'id',
      headerName: 'ID',
      maxWidth: 70
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 130
    },
    {
      field: 'surname',
      headerName: 'Surname',
      width: 130
    },
    {
      field: 'email',
      headerName: 'Email',

      width: 200,
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 200,
      valueGetter: (params) =>
        `${params.row.company.name}`,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
      valueGetter: (params) =>
        `${params.row.department.name}`,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 90,
      valueGetter: (params) =>
        `${params.row.role.name}`,
    },
    {
      field: 'buttons',
      headerName: '',
      type: "Buttons",
      sortable: false,
      width: 160,
      renderCell: ButtonCell,
    },
  ];

  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role") == "Admin");

  const columns = isAdmin
    ? definedColumns
    : definedColumns.filter(column => column.field !== 'id' && column.field !== 'buttons');



  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        autoPageSize
        disableColumnMenu
        hideFooter
        disableRowSelectionOnClick
        rows={users}
        columns={columns}
      />
      <DeleteAlert open={deleteAlertOpen} handleClose={handleDeleteAlertClose} />
    </div>
  );
}