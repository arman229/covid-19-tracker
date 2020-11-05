import React from "react";
import './Header.css';

class Header extends React.Component {
    state = {countries: [], isFetching: true};


    componentDidMount() {
        this.getCountris();
    }

    render() {
        const {isFetching, countries} = this.state;
        if (isFetching) {
            return this.progressUi()
        } else {
            return this.contentUi(countries)
        }
    }


    async getCountris() {
        this.setState({isFetching: true});
        let response = await fetch("https://api.covid19api.com/countries");
        if (response.ok) {
            let global = {
                "Country": "Global",
                "Slug": "global",
                "ISO2": "gb"
            };
            let countryList = await response.json();
            countryList.sort((a, b) => (a.Country > b.Country) ? 1 : ((b.Country > a.Country) ? -1 : 0));
            let newList = [global].concat(countryList);
            this.setState({countries: newList, isFetching: false})
        } else {
            this.setState({isFetching: false});
            return "HTTP-Error: " + response.status

        }
    }

    contentUi = (cont) => {
        return <div className="App-header">
            <img height="50" width="50"
                 src="https://images.vexels.com/media/users/3/193093/isolated/preview/83f23fec75cc6474e19d33a4bec06d7d-covid-19-virus-icons-by-vexels.png"
                 alt="Covid-19 icon"/>
            <h2 style={{marginLeft: '16px'}}>Covid-19 Tracker</h2>
            <span className="country-spinner-label">Select Country: </span>
            <select className="country-spinner" onChange={this.props.spinerSelectListner}>
                {
                    cont.map((value, index) => {
                        return (<option key={value.Slug} value={value.Slug}
                        >{value.Country}</option>)
                    })
                }

            </select>

        </div>
    };
    progressUi = () => {
        return <div>
            <img style={{
                "marginLeft": "auto",
                "marginRight": "auto",
                "display": "block"
            }}
                 height="50" width="50" alt="sdfa"
                 src="https://androidexample365.com/content/images/2019/07/triad_ring.gif"/>
        </div>;
    }

}


export default Header