import {
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    TextField,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "antd";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { apiUrl } from "../Config";


import CircularProgress from "@mui/material/CircularProgress";

const RouteForm = () => {


    const [regData, setRegData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: '',
        address: '',
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: '',
        address: '',
    });
    const [isLoading, setLoading] = useState(false);

    //======================= || Data Validation Start || =================================
    const validateFields = () => {
        let valid = true;
        let newErrors = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dob: '',
            address: '',
        };

        // First Name Validation
        if (!regData.firstName) {
            newErrors.firstName = "First Name is required";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(regData.firstName)) {
            newErrors.firstName = "First Name can only contain letters";
            valid = false;
        }

        // Last Name Validation
        if (!regData.lastName) {
            newErrors.lastName = "Last Name is required";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(regData.lastName)) {
            newErrors.lastName = "Last Name can only contain letters";
            valid = false;
        }

        // Phone Number Validation
        if (!regData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
            valid = false;
        } else if (!/^\d{10}$/.test(regData.phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be 10 digits";
            valid = false;
        }


        setErrors(newErrors);
        return valid;
    };
    //======================= || Data Validation End || =================================

    //======================= || Data Post/Put Start || =================================

    const handleSave = async () => {
        if (!validateFields()) {
            return; // If validation fails, don't proceed with saving
        }

        try {
            // setLoading(true);

            // Ensure phoneNumber is a number before sending the data
            const dataToSave = {
                ...regData,
                // phoneNumber: parseInt(regData.phoneNumber), // Convert phoneNumber to a number
                dob: new Date(regData.dob).toISOString(),
            };

            // POST request to create a new entry
            console.log(dataToSave); // Log the data you're sending
            console.log(`${apiUrl}/routeforms`); // Log the full URL

            await axios.post(`${apiUrl}/routeforms`, dataToSave);

 
            // setShowAlert(true); // Show success alert

            // Reset form fields and errors
            setRegData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                dob: '',
                address: '',
            });
            setErrors({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                dob: '',
                address: '',
            });

            // Hide loading and alert after 3 seconds
            // setTimeout(() => {
            //     setLoading(false);
            //     setShowAlert(false);
            // }, 3000);
        } catch (error) {
            console.log(error);
            // console.error(

            //     "Error in handleSave:",
            //     error.response ? error.response.data : error.message
            // );
            // setShowAlerterror(true); // Show error alert
        }
    };

    //======================= || Data Post/Put End || =================================

    //======================= || Input OnChange Start || =================================
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // For Phone Number: Only allow numbers and limit to 10 digits
        if (name === "phoneNumber" && (!/^\d*$/.test(value) || value.length > 10)) {
            return; // Prevent input if not numeric or more than 10 digits
        }

        setRegData({ ...regData, [name]: value });
    };
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


                </Stack>
            </Paper>
        </Container>
    );
};

export default RouteForm;