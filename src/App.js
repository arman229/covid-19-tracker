import * as React from "react";

import DropdownAppBar from "./components/DropdownAppBar";
import './App.css'
import CasesCards from "./components/card/CasesCards";
import {Card, Grid} from "@material-ui/core";
import PieChart from "./components/piechart/PieChart";
import CardContent from "@material-ui/core/CardContent";
import LinearChart from "./components/linehart/LinearChart";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedCountrySlug: "global", countryName: "Global", covidSummary: {}}
    }

    componentDidMount() {
        this.getStatistics();
    }

    onCountySelected = (value) => {
        this.getStatistics();
        this.setState({selectedCountrySlug: value.slug, countryName: value.country})
    };




    render() {
        let slug = this.state.selectedCountrySlug;

        var datasepefic = {
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
        };
        let global = this.state.covidSummary.Global;
        if (global !== undefined) {
            if (slug === "global") {
                datasepefic = global
            } else {
                let find = this.state.covidSummary.Countries.find(o => o.Slug === slug);
                datasepefic = find === undefined ? datasepefic : find
            }
        }
        return (
            <>
                <DropdownAppBar spinnerSelectListner={this.onCountySelected}/>
                <LinearProgress id="progress" color="secondary"/>
                <CasesCards covidStats={datasepefic}/>
                <Grid container justify={"center"}>
                    <Grid item xs={12} md={5} component={Card} className="pieCard" style={{backgroundColor: "#f5f5f5"}}>
                        <CardContent>
                            <PieChart countryName={this.state.countryName} covidStats={datasepefic}/>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={5} component={Card} className="pieCard" style={{backgroundColor: "#f5f5f5"}}>
                        <CardContent>
                            <LinearChart countryName={this.state.countryName}
                                         selectedCountrySlug={this.state.selectedCountrySlug}/>
                        </CardContent>
                    </Grid>
                </Grid>


            </>

        )
    }

    async getStatistics() {
        document.getElementById("progress").hidden=false;
        let response = await fetch("https://api.covid19api.com/summary");
        document.getElementById("progress").hidden=true;
        if (response.ok) {
            let stats = await response.json();
            this.setState({covidSummary: stats})
        } else {
            return "HTTP-Error: " + response.status
        }

    }
}

export default App