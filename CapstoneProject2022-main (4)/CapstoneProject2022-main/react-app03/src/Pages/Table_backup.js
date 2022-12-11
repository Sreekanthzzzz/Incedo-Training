import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    tableContainer:{
        margin: "0 auto",
        maxWidth: 950,
    },
    tableHeaderCell:{
        fontWeight:"bold",
        fontSize:12,
        backgroundColor:theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.info.dark)
    },
    tableCell:{
        fontSize:12,
    },
    tableTitle:{
        color:"#dddddd",
        fontWeight:"bold"
    }
}));

function TableSkeleton(props){
    const classes = useStyles();
    var rows = props.data;
    var colHeads = props.cols;
    return (
        <div>
            <TableContainer component={Paper} className={classes.tableContainer}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    {colHeads.map((colHead) => (
                        <TableCell align="center" className={classes.tableHeaderCell}>{colHead}</TableCell>    
                    ))}
                </TableRow>
                </TableHead>

                <TableBody>
                {
                    rows.map((row) => (
                    <TableRow>
                        {row.map((rowVal) => (
                            <TableCell component="th" scope="row" align="center" className={classes.tableCell}>
                                {rowVal}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}

export default TableSkeleton