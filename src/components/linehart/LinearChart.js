import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";

import "./../../triad_ring.gif"

const LinearChart = ({selectedCountrySlug, countryName}) => {
    const [dailyStats, setDailyStats] = useState([])
    useEffect(() => {
        getDailyStats(selectedCountrySlug)
    }, [selectedCountrySlug])


    const getDailyStats = async (slug) => {
        console.log("Slug is:" + slug)
        if (slug === "global") {
            let response = await fetch("https://covid19.mathdro.id/api/daily");
            if (response.ok) {
                let stats = await response.json();
                let newList = stats.map((value, index) => {
                    return {totalConfirmed: value.totalConfirmed, reportDate: value.reportDate}
                })
                setDailyStats(newList)
            } else {
                return "HTTP-Error: " + response.status

            }
        } else {
            let input = "https://api.covid19api.com/total/country/" + slug;
            let response = await fetch(input);
            if (response.ok) {
                let stats = await response.json();
                let newList = stats.map((value, index) => {
                    return {totalConfirmed: value.Confirmed, reportDate: value.Date}
                })
                setDailyStats(newList)
            } else {
                return "HTTP-Error: " + response.status
            }
        }


    }
    const data = () => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const pairList = dailyStats


        let rows = []
        let columns = []
        pairList.forEach((value, index) => {
            let date = new Date(value.reportDate);
            rows[index] = date.getDay() + " " + months[date.getMonth()]
            columns[index] = value.totalConfirmed
        })
        return {
            labels: rows,

            datasets: [
                {
                    label: 'Confirmed Cases',
                    data: columns
                }
            ]
        };
    }
    return (
        <div>
            <strong>Day wise cases:{countryName} </strong>
            <hr/>
            <Line height={200} data={data} />
        </div>
    )
}

export default LinearChart;