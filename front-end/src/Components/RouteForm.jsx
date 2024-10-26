import {
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    TextField,
    Grid,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Autocomplete,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Col, notification, Row} from "antd";
import axios from "axios";
import { apiUrl } from "../Config";
import { useNavigate } from "react-router-dom";

const RouteForm = () => {
    const countries = [
        {
            cid: 0,
            country: 'India',
            value: 'india'
        },
        {
            cid: 1,
            country: 'US',
            value: 'us'
        },
        {
            cid: 2,
            country: 'UK',
            value: 'uk'
        },
    ];

    const [regData, setRegData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: '',
        address: '',
        gender: '',
        email: '',
        password: '',
        country: null,
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: '',
        address: '',
        gender: '',
        email: '',
        password: '',
        country: '',
    });

    // const [tabledata, setTabledata] = useState([]);
    // const [loading, setLoading] = useState(true);

    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const validateFields = () => {
        let valid = true;
        let newErrors = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dob: '',
            address: '',
            gender: '',
            email: '',
            password: '',
            country: '',
        };

        // Existing validations...
        if (!regData.firstName) {
            newErrors.firstName = "First Name is required";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(regData.firstName)) {
            newErrors.firstName = "First Name can only contain letters";
            valid = false;
        }

        if (!regData.lastName) {
            newErrors.lastName = "Last Name is required";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(regData.lastName)) {
            newErrors.lastName = "Last Name can only contain letters";
            valid = false;
        }

        if (!regData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
            valid = false;
        } else if (!/^\d{10}$/.test(regData.phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be 10 digits";
            valid = false;
        }

        if (!regData.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(regData.email.toLowerCase())) {
                newErrors.email = "Please enter a valid email address";
                valid = false;
            }
        }

        if (!regData.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else {
            const passwordLength = regData.password.length == 8;
            const hasUpperCase = /[A-Z]/.test(regData.password);
            const hasLowerCase = /[a-z]/.test(regData.password);
            const hasNumbers = /\d/.test(regData.password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(regData.password);

            if (!passwordLength || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
                let passwordError = "Password must contain:";
                if (!passwordLength) passwordError += "\n- Exactly 8 characters";
                if (!hasUpperCase) passwordError += "\n- At least 1 uppercase letter";
                if (!hasLowerCase) passwordError += "\n- At least 1 lowercase letter";
                if (!hasNumbers) passwordError += "\n- At least 1 number";
                if (!hasSpecialChar) passwordError += "\n- At least 1 special character";

                newErrors.password = passwordError;
                valid = false;
            } else {
                newErrors.password = "";
                valid = true;
            }
        }

        if (!regData.country) {
            newErrors.country = "Country is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleEdit = async (id) => {
        try {
            const res = await axios.get(`${apiUrl}/routeforms/${id}`);
            const data = res.data;

            setRegData({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                dob: data.dob,
                address: data.address,
                gender: data.gender,
                email: data.email,
                password: data.password,
                country: countries.find(country => country.value === data.country),
            })
            setEditId(id)
        } catch (error) {
            console.log('Error Occurred during fetching data:', error);
        }

    }

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }

        const dataToSave = {
            ...regData,
            dob: new Date(regData.dob).toISOString(),
            country: regData.country.value
        };
        try {
            if (editId) {
                const res = await axios.put(`${apiUrl}/routeforms/${editId}`, dataToSave);
                if (res.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Record edited successfully',
                    });
                }
                setEditId(null);
            } else {
                console.log('Data being sent:', dataToSave);
                const res = await axios.post(`${apiUrl}/routeforms`, dataToSave);
                if (res.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Record saved successfully',
                    });
                }
            }

            setRegData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                dob: '',
                address: '',
                gender: '',
                email: '',
                password: '',
                country: null,
            });
            setErrors({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                dob: '',
                address: '',
                gender: '',
                email: '',
                password: '',
                country: '',
            });
            getData();
        } catch (error) {
            console.log('Error saving data:', error.response?.data || error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/routeforms/${id}`);

            if (res.status === 204) {
                setTabledata(prevData => prevData.filter(item => item.id !== id));

                if (editId === id) {
                    setEditId(null);
                    setRegData({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        dob: "",
                        address: "",
                        gender: "",
                        email: "",
                        password: "",
                        country: null,
                    });
                }

                notification.success({
                    message: 'Success',
                    description: 'Record deleted successfully',
                });
            }
        } catch (error) {
            console.log('Error occurred during deletion:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to delete record',
            });
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber" && (!/^\d*$/.test(value) || value.length > 10)) {
            return;
        }

        setRegData({ ...regData, [name]: value });
    };

    // Updated country change handler
    const handleCountryChange = (event, newValue) => {
        setRegData({
            ...regData,
            country: newValue  // Store the entire country object
        });

        // Clear country error if a value is selected
        if (newValue) {
            setErrors(prev => ({
                ...prev,
                country: ''
            }));
        }
    };

    const handleDetail = () =>{
        navigate('/routetable');
    }

    //======================= || Input OnChange End || =================================    
    return (
        <Container fluid className="mt-3 my-5 mainpaper myForm ">
            <Paper
                elevation={7}
                style={{ padding: "12px 0", borderRadius: 12 }}
                className="RegPaper"
            >
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: "0.1rem", width: "35ch" },

                        "& .MuiFormLabel-root": {
                            color: "#003590",
                            fontWeight: "600",
                            fontSize: 19,
                            backgroundColor: "#fff",
                            paddingRight: 1,
                        },
                        "& .MuiTypography-root": {
                            fontSize: 12,
                        },
                        padding: 4,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h4 style={{
                        marginBottom: '40px',
                        textAlign: 'center',
                    }}>
                        Save form
                    </h4>
                    <Row gutter={[32, 32]}>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="First Name"
                                required
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.firstName}
                                onChange={handleInputChange}
                                name="firstName"
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="Last Name"
                                required
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.lastName}
                                onChange={handleInputChange}
                                name="lastName"
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="DOB"
                                required
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.dob}
                                onChange={handleInputChange}
                                name="dob"
                                error={Boolean(errors.dob)}
                                helperText={errors.dob}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <FormControl>
                                <FormLabel sx={{
                                    fontSize: '10px'
                                }} >Gender</FormLabel>
                                <RadioGroup
                                    defaultValue="female"
                                    name="gender"
                                    value={regData.gender}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.gender)}
                                    helperText={errors.gender}
                                    row
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="Phone Number"
                                required
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.phoneNumber}
                                onChange={handleInputChange}
                                name="phoneNumber"
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="Email Address"
                                required
                                type="email"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.email}
                                onChange={handleInputChange}
                                name="email"
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label="Password"
                                required
                                type="password"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.password}
                                onChange={handleInputChange}
                                name="password"
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Autocomplete
                                options={countries}
                                getOptionLabel={(option) => option?.country || ''}
                                onChange={handleCountryChange}
                                value={regData.country}
                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Country"
                                        required
                                        name="country"
                                        InputLabelProps={{ shrink: true }}
                                        placeholder="--Select--"
                                        error={Boolean(errors.country)}
                                        helperText={errors.country}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                label='Address'
                                required
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                style={{ width: "100%" }}
                                value={regData.address}
                                onChange={handleInputChange}
                                name="address"
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                                multiline
                                rows={3}
                            />
                        </Col>
                    </Row>

                </Box>
                <Stack
                    direction="row"
                    spacing={2}
                    padding="14px 20px"
                    justifyContent="end"
                >
                    <Button
                        variant='contained'
                        size="medium"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        variant='contained'
                        color="success"
                        size="medium"
                        onClick={handleDetail}
                    >
                        Details
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default RouteForm;