import React from "react";
import {Pie} from "react-chartjs-2";

class PieChart extends React.Component {

    render() {
        let { TotalConfirmed, TotalDeaths, TotalRecovered} = this.props.covidStats;

       let datum = {
            labels: [
                'Total Deaths',
                'Total Recovered',
                'Total Confirmed'
            ],
            datasets: [{
                data: [TotalDeaths, TotalRecovered, TotalConfirmed],
                backgroundColor: [
                    '#E94B48',
                    '#52AC55',
                    '#FA9311'
                ],
                hoverBackgroundColor: [
                    '#C94B48',
                    '#32AC55',
                    '#DA9311'
                ]
            }]
        };
        return (
            <div   >
                <strong>Recovery Rate: {this.props.countryName}</strong>
                <hr/>
                <Pie height={200} data={datum}/>
            </div>
        )
    }

}

export default PieChart