import React from "react";
import {Card, Grid} from "@material-ui/core";
import "./CasesCards.css"
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PollOutlined from '@material-ui/icons/PollOutlined';
import CountUp from "react-countup";
import Box from "@material-ui/core/Box";
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import LocalHotelOutlinedIcon from '@material-ui/icons/LocalHotelOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
class CasesCards extends React.Component {


    render() {

        return this.getUiBySlug()

    }


    getUiBySlug = () => {

        let {NewConfirmed,TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered} = this.props.covidStats;

        return <div className="card-container">
            <Grid container spacing={3} justify={"center"}>
                <Grid item xs={12} md={3} component={Card} className="card-content"
                      style={{"backgroundColor": "#E94B48"}}>
                    <CardContent>
                        <div style={{display: "inline-block", float: "left", minWidth: 200}}>

                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={NewConfirmed} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">New Confirmed</Box>
                        </div>
                        <div style={{display: "inline-block", float: "left", minWidth: 200, marginTop:10}}>
                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={TotalConfirmed} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">Total Confirmed</Box>
                        </div>
                        <GroupAddOutlinedIcon style={{fontSize: 75, float: "right"}}/>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className="card-content"
                      style={{"backgroundColor": "#FA9311"}}>
                    <CardContent>
                        <div style={{display: "inline-block", float: "left", minWidth: 200}}>
                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={NewDeaths} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">New Deaths </Box>
                        </div>
                        <div style={{display: "inline-block", float: "left", minWidth: 200, marginTop:10}}>
                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={TotalDeaths} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">Total Deaths</Box>
                        </div>
                        <LocalHotelOutlinedIcon style={{fontSize: 75, float: "right"}}/>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={3} component={Card} className="card-content"
                      style={{"backgroundColor": "#52AC55"}}>
                    <CardContent>
                        <div style={{display: "inline-block", float: "left", minWidth: 200}}>
                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={NewRecovered} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">New Recovered </Box>
                        </div>
                        <div style={{display: "inline-block", float: "left", minWidth: 200, marginTop:10}}>
                            <Typography variant="h5" style={{marginBottom: 8}}>
                                <CountUp end={TotalRecovered} start={0} duration={1} separator=","/>
                            </Typography>
                            <PollOutlined style={{fontSize: 20, float: "left"}}/>
                            <Box fontWeight="fontWeightBold" color="textPrimary" fontSize="h6.fontSize"
                                 variant="body1">Total Recovered</Box>
                        </div>
                        <HowToRegOutlinedIcon style={{fontSize: 75, float: "right"}}/>
                    </CardContent>
                </Grid>

            </Grid>

        </div>
    }



}

export default CasesCards