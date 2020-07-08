import React from 'react';
import Header from "./components/header/Header";
import './App.css';
import CasesCards from "./components/card/CasesCards";
import PieChart from "./components/piechart/PieChart";
import LineChart from "./components/linehart/LineChart";

class AppOld extends React.Component {


    constructor(props) {
        super(props);
        this.state = {selectedCountrySlug: "global", covidSummary: {}}

    }

    onCountySelected = (e) => {
        this.getStatistics();
        this.setState({selectedCountrySlug: e.target.value})
    }

    componentDidMount() {
        this.getStatistics();
    }

    render() {
        let slug = this.state.selectedCountrySlug;
        var datasepefic = {
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
        }
        let global = this.state.covidSummary.Global;
        if (global !== undefined) {
            if (slug === "global") {
                datasepefic = global
            } else {
                let find = this.state.covidSummary.Countries.find(o => o.Slug === slug);
                datasepefic = find === undefined ? datasepefic : find
            }
        }

        const classes = this.useStyles;
        return (
            <>
                <Header spinerSelectListner={this.onCountySelected}/>
                <CasesCards covidStats={datasepefic}/>
                <PieChart covidStats={datasepefic}/>
                <LineChart countrySlug={this.state.selectedCountrySlug}/>}

            </>
        );

    }

    async getStatistics() {
        let response = await fetch("https://api.covid19api.com/summary");
        if (response.ok) {
            let stats = await response.json();
            this.setState({covidSummary: stats})
        } else {
            return "HTTP-Error: " + response.status

        }

    }


}


export default AppOld;



