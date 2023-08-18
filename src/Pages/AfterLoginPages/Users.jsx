import React, { useEffect, useState } from 'react'
import { url } from '../../Resources/Url'
import axios from 'axios'
import { Box, Container, IconButton, MenuItem, Skeleton, Stack, TablePagination, TextField, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FormDialog from '../../Components/OpenableComponents/FormDialog'
import { LanguageContext } from '../Pages'
import TopBar from '../../Components/TopBar/TopBar'
import StickyHeadTable from '../../Components/DataDisplay/StickyHeadTable'
import LocalStorageDelete from '../../Resources/LocalStorageFunctions'
import FilterListIcon from '@mui/icons-material/FilterList';
import FiltersForm from '../../Components/OpenableComponents/FiltersForm';
import DataTable from '../../Components/DataDisplay/DataTable';

const Users = ({ changeLanguage, setSignedIn, setSnackbarState }) => {



    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [length, setLength] = useState(0)
    const [keyword, setSearch] = useState("")
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const [sort, setSortField] = useState('id')
    const [order, setSortOrder] = useState('asc')

    const language = React.useContext(LanguageContext);

    const handleChangePage = (event, newPage) => {
        setPageNumber(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    useEffect(() => {
        setSnackbarState({
            snackbarOpen: false,
            snackbarMessage: "",
            severity: "error"
        })
    }, [])


    useEffect(() => {
        getUsers()
    }, [sort, order, pageNumber, pageSize])


    const [filters, setFilters] = useState({
        company: null,
        department: null,
    })
    useEffect(() =>{
        getUsers()
    }, [filters])

    const params = {
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: pageNumber,
        companyId: filters.company == null ? null : filters.company.id,
        departmentId: filters.department == null ? null : filters.department.id

    };

    const getUsers = () => {
        //Delete the null values from parameters
        let urlParams = new URLSearchParams(params);
        let keysForDel = [];
        urlParams.forEach((value, key) => {
            if (value == 'null') {
                keysForDel.push(key);
            }
        });
        keysForDel.forEach(key => {
            urlParams.delete(key);
        });

        axios.get(url + "/users/all?" + urlParams.toString(),
            {
                headers: {
                    'Authorization': localStorage.getItem("userToken"),
                    'Accept-Language': language.language,
                }
            })
            .then((response) => {
                setLength(response.data.data.totalElements)
                setUsers(response.data.data.content)
                setLoaded(true)

            })
            .catch((error) => {
                let message = ""
                console.log(error)
                switch (error.response.status) {
                    case 401:
                        message = language.snackbarMessages.unauthorized
                        LocalStorageDelete()
                        setSignedIn(false)
                        break;

                    case 400:
                        message = language.snackbarMessages.getUsersBadRequest
                        setLength(0)
                        setUsers([])
                        break;

                    case 404:
                        message = language.snackbarMessages.getUsersNotFound
                        setLength(0)
                        setUsers([])
                        break;

                    default:
                        message = language.snackbarMessages.serverProblem
                        LocalStorageDelete()
                        setSignedIn(false)
                        break;
                }
                setSnackbarState({
                    snackbarOpen: true,
                    snackbarMessage: message,
                    severity: "error"
                })

            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (keyword != "") {
            setPageNumber(0)
        }
        getUsers()
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }
    const handleSortFieldChange = (event) => {
        setSortField(event.target.value)
    }
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value)

    }

    return (<>
        <TopBar changeLanguage={changeLanguage} setSignedIn={setSignedIn} />
        <Container maxWidth='lg'>

            <Stack component="form" onSubmit={handleSubmit} direction="row" alignItems={'center'} justifyContent="space-between" marginBottom={1}>
                <FiltersForm onUsersChange={getUsers} setSnackbarState={setSnackbarState} company={filters.company} setFilters={setFilters} department={filters.department} />
                
                <Box display={'flex'} flexDirection={"row"} >
                    <TextField id="outlined-search" label={language.homePage.search} type="search" size='small' value={keyword} onChange={handleSearchChange} />
                    <IconButton type='submit'>
                        <SearchIcon />
                    </IconButton>
                    <FormDialog isEdit={false} onUsersChange={getUsers} setSnackbarState={setSnackbarState} />
                </Box>

                
            </Stack>

            {loaded ? (
                <>
                    <DataTable users={users} onUsersChange={getUsers} setSnackbarState={setSnackbarState}/>
                    {/*<StickyHeadTable users={users} onUsersChange={getUsers} setSnackbarState={setSnackbarState} />*/}
                    <Box display={'flex'} justifyContent={'center'}>
                        <TablePagination
                            component="div"
                            count={length}
                            page={pageNumber}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageSize}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={language.homePage.rowsPerPage}
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to}:${count}`
                            }

                        />
                    </Box>
                </>
            ) : (
                <Container maxWidth='lg' disableGutters
                    sx={{
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        marginTop: '20px',
                    }}>
                    <>
                        <Skeleton maxwidth='lg' height={100} animation="wave" />
                        <Skeleton maxwidth='lg' height={90} animation="wave" style={{ marginBottom: '4px' }} />
                        <Skeleton maxwidth='lg' height={80} animation="wave" style={{ marginBottom: '4px' }} />
                        <Skeleton maxwidth='lg' height={70} animation="wave" />
                    </>
                </Container>
            )
            }
        </Container>
    </>
    )
}

export default Users