import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(image, name, symbol, currentPrice, highPrice, lowPrice) {
    return { image, name, symbol, currentPrice, highPrice, lowPrice };
}


function calculateRows(data) {
    return data.map(each => createData(each.image, each.name, each.symbol, each.current_price, each.high_24h, each.low_24h))
}

const columns = [
        {
            id: "image",
            label: "Image"
        },
        {
            id: "name",
            label: "Name"
        },
        {
            id: "symbol",
            label: "Symbol"
        },
        {
            id: "current_price",
            label: "Current Price"
        },
        {
            id: "high_24h",
            label: "High 24 hour Price"
        },
        {
            id: "low_24h",
            label: "Low 24 hour Price"
        }
    ]

const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 800
    },
    tableCell: {
        textAlign: "center",
        "& img" : {
            width: 25,
            height: 25
        }
    }
});

export default function CurrencyTable(props) {
    const classes = useStyles();
    const rows = calculateRows(props.data)
    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table className={classes.table} aria-label="currency table">
                <TableHead>
                    <TableRow>
                        {columns.map(each => {
                            return <TableCell className={classes.tableCell} id={each.id}>{each.label}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                <img src={row.image} alt={row.name}/>
                            </TableCell>
                            <TableCell className={classes.tableCell} align="right">{row.name}</TableCell>
                            <TableCell className={classes.tableCell} align="right">{row.symbol}</TableCell>
                            <TableCell className={classes.tableCell} align="right">{row.currentPrice}</TableCell>
                            <TableCell className={classes.tableCell} align="right">{row.highPrice}</TableCell>
                            <TableCell className={classes.tableCell} align="right">{row.lowPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
