import React, { useEffect, useState } from 'react'
import { url } from '../Url'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ShowUsers from '../Components/ShowUsers'
import { Box, Button, IconButton, MenuItem, Pagination, Stack, TablePagination, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FormDialog from '../Components/FormDialog'

const HomePage = () => {

    const [verified, setVerified] = useState(true)
    const [loaded, setLoaded] = useState(true)
    const [users, setUsers] = useState([
        { name: "John Smith", email: " john.smith@example.com" ,        department: "Sales" , role:"Manager" },
        { name: "Emily Davis", email: "emily.davis@example.com" ,       department: "Sales", role: "Manager" },
        { name: "Michael Wilson", email: "michael.wilson@example.com" , department: "Sales", role: "Manager" },
        { name: "Olivia Brown",  email: "olivia.brown@example.com" ,    department: "Sales", role: "Manager" },
        { name: "Daniel Taylor", email: "daniel.taylor@example.com" ,   department: "Sales", role: "Manager" }, 
        
    ])
    const [search, setSearch] = useState("")
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const [sortType, setSortType] = useState("id")

    const handleChangePage = (event, newPage) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };


    const navigate = useNavigate()

    const sortOptions = [
        {
            value: 'id',
            label: 'ID',
        },
        {
            value: 'name',
            label: 'Name',
        },
        {
            value: 'town',
            label: 'Town',
        }
    ];

    const params = {
        search: search,
        pageSize: pageSize,
        pageNumber: pageNumber,
        sortType: sortType,
    };

    const verifyUser = () => {
        axios.post(url + "/verifyLoginToken", {}, {
            headers: {
                'userToken': localStorage.getItem("userToken")
            }
        }).then((result) => {
            if (result.ok) {
                setVerified(true)
                getUsers()
            } else {
                localStorage.setItem("userToken", "")
                localStorage.setItem("userId", null)
                localStorage.setItem("role", "")
                navigate("/")
            }
        }).catch((err) => {
            console.log(err)
            navigate("/")
        });
    }

    const getUsers = () => {
        axios.get(url + "/", { params })
            .then((response) => {
                setUsers(response.data)
                setLoaded(true)
            })
            .catch((err) => { console.log(err) })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(search, sortType, pageNumber)
        console.log(params)
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)

    }
    const handleSortChange = (event) => {
        setSortType(event.target.value)
        console.log(sortType)
    }


    useEffect(() => {
        // verifyUser()
    })

    if (!verified) {
        return (
            <div>User Is Not Verified</div>
        )
    } else if (!loaded) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <Box>
                <Stack  component="form" onSubmit={handleSubmit} direction="row" alignItems={'center'} justifyContent="flex-end" spacing={12}>
                    <div>
                        <TextField id="outlined-search" label="Ara" type="search" size='small' value={search} onChange={handleSearchChange} />
                        <IconButton type='submit'>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <TextField
                        id="sortBy"
                        select
                        defaultValue="id"
                        variant="outlined"
                        size='small'
                        value={sortType}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormDialog/>
                </Stack>

                <ShowUsers users={users} />


                <Box display={'flex'} justifyContent={'center'}>
                    <TablePagination
                        component="div"
                        count={100}
                        page={pageNumber}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageSize}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>

            </Box>
        )
    }
}

export default HomePage