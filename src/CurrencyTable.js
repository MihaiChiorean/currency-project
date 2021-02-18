import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CurrencyDialog from './CurrencyDialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios').default;


//some styles
const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 800
    },
    tableBodyRow: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#d2ecfa"
        }
    },
    tableCell: {
        textAlign: "center",
        "& img" : {
            width: 25,
            height: 25
        }
    },
    spinner: {
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.54)",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9000
    }
});


// render table's columns
function renderHeaderColumn(column, classes) {
    return <TableCell className={classes.tableCell} id={column}>{columnLabels[column]}</TableCell>
}

// render table's rows
function renderBodyColumnForEachRow(column, currency, classes) {
    if(column === "image") {
        return (
            <TableCell id={`${currency.symbol}-${column}`} className={classes.tableCell} component="th" scope="row">
                <img id={`${currency.symbol}-${column}-img`} src={currency.image} alt={currency.name}/>
            </TableCell>
        )
    }
    return <TableCell className={classes.tableCell} id={`${currency.symbol}-${column}`}>{currency[column]}</TableCell>
}

// Table's columns are configurable.
// If you want to create a column for a specific key from the currency response object,
// just add that key to the "columns" array and a label specific for that key in the "columnLabels" object.
// Ex: for the "market_cap" key
//
//  columns = ["market_cap"];
//  columnLabels = {
//         market_cap: "Market Cap"
//     }


// columns to be displayed
const columns = ["image", "name", "symbol", "current_price", "high_24h", "low_24h"]

// columns title
const columnLabels = {
    image: "Image",
    name: "Name",
    symbol: "Symbol",
    current_price: "Current Price",
    high_24h: "High 24 hour Price",
    low_24h: "Low 24 hour Price 24 hour Price"
}

export default function CurrencyTable(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [currencyData, setCurrencyData] = useState({});
    const [loading, setLoading] = useState(false)

    // handle when the row was clicked
    const handleClickOpen = async (event) => {
        setLoading(true)
        let tr = event.target.closest('tr');
        if (!tr) return;
        try {
            await axios.get(`https://api.coingecko.com/api/v3/coins/${tr.id}`)
                .then((response) => {
                    if(response.status === 200) {
                        setCurrencyData(response.data)
                        setOpen(true)
                    }
                })
            setLoading(false)
        } catch(e) {
            console.warn(e);
            setLoading(false)
        }
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <TableContainer className={classes.table} component={Paper}>
                <Table className={classes.table} aria-label="currency table" onClick={(event) => handleClickOpen(event)}>
                    <TableHead>
                        <TableRow id="header-row">
                            {columns.map(column => renderHeaderColumn(column, classes))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.currencies.map((currency) => (
                            <TableRow key={currency.symbol} id={currency.id} className={classes.tableBodyRow}>
                                {columns.map(column => renderBodyColumnForEachRow(column, currency, classes))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CurrencyDialog clickToClose={handleCloseDialog} open={open} currencyData={currencyData}/>
            {loading ? (
                <div className={classes.spinner}>
                    <CircularProgress color="secondary" thickness={1.5} size={80} />
                </div>
            ) : null}
        </React.Fragment>

    );
}
