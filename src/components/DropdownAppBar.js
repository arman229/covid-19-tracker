import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/styles";

const useStyles = thm => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: 10,
        minWidth: 250,
        backgroundColor: "white",
    },
    selectControl: {
        minHeight: 50
    }
});

class DropdownAppBar extends React.Component {
    state = {selectedSlug: "", countries: [], isFetching: true};

    componentDidMount() {
        this.getCountris();
    }


    handleChange = (event) => {
        let value = event.target.value;
        let countryObj = this.state.countries.find(o => o.Slug === value);
        this.props.spinnerSelectListner({slug:value,country:countryObj.Country});
        this.setState({
            selectedSlug: value
        });
    };

    render() {
        const { countries} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Covid-19 Tracker App
                        </Typography>

                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Select Country</InputLabel>
                            <Select
                                className={classes.selectControl}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-outlined"
                                value={this.state.selectedSlug}
                                onChange={this.handleChange}>
                                {
                                    countries.map((value, index) => {
                                        return (<MenuItem key={value.Slug} value={value.Slug}
                                        >{value.Country}</MenuItem>)
                                    })
                                }

                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
            </div>
        );
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
            this.setState({selectedSlug: newList[0].Slug, countries: newList, isFetching: false})
        } else {
            this.setState({isFetching: false});
            return "HTTP-Error: " + response.status

        }
    }
}

export default withStyles(useStyles)(DropdownAppBar);