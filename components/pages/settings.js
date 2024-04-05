import * as React from 'react';

import {
    Typography,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormControlLabel,
    FormGroup,
    Checkbox,
} from '@mui/material';

export default function Settings(props) {
    const [address1, setAddress1] = React.useState('1749 Main Street');
    const [address2, setAddress2] = React.useState('Unit 1200');
    const [city, setCity] = React.useState(' Scranton');
    const [state, setState] = React.useState('Pennsylvania');
    const [country, setCountry] = React.useState('United States');
    const [loanRate, setLoanRate] = React.useState('8.0');
    const [requiresApproval, setRequiresApproval] = React.useState(false);

    const handleChangeName = (event) => {
        props.setEmployerName(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress1(event.target.value);
    };

    const handleChangeAddress2 = (event) => {
        setAddress2(event.target.value);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };

    const handleChangeLoanRate = (event) => {
        const rate = event.target.value;
        setLoanRate(rate);
    };

    const handleRequiresApproval = (event) => {
        setRequiresApproval(event.target.checked);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="vesting-amount">
                            Employer Name
                        </InputLabel>
                        <OutlinedInput
                            id="employer-name"
                            value={props.employerName}
                            onChange={handleChangeName}
                            label="Employer Name"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="address-1">Address</InputLabel>
                        <OutlinedInput
                            id="address-1"
                            value={address1}
                            onChange={handleChangeAddress}
                            label="Address"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="address-2">
                            Address Line 2
                        </InputLabel>
                        <OutlinedInput
                            id="address-2"
                            value={address2}
                            onChange={handleChangeAddress2}
                            label="Address Line 2"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <OutlinedInput
                            id="city"
                            value={city}
                            onChange={handleChangeCity}
                            label="City"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <OutlinedInput
                            id="state"
                            value={state}
                            onChange={handleChangeState}
                            label="State"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="county">County</InputLabel>
                        <OutlinedInput
                            id="country"
                            value={country}
                            onChange={handleChangeCountry}
                            label="County"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="loanrate">
                            Loan Interest Rate (%)
                        </InputLabel>
                        <OutlinedInput
                            id="loanRate"
                            value={loanRate}
                            onChange={handleChangeLoanRate}
                            label="Loan Interest Rate (%)"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={3}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={requiresApproval}
                                    onChange={handleRequiresApproval}
                                />
                            }
                            label="Bonus Requires Approval"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </>
    );
}
