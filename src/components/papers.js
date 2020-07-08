import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PieChart from "./piechart/PieChart";

const useStyles = makeStyles((theme) => ({
    root: {
        margin:"65px",

        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export default function SimplePaper(props) {
    const classes = useStyles();
const covidStats=props.covidStats
    return (
        <div className={classes.root}>

           {/* <Paper style={{width:"48%",height:"300px"}} >
                <PieChart covidStats={covidStats}/>
            </Paper>
            <Paper style={{width:"49%",height:"300px"}}   >
                <PieChart covidStats={covidStats}/>
            </Paper>*/}
            <PieChart  covidStats={covidStats}/>
            {/*<PieChart style={{width:"48%",height:"300px"}} covidStats={covidStats}/>*/}
        </div>
    );
}