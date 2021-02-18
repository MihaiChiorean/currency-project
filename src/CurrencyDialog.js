import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CurrencyDialog(props) {
    const { clickToClose, currencyData, open } = props;
    const handleClose = () => clickToClose && clickToClose(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div>Name: <strong>{currencyData.name || null}</strong></div>
                    <div>Symbol: {currencyData.symbol || null}</div>
                    <div>{currencyData.links && currencyData.links.homepage && currencyData.links.homepage.length > 0 ? (
                        <span>Homepage:
                            <a href={`${currencyData.links.homepage[0]}`}>
                                {currencyData.links.homepage[0]}
                            </a>
                        </span>
                    ): null}</div>
                    <div>{currencyData.market_data && currencyData.market_data.market_cap && currencyData.market_data.market_cap.eur ?(
                        <span>Market Cap: {currencyData.market_data.market_cap.eur}</span>
                    ) : null}</div>
                    <div>Hashing Algoritm: {currencyData.hashing_algorithm || null}</div>
                    <div>Genesis Date: {currencyData.genesis_date || null}</div>
                    <div>
                        <strong>Description:</strong><br/>
                        <div>
                            {currencyData.description  && currencyData.description.en ? currencyData.description.en : null}
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
