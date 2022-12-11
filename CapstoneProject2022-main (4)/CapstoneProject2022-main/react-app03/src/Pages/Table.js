import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import {makeStyles} from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     tableContainer:{
//         margin: "0 auto",
//         maxWidth: 950,
//     },
//     tableHeaderCell:{
//         fontWeight:"bold",
//         fontSize:12,
//         backgroundColor:theme.palette.primary.dark,
//         color: theme.palette.getContrastText(theme.palette.info.dark)
//     },
//     tableCell:{
//         fontSize:12,
//     },
//     tableTitle:{
//         color:"#dddddd",
//         fontWeight:"bold"
//     }
// }));

function TableSkeleton(props){
    // const classes = useStyles();
    var rows = props.data;
    var colHeads = props.cols;
    return (
        <div>
            <h1>You have access to {props.dashboard} dashboard</h1>
        </div>
    );
}

export default TableSkeleton