import CurrencyTable from "./CurrencyTable"
import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./App.css"


const axios = require('axios').default;

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
        try {
            axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=1&sparkline=false")
                .then((response) => {
                    if(response.status === 200) {
                        this.setState({ currencies: response.data, loading: false })
                    }
                })
        } catch(e) {
            this.setState({ loading: false })
            console.warn(e);
        }
    }

    renderContent = (currencies) => {
        if(currencies.length > 0) {
            return <CurrencyTable currencies={currencies} />
        }
        return <div> No data is available</div>
    }

    render() {
        const { currencies, loading } = this.state;
        return (
            <div className="App">
                {loading ?
                    <CircularProgress color="primary" thickness={1.5} size={80} /> :
                    this.renderContent(currencies)}
            </div>
        )
    }
}

export default App;
