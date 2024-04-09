import React, { useEffect } from 'react';
import {
    Typography,
    Box,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Input,
    Select,
    MenuItem,
    Stack,
    FormHelperText,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../ApiService/AuthService';
import { errorNotify, successNotify } from '../notifications/notify';

export default function AddEmployee(props) {
    const { user } = React.useContext(AuthContext);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [empId, setEmpId] = React.useState();
    const [uei, setUEI] = React.useState();
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
    const [deptId, setDeptId] = React.useState('');
    const [anualBudget, setAnualBudget] = React.useState(4000);
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [employeeIdError, setEmployeeIdError] = React.useState(false);
    const [ueiError, setUeiError] = React.useState(false);
    const [deptError, setDeptError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [anualBudgetError, setAnualBudgetError] = React.useState(false);

    const { mutateAsync: createEmployee, isLoading } = useMutation(
        AuthService.employeeReg,
        {
            onSuccess: async ({ data }) => {
                if (data?.errors?.status === 400) {
                    errorNotify(
                        'Employee with this email address already exists.'
                    );
                } else {
                    await props.employeesRefetch();
                    successNotify('Employee successfully created!');
                    props.setEmployeeModal(false);
                }
            },
        }
    );

    const { data: departments } = useQuery(
        'getDepartments',
        EmployeeService.getDepartments
    );

    useEffect(() => {
        console.log(departments);
    }, [departments]);

    function handleChangeFirstName(event) {
        if (event.target.value.length > 0) {
            setFirstNameError(false);
        }
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        if (event.target.value.length > 0) {
            setLastNameError(false);
        }
        setLastName(event.target.value);
    }

    function handleChangeEmpId(event) {
        if (event.target.value.length > 0) {
            setEmployeeIdError(false);
        }
        setEmpId(event.target.value);
    }

    function handleChangeUEI(event) {
        if (event.target.value.length > 0) {
            setUeiError(false);
        }
        setUEI(event.target.value);
    }

    function handleChangePhone(event) {
        if (event.target.value.length > 0) {
            setPhoneError(false);
        }
        setPhone(event.target.value);
    }

    function handleChangeEmail(event) {
        if (event.target.value.length > 0) {
            setEmailError(false);
        }
        setEmail(event.target.value);
    }

    function handleChangeStartDate(newValue) {
        setStartDate(newValue);
    }

    function handleChangeAnualBudget(event) {
        if (event.target.value.length > 0) {
            setAnualBudgetError(false);
        }
        setAnualBudget(event.target.value);
    }

    const handleChangeDept = (event) => {
        setDeptError(false);
        setDeptId(event.target.value);
    };

    // function handleClose(event) {
    //   props.setEmployeeModal(false)
    // }

    async function handleSave(event) {
        console.log('In handleSave');

        // validate fields
        if (!firstName) {
            setFirstNameError(true);
            alert('Please enter a valid first name.');
            return;
        } else if (!lastName) {
            setLastNameError(true);
            alert('Please enter a valid last name.');
            return;
        } else if (!empId) {
            setEmployeeIdError(true);
            alert('Please enter a valid employer id.');
            return;
        } else if (!uei) {
            setUeiError(true);
            alert('Please enter a valid employer uei number.');
            return;
        } else if (!deptId) {
            setDeptError(true);
            alert('Please select a department.');
            return;
        } else if (!email) {
            setEmailError(true);
            alert('Please enter a valid email.');
            return;
        } else if (!phone) {
            setPhoneError(true);
            alert('Please enter a valid phone.');
            return;
        } else if (!anualBudget) {
            setAnualBudgetError(true);
            alert('Please enter anual budget.');
            return;
        }

        console.log({
            firstName,
            lastName,
            uei,
            phone,
            email,
            employeeId: empId,
            employerId: user.id,
            startDate: startDate.toISOString().substring(0, 10),
            departmentId: deptId,
            password: 'password',
            anualBudget
        });

        await createEmployee({
            firstName,
            lastName,
            uei,
            phone,
            email,
            employeeId: empId,
            employerId: user.id,
            startDate: startDate.toISOString().substring(0, 10),
            departmentId: deptId,
            anualBudget: anualBudget,
            companyId: user?.company?._id,
        });
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="firstname">
                                First Name
                            </InputLabel>
                            <OutlinedInput
                                id="firstname"
                                value={firstName}
                                error={firstNameError}
                                onChange={handleChangeFirstName}
                                label="First Name"
                            />
                            {!!firstNameError && (
                                <FormHelperText error id="firstname-error">
                                    Please enter a valid first name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="lastname">
                                Last Name
                            </InputLabel>
                            <OutlinedInput
                                id="lastname"
                                value={lastName}
                                error={lastNameError}
                                onChange={handleChangeLastName}
                                label="First Name"
                            />
                            {!!lastNameError && (
                                <FormHelperText error id="lastname-error">
                                    Please enter a valid last name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                value={email}
                                error={emailError}
                                onChange={handleChangeEmail}
                                label="Email"
                                type="email"
                            />
                            {!!lastNameError && (
                                <FormHelperText error id="lastname-error">
                                    Please enter a valid email.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <OutlinedInput
                                id="phone"
                                value={phone}
                                error={phoneError}
                                onChange={handleChangePhone}
                                label="Phone"
                            />
                            {!!lastNameError && (
                                <FormHelperText error id="lastname-error">
                                    Please enter a phone number.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="empId">Employee Id</InputLabel>
                            <OutlinedInput
                                id="empId"
                                value={empId}
                                error={employeeIdError}
                                onChange={handleChangeEmpId}
                                label="Employee Id"
                            />
                        </FormControl>
                        {!!employeeIdError && (
                            <FormHelperText error id="employee-error">
                                Please enter a valid employee id
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="UEInumber">
                                UEI number
                            </InputLabel>
                            <OutlinedInput
                                id="UEInumber"
                                value={uei}
                                error={ueiError}
                                onChange={handleChangeUEI}
                                label="UEI number"
                            />
                            {!!ueiError && (
                                <FormHelperText error id="uei-error">
                                    Please enter a valid employee uei number
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                variant="standard"
                                label="Start Date"
                                inputFormat="MM/dd/yyyy"
                                value={startDate}
                                onChange={handleChangeStartDate}
                                renderInput={(params) => (
                                    <Input {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="dept">Department</InputLabel>
                            <Select
                                labelId="dept"
                                id="dept"
                                value={deptId}
                                error={deptError}
                                label="Department"
                                onChange={handleChangeDept}
                            >
                                {departments &&
                                    departments.map((item) => (
                                        <MenuItem
                                            key={item._id}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            {!!deptError && (
                                <FormHelperText error id="dept-error">
                                    Please select a department
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="anualBudget">
                                Anual Budget
                            </InputLabel>
                            <OutlinedInput
                                id="anualBudget"
                                value={anualBudget}
                                error={anualBudgetError}
                                onChange={handleChangeAnualBudget}
                                label="Anual Budget"
                            />
                            {!!anualBudgetError && (
                                <FormHelperText error id="anualBudget-error">
                                    Please enter anual budget
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <Stack direction="row" justifyContent="end">
                            <Button
                                onClick={props.handleCloseEmployee}
                                variant="outlined"
                                style={{
                                    marginTop: 20,
                                    marginRight: 10,
                                    borderColor: grayText,
                                    color: drawerBackground,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                style={{ marginTop: 20, background: primary }}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
