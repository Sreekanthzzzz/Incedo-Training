import React, { useState, useEffect } from 'react';
import { Grid, TableContainer, Typography,Paper, Table, TableHead, TableBody, TableCell, TextField, TableRow, Button, TableSortLabel, TablePagination} from '@mui/material';
import $ from 'jquery';
import {Navigate, useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Sidebar from './sidebar';
import './AdminSidebar.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function AdminDashboard2() {

    const location = useLocation();
    const [valueToOrderBy,setValueToOrderBy] = useState("");
    const [orderDirection,setOrderDirection] = useState("asc");
    const [page,setPage] = useState(0);
    const userRole = JSON.parse(localStorage.getItem("user")).role; 
    const [data,setUsers] = useState([]);
    const [dataStore,setUserStore] = useState([]);
    const dashBtnStyling = {
        color:"#000",
        backgroundColor: '#E8AA42',
        borderColor: '#E8AA42',
        '&:hover': {
            backgroundColor: '#c9943a',
            borderColor: '#c9943a',
            boxShadow: 'none',
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
        
    const update=(index,user)=> {
        if($("#"+index+" #status").val() === "Requested")
            alert("Status of an user cannot be set to requested")
        
        else {
            user.role = $("#"+index+" #role").val();
            user.status =  $("#"+index+" #status").val();
            
            let oldData = [...data];
            oldData[index] = user
            setUsers(oldData);

            fetch("http://localhost:8080/user/update",
            {
                method:"PUT",
                headers:new Headers(
                {   
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }),
                body:JSON.stringify(user)
        
            }).then((e)=> {
                    console.log(e)
            })
            .catch(function (error) {console.log(error);});
        }
    }

    const createSortHandler = (property) => (event) => {
        const isAscending = (valueToOrderBy === property && orderDirection === "asc");
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? "desc" : "asc");
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy])
            return -1;
        
        if (b[orderBy] > a[orderBy])
            return 1;
        return 0;
    } 

    const getComparator = (order, orderBy) => { 
        return order === "desc" ? (a,b) => descendingComparator(a,b,orderBy) : (a,b) => -descendingComparator(a,b,orderBy)
    }

    const sortedData = (arr, comparator) => {
        const stabilizedArray = arr.map((el,index) => [el,index]);
        stabilizedArray.sort((a,b) => {
            const order = comparator(a[0],b[0])
            if(order !==0) 
                return order
            return a[1] - b[1];
        });
        return stabilizedArray.map((el) => el[0]);
    }

    const filterRecords = (value) => {
        if(value !== "All" && dataStore.length > 0)
        {
            var dummy = dataStore.filter(obj => {return obj.status === value})
            setUsers([...dummy]);
        }

        else {
            setUsers([...dataStore]);
        }
    }

    useEffect(() => {
        fetch('http://localhost:8080/user/get')
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
            setUserStore(data);
        })
        .catch(error => console.log(error));
    },[]);

    const BtnRenderer = (props) => {
        let status = data[props.index].status;
        if(status === "Requested")
            return (
                <div>
                    <Button id="confirmBtn" variant="contained" sx={{backgroundColor:"green",minWidth:10,height:35}} onClick = {()=>update(props.index,data[props.index])}>Save</Button> &ensp;
                </div>
            )

        else
            return (
                <div>
                    <Button id="editBtn" variant="contained" sx={{backgroundColor:"blue",minWidth:10,height:35}} onClick={() => {
                        let oldData = dataStore;
                        oldData[props.index].status = "Requested";
                        setUserStore([...oldData]);
                    }}><EditIcon/></Button>
                </div>
            );
    }

    if(location.state)
    {
        return (
            <div className="wrapper" style={{position:'absolute', top:0, left:0, height:"100vh", width:"100vw"}}>
                <Sidebar role={userRole}/>
                
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" style={{backgroundColor:"#FFF",padding:10, fontWeight:"bold"}}>
                            User Management
                            <img style= {{position:"absolute", right:"1cm",top:"0.7cm"}} src={require('./logo_incedo.png')} width={75} height={15} alt="incedo-logo"/>
                        </Typography>
                    </Grid>
                </Grid>
                
                <div className='whiteboard' style={{position:"relative", top:"5vh", width:"80vw"}}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={8}>
                            <Link to="/adminadduser" state={{}}><Button variant="contained" style={{"color":"black", alignItems:"center"}} sx={dashBtnStyling}><AddIcon/>Add User</Button></Link>
                        </Grid>

                        <Grid item xs={3} textAlign={"right"}>
                            <div style={{display:"flex", alignItems:"center", float:'right',margin:"auto", height:40, color:'#FBFCF8'}}>
                                Filter records :&ensp;
                                <select className="dropdown-styled" id="filter" name ="filter" onChange={(e) => filterRecords(e.target.value)}>
                                    <option value="" disabled>Filter by status</option>
                                    <option value="All">All</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Requested">Requested</option>
                                </select>
                            </div>
                        </Grid>
                    
                        <Grid item xs={11} my={1}>
                            <TableContainer component={Paper} sx={{maxHeight:400}}>
                                <Table sx={{height:"max-content"}}>
                                    <TableHead sx={{textAlign:"center",backgroundColor:"#6495ED"}}>
                                        <TableRow sx={{"& th":{fontSize: "1.25rem",fontWeight:"bold", textAlign:"center"}}}>
                                            <TableCell key="userId">
                                                <TableSortLabel
                                                    active = {valueToOrderBy === "userId"}
                                                    direction = {valueToOrderBy === "userId" ? orderDirection : "asc"}
                                                    onClick={createSortHandler("userId")}
                                                >
                                                    User ID
                                                </TableSortLabel>
                                            </TableCell>    
                                            <TableCell key="name">
                                                <TableSortLabel
                                                    active = {valueToOrderBy === "name"}
                                                    direction = {valueToOrderBy === "name" ? orderDirection : "asc"}
                                                    onClick={createSortHandler("name")}
                                                >
                                                    Name
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell name="role">
                                                <TableSortLabel
                                                    active = {valueToOrderBy === "role"}
                                                    direction = {valueToOrderBy === "role" ? orderDirection : "asc"}
                                                    onClick={createSortHandler("role")}
                                                >
                                                    Role
                                                </TableSortLabel>
                                            </TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { 
                                            sortedData(data,getComparator(orderDirection,valueToOrderBy))
                                            .slice(page * 5, page * 5 + 5)
                                            .map((item, i) => (
                                            <TableRow id={page * 5 + i} key={i} sx={{"& td":{fontSize: "1.10rem", textAlign:"center"}}}>
                                                <TableCell>{item.userId}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>
                                                    <select name='role'id='role' defaultValue={item.role} disabled={item.status==="Requested"?false:true}>
                                                        <option value="Lead">Lead</option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Developer">Developer</option>
                                                    </select>  
                                                </TableCell>
                                                <TableCell>
                                                    <select name='role' id='status' defaultValue={item.status} disabled={item.status==="Requested"?false:true}>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Requested">Requested</option>
                                                    </select>    
                                                </TableCell>
                                                <TableCell><BtnRenderer index={page * 5 + i}/></TableCell> 
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPage = {5}
                                rowsPerPageOptions = {[5]}
                                component = "div"
                                page = {page}
                                count = {data.length}
                                onPageChange = {handleChangePage}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    else
        return(<Navigate to={'/profile'} replace={true}/>);   
}
export default AdminDashboard2;