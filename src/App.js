import CurrencyTable from "./CurrencyTable"
import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./App.css"


const axios = require('axios').default;

//some styles
const styles = theme => ({
    app: {
        textAlign: "center",
        backgroundColor: "#b3cbdc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    title: {
        marginBottom: "24px",
        color: "#fff"
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            loading: true
        }
    }

    componentDidMount() {
        //make the request to retrieve data
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=1&sparkline=false")
            .then((response) => {
                if(response.status === 200) {
                    this.setState({ currencies: response.data, loading: false })
                }
            })
            .catch(e => {
                console.warn(e)
            });
    }

    renderContent = (currencies) => {
        if(currencies.length > 0) {
            return <CurrencyTable currencies={currencies} />
        }
        return <div> No data is available</div>
    }
    render() {
        const { currencies, loading } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                {loading ?
                    <CircularProgress color="primary" thickness={1.5} size={80} /> : (
                        <React.Fragment>
                            <h2 id="title" className={classes.title}>Crypto currencies table</h2>
                            {this.renderContent(currencies)}
                        </React.Fragment>
                    )}
            </div>
        )
    }
}

export default withStyles(styles)(App);
