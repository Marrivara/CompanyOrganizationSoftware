import React, { useEffect, useState } from 'react'
import { url } from '../../Resources/Url'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert, Box, Button, Container, IconButton, MenuItem, Skeleton, Snackbar, Stack, TablePagination, TextField, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FormDialog from '../../Components/OpenableComponents/FormDialog'
import { LanguageContext } from '../Pages'
import TopBar from '../../Components/TopBar/TopBar'
import StickyHeadTable from '../../Components/DataDisplay/StickyHeadTable'
import LocalStorageDelete from '../../Resources/LocalStorageFunctions'

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
    })

    useEffect(() => {
        getUsers()
    }, [sort, order, pageNumber, pageSize])


    const sortFields = [
        {
            value: 'name',
            label: 'Name',
        },
        {
            value: 'surname',
            label: 'Surname',
        },
        {
            value: 'department',
            label: 'Department',
        },
        {
            value: 'id',
            label: 'Date',
        },

    ];
    const sortOrders = [
        {
            value: 'asc',
            label: 'Ascendent',
        },
        {
            value: 'desc',
            label: 'Descendent',
        },
    ];

    const params = {
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: pageNumber,
        sort: sort,
        order: order

    };


    const getUsers = () => {
        axios.get(url + "/users/all?" + new URLSearchParams(params).toString(),
            {
                headers: {
                    'Authorization': localStorage.getItem("userToken")
                }
            })
            .then((response) => {
                setLength(response.data.data.totalElements)
                setUsers(response.data.data.content)
                setLoaded(true)

            })
            .catch((error) => {
                let message = ""
                if (error.response.status == 401) {
                    message = "Unauthorized"
                    LocalStorageDelete()
                    setSignedIn(false)
                } else if (error.response.status == 400) {
                    message = "Couldn't get the users!"
                } else {
                    message = "Server problem"
                    LocalStorageDelete()
                    setSignedIn(false)

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


            <Stack component="form" onSubmit={handleSubmit} direction="row" alignItems={'center'} justifyContent="flex-end" spacing={{ xs: 1, md: 5, lg: 12 }}>
                <Box display={"flex"}>
                    <TextField id="outlined-search" label={language.homePage.search} type="search" size='small' value={keyword} onChange={handleSearchChange} />
                    <IconButton type='submit'>
                        <SearchIcon />
                    </IconButton>
                </Box>
                <TextField
                    id="sortByField"
                    select
                    label={language.homePage.sortBy}
                    defaultValue="id"
                    variant="outlined"
                    size='small'
                    value={sortFields.label}
                    onChange={handleSortFieldChange}
                >
                    {sortFields.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="sortByOrder"
                    select
                    label={language.homePage.sortOrder}
                    defaultValue="asc"
                    variant="outlined"
                    size='small'
                    value={sortOrders.label}
                    onChange={handleSortOrderChange}
                >
                    {sortOrders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {localStorage.getItem("role") == "Admin" ? <FormDialog isEdit={false} onUsersChange={getUsers} /> : <></>}
            </Stack>

            {loaded ? (
                <>
                    <StickyHeadTable users={users} onUsersChange={getUsers} />
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
                                `${from}-${to}`
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


            {/*<Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                severity
                autoHideDuration={5000}
                open={snackbarOpen}
                onClose={handleClose}


            >
                <Alert severity={severity}>{snackbarMessage}</Alert>
            </Snackbar>*/}
        </Container>
    </>
    )
}

export default Users