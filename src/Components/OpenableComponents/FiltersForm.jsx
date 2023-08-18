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
import FilterListIcon from '@mui/icons-material/FilterList';




export default function FiltersForm({ onUsersChange, setSnackbarState,companyFromParent,departmentFromParent, setFilters }) {
    
    const language = React.useContext(LanguageContext)
    
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false)

    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);

    const [department, setDepartment] = useState("");
    const [departments, setDepartments] = useState([]);

    const { handleSubmit, control } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
        getCompaniesAndRoles()
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

    const clearAllFilters = async () => {
        setFilters({company:null,department:null})
        onUsersChange()
        setOpen(false)
    }

    const onSubmit = (data) => {
        
        setFilters({company:company,department:department})
        onUsersChange()
        setOpen(false);
        
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
            
                <IconButton onClick={handleClickOpen} style={editButtonStyle}>
                    <FilterListIcon/>
                </IconButton>
                
            
            <Box component={'form'}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                        
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
                        <Button onClick={clearAllFilters}>Clear Filters</Button>
                        <Button onClick={handleSubmit(onSubmit)}>{language.formDialog.submit}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}