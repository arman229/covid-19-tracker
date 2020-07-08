import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";


class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            covidDailReport: [],
            selectedCountrySlug: props.selectedCountrySlug
        };
    }

    componentDidMount() {
        let slug = this.state.selectedCountrySlug
        this.getDailyStats(slug)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate prevState:" + this.state.selectedCountrySlug + " + newState:" + prevProps.selectedCountrySlug)
        if (prevProps.selectedCountrySlug !== this.state.selectedCountrySlug) {
            let slug = prevProps.selectedCountrySlug
            // this.getDailyStats(slug)
        }
    }

    render() {
        return this.updateUi();
    }

    updateUi() {
        const pairList = this.state.covidDailReport
        // console.log(pairList)

        const pairList1 = [
            {totalConfirmed: 33, reportDate: 22},
            {totalConfirmed: 43, reportDate: 23},
            {totalConfirmed: 55, reportDate: 24},
            {totalConfirmed: 73, reportDate: 25}
        ]

        let rows = []
        let columns = []
        pairList.forEach((value, index) => {
            rows[index] = value.reportDate
            columns[index] = value.totalConfirmed
        })
        const data = {
            labels: rows,
            datasets: [
                {
                    label: 'Confirmed Cases',
                    data: columns
                }
            ]
        };
        return (
            <div>
                <strong>Daily Report</strong>
                <hr/>
                <Line height={200} data={data}/>
            </div>
        )
    }

    async getDailyStats(slug) {
        console.log("Slug is:" + slug)
        if (slug === "global") {
            let response = await fetch("https://covid19.mathdro.id/api/daily");
            if (response.ok) {
                let stats = await response.json();
                let newList = stats.map((value, index) => {
                    return {totalConfirmed: value.totalConfirmed, reportDate: value.reportDate}
                })
                this.setState({covidDailReport: newList})
            } else {
                return "HTTP-Error: " + response.status

            }
        } else {
            let input = "https://api.covid19api.com/total/country/" + slug;
            console.log("country url is:" + input)
            let response = await fetch(input);
            if (response.ok) {
                let stats = await response.json();

                let newList = stats.map((value, index) => {
                    return {totalConfirmed: value.Confirmed, reportDate: value.Date}
                })
                this.setState({covidDailReport: newList})
            } else {
                return "HTTP-Error: " + response.status

            }
        }


    }
}

export default LineChart