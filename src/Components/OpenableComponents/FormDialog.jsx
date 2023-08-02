import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, MenuItem } from '@mui/material';
import { url } from '../../Resources/Url';
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import { LanguageContext } from '../../Pages/Pages';
import { useForm } from 'react-hook-form';
import EmailInput from '../InputFields/EmailInput';
import NormalInput from '../InputFields/NormalInput';



export default function FormDialog({ isEdit, user, onUsersChange, setSnackbarState }) {
    
    const language = React.useContext(LanguageContext)
    
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState(isEdit ? user.name : "");
    const [surname, setSurname] = useState(isEdit ? user.surname : "");
    const [email, setEmail] = useState(isEdit ? user.email : "");

    const [role, setRole] = useState(isEdit ? user.role : "");
    const [roles, setRoles] = useState([]);

    const [company, setCompany] = useState(isEdit ? user.company : "");
    const [companies, setCompanies] = useState([]);

    const [department, setDepartment] = useState(isEdit ? user.department : "");
    const [departments, setDepartments] = useState([]);

    const { handleSubmit, control } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
        getCompaniesAndRoles()
        if (isEdit) {
            getDepartments(user.company.id)
        }
        setLoaded(true)
    };


    useEffect(() => {
        if ((company != "")) {
            getDepartments(company.id)
        }


    }, [company])

    const getCompaniesAndRoles = async () => {
        await axios.get(url + '/users/roles-and-companies', {
            headers: {
                'Authorization': localStorage.getItem("userToken"),
                'Accept-Language': language.language
            }
        }).then((response) => {
            setCompanies(response.data.data.companies);
            setRoles(response.data.data.roles);
        }).catch((error) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.getRoleAndCompError,
                severity: "error"
            })
        });
    };

    const getDepartments = async (id) => {
        await axios.get(url + '/users/departments/' + id, {
            headers: {
                'Authorization': localStorage.getItem("userToken"),
                'Accept-Language': language.language
            }
        }).then((response) => {
            setDepartments(response.data.data);
        }).catch((error) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.getDepartmantsError,
                severity: "error"
            })
        });

    };

    const createUser = async (data) => {

        await axios.post(url + "/users/create", {
            name: data.name,
            surname: data.surname,
            email: data.email,
            roleId: role.id,
            departmentId: department.id,
            companyId: company.id
        }, {
            headers: {
                'Authorization': localStorage.getItem("userToken"),
                'Accept-Language': language.language
            }
        }).then((response) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.userAdded,
                severity: "success"
            })
            onUsersChange()
        }).catch((error) => {
            let message = ""
            if (error.response.status == 400) {
                message = language.snackbarMessages.emailExists
            } else {
                message = language.snackbarMessages.userAddError
            }
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: message,
                severity: "error"
            })
        })
    }

    const updateUser = async (data) => {

        await axios.put(url + "/users/" + user.id, {
            name: data.name,
            surname: data.surname,
            email: data.email,
            roleId: role.id,
            departmentId: department.id,
            companyId: company.id
        }, {
            headers: {
                'Authorization': localStorage.getItem("userToken"),
                'Accept-Language': language.language
            }
        }).then((response) => {
            onUsersChange()
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.userUpdated,
                severity: "success"
            })

        }).catch((error) => {
            setSnackbarState({
                snackbarOpen: true,
                snackbarMessage: language.snackbarMessages.updateUserError,
                severity: "error"
            })
        })
    }

    const onSubmit = (data) => {

        if (isEdit) {
            updateUser(data)
        } else {
            createUser(data)
        }
        setOpen(false);
    };

    const handleRoleChange = (event) => {
        const selectedRole = roles.find(x => x.id === event.target.value);
        setRole(selectedRole);
    };
    const handleCompanyChange = (event) => {
        const selectedCompany = companies.find(x => x.id === event.target.value);
        setCompany(selectedCompany);
    };
    const handleDepartmentChange = (event) => {
        const selectedDepartment = departments.find(x => x.id === event.target.value);
        setDepartment(selectedDepartment);
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
            <Box component={'form'}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{isEdit ? language.formDialog.editUser : language.formDialog.addUser}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {isEdit ? language.formDialog.editUserDetail : language.formDialog.addUserDetail}
                        </DialogContentText>
                        <NormalInput name={'name'} label={language.formDialog.name} control={control} defaultValue={name} variant={"standard"} />
                        <NormalInput name={'surname'} label={language.formDialog.surname} control={control} defaultValue={surname} variant={"standard"} />
                        <EmailInput control={control} language={language} defaultValue={email} variant={'standard'} />
                        <TextField
                            id="role"
                            margin="dense"
                            select
                            label={language.formDialog.role}
                            fullWidth
                            defaultValue={loaded ? role.id : ""}
                            variant="outlined"
                            size='small'
                            value={role.id}
                            onChange={handleRoleChange}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="company"
                            margin="dense"
                            select
                            label={language.formDialog.company}
                            defaultValue={loaded ? company.id : ""}
                            fullWidth
                            variant="outlined"
                            size='small'
                            value={company.id}
                            onChange={handleCompanyChange}
                        >
                            {companies.map((company) => (
                                <MenuItem key={company.id} value={company.id}>
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
                            defaultValue={loaded ? department.id : ""}
                            size='small'
                            value={department.id}
                            onChange={handleDepartmentChange}
                        >
                            {departments.map((department) => (
                                <MenuItem key={department.id} value={department.id}>
                                    {department.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{language.formDialog.cancel}</Button>
                        <Button onClick={handleSubmit(onSubmit)}>{language.formDialog.submit}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}