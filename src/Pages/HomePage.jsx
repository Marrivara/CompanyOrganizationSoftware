import React, { useEffect, useState } from 'react'
import { url } from '../Url'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ShowUsers from '../Components/ShowUsers'
import { Box, Container, IconButton, MenuItem, Skeleton, Stack, TablePagination, TextField, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FormDialog from '../Components/FormDialog'
import { LanguageContext } from './Pages'
import ChangeLanguageButton from '../Components/ChangeLanguageButton'
import TopBar from '../Components/TopBar'

const HomePage = ({ changeLanguage }) => {

    const [verified, setVerified] = useState(true)
    const [loaded, setLoaded] = useState(true)
    const [users, setUsers] = useState([
        {name:"System" , surname:"Administrator", email:"admin@delta.smart", department:{id:1, name:"Genel Müdürlük"}, role:{id:1, name:"Admin"}, company:{id:1, name:"Delta Akıllı Teknolojiler"}},
        {name:"Tolgahan" , surname:"Oysal", email:"tolgahan.oysal@deltasmart.tech", department:{id:1, name:"Genel Müdürlük"}, role:{id:2, name:"Manager"}, company:{id:1, name:"Delta Akıllı Teknolojiler"}}

    ])
    const [length, setLength] = useState(0)
    const [search, setSearch] = useState("")
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const [sortType, setSortType] = useState(['id', 'asc']);

    const language = React.useContext(LanguageContext);

    /*useEffect(() => {
        verifyUser()
    })*/

    const handleChangePage = (event, newPage) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    /*useEffect(() => {
        if (verified) {
            getUsers()
        }

    }, [sortType])*/

    const navigate = useNavigate()

    const sortField = [
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
    const sortOrder = [
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
        keyword: search,
        pageSize: pageSize,
        pageNumber: pageNumber,
        sort: sortType,
    };

    const verifyUser = () => {
        axios.post(url + "/verifyLoginToken", {}, {
            headers: {
                'Authorization': localStorage.getItem("userToken")
            }
        }).then((result) => {
            if (result.status == "200") {
                setVerified(true)
                getUsers()
            } else {
                //localStorage.setItem("userToken", "")
                localStorage.setItem("userId", null)
                //localStorage.setItem("role", "")
                navigate("/")
            }
        }).catch((err) => {
            console.log(err)
            localStorage.setItem("userToken", "")
            localStorage.setItem("userId", null)
            //localStorage.setItem("role", "")
            navigate("/")
        });
    }

    const getUsers = () => {
        axios.get(url + "/users/all", { params })
            .then((response) => {
                setLength(response.data.length)
                setUsers(response.data.users)
                setLoaded(true)
            })
            .catch((err) => { console.log(err) })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getUsers()
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)

    }
    const handleSortFieldChange = (event) => {
        setSortType([event.target.value, sortType[1]])
    }
    const handleSortOrderChange = (event) => {
        setSortType([sortType[0], event.target.value])

    }



    const load = () => {
        setLoaded(!loaded)
    }

    if (!verified) {
        return (
            <div>User Is Not Verified</div>
        )
    } else {
        return (<>
            <TopBar changeLanguage={changeLanguage} />
            <Container maxWidth='lg'>
                

                <Stack component="form" onSubmit={handleSubmit} direction="row" alignItems={'center'} justifyContent="flex-end" spacing={12}>
                    <div>
                        <TextField id="outlined-search" label={language.homePage.search} type="search" size='small' value={search} onChange={handleSearchChange} />
                        <IconButton type='submit'>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <TextField
                        id="sortByField"
                        select
                        defaultValue="id"
                        variant="outlined"
                        size='small'
                        value={sortField.label}
                        onChange={handleSortFieldChange}
                    >
                        {sortField.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="sortByOrder"
                        select
                        defaultValue="asc"
                        variant="outlined"
                        size='small'
                        value={sortOrder.label}
                        onChange={handleSortOrderChange}
                    >
                        {sortOrder.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {localStorage.getItem("role")==="1" ? <FormDialog isEdit={false} /> : <></>}

                </Stack>

                {loaded ? (
                    <>
                        <ShowUsers users={users} onDelete={getUsers} />
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
                            <Skeleton maxWidth='lg' height={100} animation="wave" />
                            <Skeleton maxWidth='lg' height={90} animation="wave" style={{ marginBottom: '4px' }} />
                            <Skeleton maxWidth='lg' height={80} animation="wave" style={{ marginBottom: '4px' }} />
                            <Skeleton maxWidth='lg' height={70} animation="wave" />
                        </>
                    </Container>
                )
                }



            </Container>
        </>
        )
    }
}

export default HomePage