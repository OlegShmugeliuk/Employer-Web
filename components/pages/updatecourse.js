import React, { useEffect } from 'react';
import api from '../../ApiService/http';
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
    TextField,
    Autocomplete
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useMutation, useQuery } from 'react-query';
import CourseService from '../../ApiService/CourseService';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../ApiService/AuthService';
import { errorNotify, successNotify } from '../notifications/notify';
import CustomFileInput from './CustomFileInput';

const degreeOptions = [
    { label: 'Certificate', value: 'Certificate' },
    { label: 'Post-grad Certificate', value: 'Post-grad Certificate' },
    { label: 'Bachelors', value: 'Bachelors' },
    { label: 'Master', value: 'Master' }
];

const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' }
];

/**
 * 
 * @param {*} props 
 * @returns 
 */

export default function UpdateCourse(props) {
    const data = props.editableData;
    let courseId = data._id;
    const { user } = React.useContext(AuthContext);
    const employerId = React.useState(data.employerId);
    const [courseName, setCourseName] = React.useState(data.course_name);
    const [degreeType, setDegreeType] = React.useState([]);
    const [interest, setInterest] = React.useState(data.interest);
    const [institution, setInstitution] = React.useState(data.institution);
    const [language, setLanguage] = React.useState([]);
    const [delivery, setDelivery] = React.useState(data.delivery);
    const [location, setLocation] = React.useState(data.location);
    const [duration, setDuration] = React.useState(data.duration);
    const [cost, setCost] = React.useState(data.cost);
    const [link, setLink] = React.useState(data.link);
    const [target, setTarget] = React.useState(data.target);
    const [logo, setLogo] = React.useState(data.logo);
    const [about, setAbout] = React.useState(data.about);
    const [overview, setOverview] = React.useState(data.overview);
    const [deadline, setDeadline] = React.useState(data.application_deadline);
    const [startDate, setStartDate] = React.useState(new Date(data.start_date));
    const [tuitionFee, setTuitionFee] = React.useState(data.tuition_and_fees);

    const [courseNameError, setCourseNameError] = React.useState(false);
    const [degreeTypeError, setDegreeTypeError] = React.useState(false);
    const [interestError, setInterestError] = React.useState(false);
    const [institutionError, setInstitutionError] = React.useState(false);
    const [languageError, setLanguageError] = React.useState(false);
    const [deliveryError, setDeliveryError] = React.useState(false);
    const [locationError, setLocationError] = React.useState(false);
    const [durationError, setDurationError] = React.useState(false);
    const [costError, setCostError] = React.useState(false);
    const [linkError, setLinkError] = React.useState(false);
    const [targetError, setTargetError] = React.useState(false);
    const [logoError, setLogoError] = React.useState(false);
    const [bgImageError, setBgImageError] = React.useState(false);
    const [aboutError, setAboutError] = React.useState(false);
    const [overviewError, setOverviewError] = React.useState(false);
    const [deadlineError, setDeadlineError] = React.useState(false);
    const [startDateError, setStartDateError] = React.useState(false);
    const [tuitionFeeError, setTuitionFeeError] = React.useState(false);

    
    const [image, setImage] = React.useState(data.logo);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setImage(reader.result);                
            }
        };
        if (file) {
            reader.readAsDataURL(file);
            setLogo(file);
        } else {
            setImage("");
        }
    };    

    const extractValuesAsString = (data) => {
        // Extract _id values from each object using map()
        const valueArray = data.map((item) => item.value);
    
        // Join _id values into a comma-separated string using join()
        const valueString = valueArray.join(', ');
    
        return valueString;
    };

    const { mutateAsync: updateCourse, isLoading } = useMutation(
        async () => {
            const upData = {
                course_name: courseName,
                degree_type: degreeType,
                interest: interest,
                institution: institution,
                language: language,
                delivery: delivery,
                location: location,
                duration: duration,
                cost: cost,
                link: link,
                target: target,
                logo: logo,
                about: about,
                overview: overview,
                application_deadline: deadline,
                start_date: startDate.toISOString().substring(0, 10),
                tuition_and_fees: tuitionFee
            };

            const formData = new FormData();
            const courseData = {
                course_name: courseName,
                degree_type: degreeType,
                interest: interest,
                institution: institution,
                language: language,
                delivery: delivery,
                location: location,
                duration: duration,
                cost: cost,
                link: link,
                target: target,
                logo: logo,
                about: about,
                overview: overview,
                application_deadline: deadline,
                start_date: startDate.toISOString().substring(0, 10),
                tuition_and_fees: tuitionFee
            };
            for (const key in courseData) {
                formData.append(key, courseData[key]);
            }
            for (const key in courseData) {
                formData.append(key, courseData[key]);
            }
        
            try {
                await CourseService.updateCourse(courseId, upData);
                await props.coursesRefetch();
                successNotify('Course successfully updated!');
                props.setCourseModal(false);
            } catch (error) {

            }
        },
        {
          // Additional options can be passed here, such as onSuccess, onError, etc.
            onSuccess: async (response) => {
                if (response?.errors?.status === 400) {
                    errorNotify(
                        'Course already exists.'
                    );
                } else {
                    await props.coursesRefetch();
                    successNotify('Course successfully updated!');
                    props.setCourseModal(false);
                }
            }
        }
    );

    useEffect(() => {
        if (degreeOptions && Array.isArray(degreeOptions) && degreeOptions.length > 0 && data && data.degree_type) {
            const degreeTypes = data.degree_type;
            let targetValues = degreeTypes.split(',');
            const trimmedValues = targetValues.map(part => part.trim());
            // Use filter method to get only the objects with matching _id values
            const filteredDegreeTypes = degreeOptions.filter(degreeOption => trimmedValues.includes(degreeOption.value));
            
            console.log('filteredDegreeTypes:', filteredDegreeTypes);
            setDegreeType(filteredDegreeTypes);
        }
            
    }, [degreeOptions]);
    
    useEffect(() => {
        if (languageOptions && Array.isArray(languageOptions) && languageOptions.length > 0 && data && data.language)
        {
            const languageOption = data.language;
            let targetValues = languageOption.split(',');
            const trimmedValues = targetValues.map(part => part.trim());
            // Use filter method to get only the objects with matching _id values
            const filteredLanguages = languageOptions.filter(option => trimmedValues.includes(option.value));
            setLanguage(filteredLanguages);
        }
            
    }, [languageOptions]);

    function handleChangeCourseName(event) {
        if (event.target.value.length > 0) {
            setCourseNameError(false);
        }
        setCourseName(event.target.value);
    }

    

    const handleChangeDegreeType = (value) => {
        setDegreeTypeError(false);
        setDegreeType(value);
        if (!value) return;
    };

    function handleChangeInterest(event) {
        if (event.target.value.length > 0) {
            setInterestError(false);
        }
        setInterest(event.target.value);
    }

    function handleChangeInstitution(event) {
        if (event.target.value.length > 0) {
            setInstitutionError(false);
        }
        setInstitution(event.target.value);
    }   

    const handleChangeLanguage = (value) => {
        setLanguageError(false);
        setLanguage(value);
        if (!value) return;
    };

    function handleChangeDelivery(event) {
        if (event.target.value.length > 0) {
            setDeliveryError(false);
        }
        setDelivery(event.target.value);
    }

    function handleChangeLocation(event) {
        if (event.target.value.length > 0) {
            setLocationError(false);
        }
        setLocation(event.target.value);
    }

    function handleChangeDuration(event) {
        if (event.target.value.length > 0) {
            setDurationError(false);
        }
        setDuration(event.target.value);
    }

    function handleChangeCost(event) {
        if (event.target.value.length > 0) {
            setCostError(false);
        }
        setCost(event.target.value);
    }

    function handleChangeLink(event) {
        if (event.target.value.length > 0) {
            setLinkError(false);
        }
        setLink(event.target.value);
    }

    function handleChangeTarget(event) {
        if (event.target.value.length > 0) {
            setTargetError(false);
        }
        setTarget(event.target.value);
    }

    function handleChangeLogo(event) {
        if (event.target.value.length > 0) {
            setLogoError(false);
        }
        setLogo(event.target.files[0]);
    }

    function handleChangeBgImage(event) {
        if (event.target.value.length > 0) {
            setBgImageError(false);
        }
        setBgImage(event.target.value);
    }

    function handleChangeAbout(event) {
        if (event.target.value.length > 0) {
            setAboutError(false);
        }
        setAbout(event.target.value);
    }

    function handleChangeOverview(event) {
        if (event.target.value.length > 0) {
            setOverviewError(false);
        }
        setOverview(event.target.value);
    }

    function handleChangeDeadline(event) {
        if (event.target.value.length > 0) {
            setDeadlineError(false);
        }
        setDeadline(event.target.value);
    }

    function handleChangeStartDate(newValue) {
        if (!newValue) {
            setStartDateError(true); // Set error if start date is empty
        } else {
            setStartDateError(false); // Clear error if start date is provided
        }
        setStartDate(newValue);
    }

    function handleChangeTuitionFee(event) {
        if (event.target.value.length > 0) {
            setTuitionFeeError(false);
        }
        setTuitionFee(event.target.value);
    }

    // function handleClose(event) {
    //   props.setCourseModal(false)
    // }

    async function handleSave(event) {
        console.log('In handleSave');

        // validate fields
        if (!courseName) {
            setCourseNameError(true);
            alert('Please enter a valid course name.');
            return;
        } else if (!degreeType || degreeType.length === 0) {
            setDegreeTypeError(true);
            alert('Please enter a valid degree type.');
            return;
        } else if (!interest) {
            setInterestError(true);
            alert('Please enter a valid interest.');
            return;
        } else if (!institution) {
            setInstitutionError(true);
            alert('Please enter a valid institution name.');
            return;
        } else if (!language || language.length === 0) {
            setLanguageError(true);
            alert('Please select a language.');
            return;
        } else if (!delivery) {
            setDeliveryError(true);
            alert('Please enter a valid deleivery content.');
            return;
        } else if (!location) {
            setLocationError(true);
            alert('Please enter a valid location.');
            return;
        } else if (!duration) {
            setDurationError(true);
            alert('Please enter duration.');
            return;
        } else if (!cost) {
            setCostError(true);
            alert('Please enter cost.');
            return;
        } else if (!link) {
            setLinkError(true);
            alert('Please enter valid link.');
            return;
        } else if (!target) {
            setTargetError(true);
            alert('Please enter valid target.');
            return;
        } else if (!logo) {
            setLogoError(true);
            alert('Please enter logo.');
            return;
        } else if (!about) {
            setAboutError(true);
            alert('Please enter about.');
            return;
        } else if (!overview) {
            setOverviewError(true);
            alert('Please enter overview.');
            return;
        } else if (!deadline) {
            setDeadlineError(true);
            alert('Please enter deadline.');
            return;
        } else if (!startDate) {
            setStartDateError(true);
            alert('Please enter start date.');
            return;
        } else if (!tuitionFee) {
            setTuitionFeeError(true);
            alert('Please enter tuition fee.');
            return;
        }

        const formData = new FormData();
        const degreeTypeString = degreeType ? extractValuesAsString(degreeType) : '';
        const languageString = language ? extractValuesAsString(language) : '';

        const courseData = {
            course_name: courseName,
            degree_type: degreeTypeString,
            interest: interest,
            institution: institution,
            language: languageString,
            delivery: delivery,
            location: location,
            duration: duration,
            cost: cost,
            link: link,
            target: target,
            logo: logo,
            employerId: employerId,
            about: about,
            overview: overview,
            application_deadline: deadline,
            start_date: startDate.toISOString().substring(0, 10),
            tuition_and_fees: tuitionFee
        };
        for (const key in courseData) {
            formData.append(key, courseData[key]);
        }
    
        try {
            await CourseService.updateCourse(courseId, formData);
            await props.coursesRefetch();
            successNotify('Course successfully updated!');
            props.setCourseModal(false);
        } catch (error) {

        }
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="coursename">
                                Course Name
                            </InputLabel>
                            <OutlinedInput
                                id="coursename"
                                value={courseName}
                                error={courseNameError}
                                onChange={handleChangeCourseName}
                                label="Course Name"
                            />
                            {!!courseNameError && (
                                <FormHelperText error id="coursename-error">
                                    Please enter Course Name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Autocomplete
                                multiple
                                options={degreeOptions}
                                value={degreeType} // Use state variable for controlled value
                                onChange={(event, newValue) => {
                                    handleChangeDegreeType(newValue); // Update state when selection changes
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Degrees Type"
                                        placeholder="Start typing..."
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                            />
                            {!!degreeTypeError && (
                                <FormHelperText error id="degreetype-error">
                                    Please select at least one degree type
                                </FormHelperText>
                            )}                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="interest">Interest</InputLabel>
                            <OutlinedInput
                                id="interest"
                                value={interest}
                                error={interestError}
                                onChange={handleChangeInterest}
                                label="Interest"
                            />
                            {!!interestError && (
                                <FormHelperText error id="interest-error">
                                    Please enter interest.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="institution">Institution</InputLabel>
                            <OutlinedInput
                                id="institution"
                                value={institution}
                                error={institutionError}
                                onChange={handleChangeInstitution}
                                label="Institution"
                            />
                            {!!institutionError && (
                                <FormHelperText error id="institution-error">
                                    Please enter institution.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <Autocomplete
                                multiple
                                options={languageOptions}
                                value={language} // Use state variable for controlled value
                                onChange={(event, newValue) => {
                                    handleChangeLanguage(newValue); // Update state when selection changes
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Language"
                                        placeholder="Start typing..."
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                            />
                            {!!languageError && (
                                <FormHelperText error id="language-error">
                                    Please select language
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="delivery">
                                UEI number
                            </InputLabel>
                            <OutlinedInput
                                id="delivery"
                                value={delivery}
                                error={deliveryError}
                                onChange={handleChangeDelivery}
                                label="Delivery"
                            />
                            {!!deliveryError && (
                                <FormHelperText error id="delivery-error">
                                    Please enter delivery
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="location">Location</InputLabel>
                            <OutlinedInput
                                labelid="location"
                                id="location"
                                value={location}
                                error={locationError}
                                label="Location"
                                onChange={handleChangeLocation}
                            />
                            {!!locationError && (
                                <FormHelperText error id="dept-error">
                                    Please enter location
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="duration">
                                Duration
                            </InputLabel>
                            <OutlinedInput
                                id="duration"
                                value={duration}
                                error={durationError}
                                onChange={handleChangeDuration}
                                label="Duration"
                            />
                            {!!durationError && (
                                <FormHelperText error id="duration-error">
                                    Please enter duration
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="cost">
                                Cost
                            </InputLabel>
                            <OutlinedInput
                                id="cost"
                                value={cost}
                                error={costError}
                                onChange={handleChangeCost}
                                label="Cost"
                            />
                            {!!costError && (
                                <FormHelperText error id="cost-error">
                                    Please enter cost
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="link">
                                Link
                            </InputLabel>
                            <OutlinedInput
                                id="link"
                                value={link}
                                error={linkError}
                                onChange={handleChangeLink}
                                label="Link"
                            />
                            {!!linkError && (
                                <FormHelperText error id="link-error">
                                    Please enter link
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="target">
                                Target
                            </InputLabel>
                            <OutlinedInput
                                id="target"
                                value={target}
                                error={targetError}
                                onChange={handleChangeTarget}
                                label="Target"
                            />
                            {!!targetError && (
                                <FormHelperText error id="target-error">
                                    Please enter target
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="about">
                                About
                            </InputLabel>
                            <OutlinedInput
                                id="about"
                                value={about}
                                error={aboutError}
                                onChange={handleChangeAbout}
                                label="About"
                            />
                            {!!aboutError && (
                                <FormHelperText error id="about-error">
                                    Please enter about
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>                    
                    <Grid item xs={12} md={4}>
                        <InputLabel shrink htmlFor="logo">Logo</InputLabel>
                        <FormControl fullWidth>
                        <Input
                            label=""
                            type="file"
                            error={logoError}
                            onChange={handleImageChange}
                            InputLabelProps={{
                                shrink: true,
                            }}                            
                        />
                        {!!logoError && (
                            <FormHelperText error id="logo-error">
                                Please enter logo
                            </FormHelperText>
                        )}
                        {/* <InputLabel shrink htmlFor="logo">Logo</InputLabel>                       
                        <FormControl fullWidth>
                            <Input
                                fullWidth
                                id="logo"
                                type="file"
                                error={logoError}
                                onChange={handleChangeLogo}
                            /> */}
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <div style={{marginTop:'24px', textAlign:'center', borderRadius: '2px'}}>
                            {image && (
                                <img
                                src={image}
                                className='inline-block'
                                alt="Preview"
                                style={{ width: 'auto', height: '47px'}}
                                />
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="overview">
                                Overview
                            </InputLabel>
                            <OutlinedInput
                                id="overview"
                                value={overview}
                                error={overviewError}
                                onChange={handleChangeOverview}
                                label="Overview"
                            />
                            {!!overviewError && (
                                <FormHelperText error id="overview-error">
                                    Please enter overview
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="deadline">
                                Deadline
                            </InputLabel>
                            <OutlinedInput
                                id="deadline"
                                value={deadline}
                                error={deadlineError}
                                onChange={handleChangeDeadline}
                                label="Deadline"
                            />
                            {!!deadlineError && (
                                <FormHelperText error id="overview-error">
                                    Please enter deadline
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>                    
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth error={startDateError}>
                            <InputLabel htmlFor="start-date"></InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    variant="standard"
                                    label="Start Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={handleChangeStartDate}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            id="start-date" // Ensure this ID matches the htmlFor attribute of the InputLabel
                                            sx={{ width: '100%' }}
                                            error={startDateError}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            {startDateError && (
                                <FormHelperText>Please enter a valid start date</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="tuitionfee">
                                Tuition Fee
                            </InputLabel>
                            <OutlinedInput
                                id="tuitionfee"
                                value={tuitionFee}
                                error={tuitionFeeError}
                                onChange={handleChangeTuitionFee}
                                label="Tuition Fee"
                            />
                            {!!tuitionFeeError && (
                                <FormHelperText error id="overview-error">
                                    Please enter Tuition Fee
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <Stack direction="row" justifyContent="end">
                            <Button
                                onClick={props.handleCloseCourse}
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
                                Update
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
