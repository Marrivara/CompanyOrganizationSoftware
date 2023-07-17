import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, MenuItem } from '@mui/material';
import { url } from '../Url';
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import { LanguageContext } from '../Pages/Pages';



export default function FormDialog({ isEdit, user }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(isEdit ? user.name : "");
    const [surname, setSurname] = useState(isEdit ? user.surname : "");
    const [email, setEmail] = useState(isEdit ? user.email : "");

    const [role, setRole] = useState(isEdit ? user.role : "");
    const [roles, setRoles] = useState([]);

    const [company, setCompany] = useState(isEdit ? user.company : "");
    const [companies, setCompanies] = useState([]);

    const [department, setDepartment] = useState(isEdit ? user.department : "");
    const [departments, setDepartments] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        getCompaniesAndRoles()
    };


    const getCompaniesAndRoles = async () => {
        try {
            const response = await axios.get(url + '/users/create');
            setCompanies(response.data.companies);
            setRoles(response.data.roles);
        } catch (error) {
            console.error('Error while getting companies and roles:', error);
        }
    };

    const getDepartments = async () => {
        try {
            const response = await axios.get(url + '/users/departments/' + company.id);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error while getting departments:', error);
        }
    };

    const language = React.useContext(LanguageContext)

    const createUser = async() =>{
            try {
                const response = await axios.post(url + "/users/create", {
                    name: name,
                    surname: surname,
                    email: email,
                    role: role.id,
                    department: department.id
                });
            } catch (error) {
                console.error(error)
            }
    }
    const updateUser = async() =>{
        try {
            const response = await axios.put(url + "/users/"+ user.id, {
                name: name,
                surname: surname,
                email: email,
                role: role.id,
                department: department.id
            });
        } catch (error) {
            console.error(error)
        }
}

    const handleSubmit = () => {
        if(isEdit){
            updateUser()
        }else{
            createUser()
        }
        setOpen(false);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
        getDepartments()
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const editButtonStyle = {
        backgroundColor: '#3f51b5',
        color: '#fff',
    };

    return (
        <div>
            {isEdit ? 
            <IconButton onClick={handleClickOpen} style={editButtonStyle}>
                <Edit />
            </IconButton> :
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>{language.formDialog.add}</Button>
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? language.formDialog.editUser : language.formDialog.addUser}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isEdit ? language.formDialog.editUserDetail : language.formDialog.addUserDetail}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        defaultValue={name}
                        margin="dense"
                        id="name"
                        label={language.formDialog.name}

                        fullWidth
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="surname"
                        label="Surname"
                        type="surname"
                        fullWidth
                        variant="standard"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label={language.formDialog.email}
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="role"
                        margin="dense"
                        select
                        label="role"
                        fullWidth
                        variant="outlined"
                        size='small'
                        value={role.id}
                        onChange={handleRoleChange}
                    >
                        {roles.map((role, key) => (
                            <MenuItem key={key} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="company"
                        margin="dense"
                        select
                        label="Company"
                        fullWidth
                        variant="outlined"
                        size='small'
                        value={company.id}
                        onChange={handleCompanyChange}
                    >
                        {companies.map((company, key) => (
                            <MenuItem key={key} value={company.id}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="department"
                        margin="dense"
                        select
                        label={language.formDialog.department}
                        fullWidth
                        variant="outlined"
                        size='small'
                        value={department.id}
                        onChange={handleDepartmentChange}
                    >
                        {departments.map((department, key) => (
                            <MenuItem key={key} value={department.id}>
                                {department.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{language.formDialog.cancel}</Button>
                    <Button onClick={handleSubmit}>{language.formDialog.submit}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}