import { Box, Button, Checkbox, Paper, TextField } from '@mui/material';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:3000'

const ValidateForm = () => {
    const [mobileno1, setMobileno1] = useState('');
    const [mobileno2, setMobileno2] = useState('');
    const [character1, setCharacter1] = useState('');
    const [character2, setCharacter2] = useState('');
    const [character3, setCharacter3] = useState('');
    const [typeEmail, setTypeEmail] = useState('');
    const [typePass1, setTypePass1] = useState('');
    const [typePass2, setTypePass2] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [checked, setChecked] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [full, setFull] = useState('');
    const [mobileno3, setMobileno3] = useState('');
    const [mobileno4, setMobileno4] = useState('');
    const [error, setError] = useState({
        mobileno1: '',
        mobileno2: '',
        character1: '',
        character2: '',
        character3: '',
        typeEmail: '',
        typePass1: '',
        typePass2: '',
        address1: '',
        address2: '',
        mobileno3: '',
        mobileno4: '',
    });


    const handleChange1 = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileno1(value);
            setError((p) => ({ ...p, mobileno1: '' }));
        } else {
            setError((p) => ({ ...p, mobileno1: 'Please enter only digits.' }));
        }
    };

    const handleBlur1 = () => {

        if (mobileno1.length !== 10 && mobileno1.length > 0) {
            setError((p) => ({ ...p, mobileno1: 'Please enter exactly 10 digits.' }));
        } else {
            setError((p) => ({ ...p, mobileno1: '' }));
        }
    };

    const handleChange2 = (e) => {
        const value = e.target.value;

        if (value === '' || /^[1-9]\d{0,9}$/.test(value)) {
            setMobileno2(value);
            setError((p) => ({ ...p, mobileno2: '' }));
        } else {
            setError((p) => ({ ...p, mobileno2: 'Please enter a valid number without leading 0 and max 10 digits.' }));
        }
    };

    const handleBlur2 = () => {

        if (mobileno2.length !== 10 && mobileno2.length > 0) {
            setError((p) => ({ ...p, mobileno2: 'Please enter exactly 10 digits.' }));
        } else {
            setError((p) => ({ ...p, mobileno2: '' }));
        }
    };

    const handleChar1 = (e) => {
        const value = e.target.value;

        if (/^[A-Za-z]{0,25}$/.test(value)) {
            setCharacter1(value);
            setError((p) => ({ ...p, character1: '' }));

        } else {
            setError((p) => ({ ...p, character1: 'enter up to 25 characters.No whitespace is allowed' }))
        }

    }

    const handleBlurChar = () => {
        if (character1.length !== 10 && character1.length > 0) {
            setError((p) => ({ ...p, character1: 'Enter up to 25 characters.' }))
        } else {
            setError((p) => ({ ...p, character1: '' }));
        }
    }

    const handleChar2 = (e) => {
        const value = e.target.value;

        if (/^[A-Za-z]*([ ]?[A-Za-z]*)?$/.test(value)) {
            setCharacter2(value);
            setError((p) => ({ ...p, character2: '' }));
        } else {
            setError((p) => ({ ...p, character2: 'Only letters and one whitespace allowed.' }));
        }
    }

    const handleChar3 = (e) => {
        const value = e.target.value;

        if (/^[A-Za-z0-9!@#$%&*]{0,10}$/.test(value)) {
            setCharacter3(value);
            setError((p) => ({ ...p, character3: '' }));
        }
        else {
            setError((p) => ({ ...p, character3: 'field should contain characters,symbols,numbers' }));
        }
    }

    const handleEmail = (e) => {
        const value = e.target.value;

        setTypeEmail(value);

        if (value === '' || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            setError((p) => ({ ...p, typeEmail: '' }));
        } else {
            setError((p) => ({ ...p, typeEmail: 'Please enter a valid email.' }));
        }
    }

    const handleBlurEmail = () => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(typeEmail)) {
            setError((p) => ({ ...p, typeEmail: 'Please enter a valid email.' }));
        }
    };

    const handlePass1 = (e) => {
        let value = e.target.value;
        if (value.length > 6) {
            value = value.slice(0, 6);  // Limit input to 6 characters
        }
        setTypePass1(value);

        if (value.length === 6 &&
            /[A-Za-z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*]/.test(value)
        ) {
            setTypePass1(value);
            setError((p) => ({ ...p, typePass1: '' }))
        } else {
            setError((p) => ({ ...p, typePass1: 'Password should be 6 character(character,symbol,digit)' }));
        }
    }

    const handlePass2 = (e) => {
        const value = e.target.value;
        setTypePass2(value);
        if (typePass1 === typePass2) {
            setTypePass2(value);
            setError((p) => ({ ...p, typePass2: '' }));
        }
        else {
            setError((p) => ({ ...p, typePass2: "Password doesn't match" }));
        }
    }

    const handleAdd1 = (e) => {
        const value = e.target.value;
        setAddress1(value);

        if (checked) {
            setAddress2(value);
        }
    }

    const handleCheckbox = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        if (isChecked) {
            setAddress2(address1);
        }
        else {
            setAddress2('');
        }

    }

    const handleAdd2 = (e) => {
        const value = e.target.value;
        setAddress2(value);
    }

    const handleChange3 = (e) => {
        const value = e.target.value;

        if (value === '' || /^[1-9]\d{0,9}$/.test(value)) {
            setMobileno3(value);
            setError((p) => ({ ...p, mobileno3: '' }))
        }
        else {
            setError((p) => ({ ...p, mobileno3: 'Mobile number should contain 10 digits' }))
        }

        if (value === mobileno4) {
            setError((p) => ({ ...p, mobileno3: "Mobile Number and WhatsApp Number shouldn't match." }));
        } else {
            setError((p) => ({ ...p, mobileno3: '' }));
        }
    }

    const handleBlur3 = () => {
        if (mobileno3.length !== 10 && mobileno3.length > 0) {
            setError((p) => ({ ...p, mobileno3: 'Mobile number should contain 10 digits' }))

        } else {
            setError((p) => ({ ...p, mobileno3: '' }));
        }
    }

    const handleChange4 = (e) => {
        const value = e.target.value;

        if (value === '' || /^[1-9]\d{0,9}$/.test(value)) {
            setMobileno4(value);
            setError((p) => ({ ...p, mobileno4: '' }))

        } else {
            setError((p) => ({ ...p, mobileno4: 'Whatsapp number should contain 10 digits' }))
        }

        if (value === mobileno3) {
            setError((p) => ({ ...p, mobileno4: "Mobile Number and WhatsApp Number shouldn't match." }));
        } else {
            setError((p) => ({ ...p, mobileno4: '' }));
        }
    }

    const handleBlur4 = () => {
        if (mobileno4.length !== 10 && mobileno4.length > 0) {
            setError((p) => ({ ...p, mobileno4: 'Whatsapp number should contain 10 digits' }))
        } else {
            setError((p) => ({ ...p, mobileno4: '' }))
        }

    }

    const handleFirst = (e) => {
        const value = e.target.value;
        setFirst(value);
        setFull(`${value} ${last}`);
    }

    const handleLast = (e) => {
        const value = e.target.value;
        setLast(value);
        setFull(`${first} ${value}`);
    }

    //to post mobile no to api
    const submitMobile = async(e) =>{
        e.preventDefault();

        const bodyData = {
            mobile1 : Number(mobileno1),
            mobile2 : Number(mobileno2)
        }

        try{
            const fetchMobile = await axios.post(`${apiUrl}/twomobiles`,bodyData);
            console.log(fetchMobile.data);

            if(fetchMobile.status == 200){
                console.log('Data saved successfully..!');
                setMobileno1('');
                setMobileno2('');
            }

        }catch(error){
            console.log('Error occurred during fetching data..!',error)
        }
    }

    //to post characters data to api
    const submitChar = async (e) => {
        e.preventDefault();

        const bodyData = {
            char1: character1,
            char2: character2,
            char3: character3

        }
        try {
            const fetchCharcterData = await axios.post(`${apiUrl}/charactersaves`, bodyData);
            console.log(fetchCharcterData.data);

            if (fetchCharcterData.status == 200) {
                console.log('Data saved successfully..!');
                setCharacter1('');
                setCharacter2('');
                setCharacter3('');
            }

        } catch (error) {
            console.log('Error occurred during fetching data..!', error);
        }
    }

    //to post email and password data to api
    const submitEmail = async (e) => {
        e.preventDefault();

        const bodyData = {
            email: typeEmail,
            password: typePass1
        }

        if (typePass1 === typePass2) {

            try {
                const fetchEmail = await axios.post(`${apiUrl}/emailsaves`, bodyData);
                console.log(fetchEmail.data);

                if (fetchEmail.status == 200) {
                    console.log('Data Saved Successfully..!');
                    setTypeEmail('');
                    setTypePass1('');
                    setTypePass2('');
                }

            } catch (error) {
                console.log('Error Occurred during fetching data..!', error)
            }
        } else {
            console.log('Please Confirm password for posting data');
        }
    }

    //to post address data to the api
    const SubmitAdd = async (e) => {
        e.preventDefault();

        const bodyData = {
            temporaryadd: address1,
            permanentadd: address2
        }

        try {
            const fetchAddData = await axios.post(`${apiUrl}/addresses`, bodyData);
            console.log(fetchAddData.data);

            if (fetchAddData.status == 200) {
                console.log('Data saved sucessfully..!');
                setAddress1('');
                setAddress1('');
            }

        } catch (error) {
            console.log('Error occurred during fetching data..!', error)
        }

    }


    //to post full name data to the api
    const handleFullname = async (e) => {

        e.preventDefault();

        const bodyData = {
            firstname: first, //database field : state variable
            lastname: last,    //database field : state variable
        }

        try {
            const fullnameData = await axios.post(`${apiUrl}/fullnames`, bodyData);
            console.log(fullnameData.data);

            if (fullnameData.status == 200) {
                console.log('Data saved successfully!');
                setFirst('');
                setLast('');
                setFull('');
            }
        } catch (error) {
            console.log('Error occurred during posting data..!', error);
        }

    }

    //to post contact number data to the api
    const handleContactno = async (e) => {
        e.preventDefault();

        const formattedData = {
            mobileno: Number(mobileno3),
            whatsappno: Number(mobileno4),
        }

        try {
            const contactnoData = await axios.post(`${apiUrl}/contactnumbers`, formattedData);
            console.log(contactnoData.data);

            if (contactnoData.status == 200) {
                console.log('Data Saved sucessfully!');
                setMobileno3('');
                setMobileno4('');
            }

        } catch (error) {
            console.log('Error occurred during posting data..!', error)
        }

    }



    return (
        <Container>
            <Paper
                elevation={3}
                sx={{
                    padding: '10px',
                    margin: '30px',
                }}
            >
                <Box
                    sx={{
                        padding: '10px'
                    }}
                >
                    <h1 style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        Validations For Form
                    </h1>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={9} md={9} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Mobile Number 1"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={mobileno1}
                                onChange={handleChange1}
                                onBlur={handleBlur1}
                                error={Boolean(error.mobileno1)}
                                helperText={error.mobileno1}
                                fullWidth
                            />
                        </Col>

                        <Col xl={9} md={9} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Mobile Number 2"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={mobileno2}
                                onChange={handleChange2}
                                onBlur={handleBlur2}
                                error={Boolean(error.mobileno2)}
                                helperText={error.mobileno2}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Button
                            variant='contained'
                            onClick={submitMobile}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Characters1"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={character1}
                                onChange={handleChar1}
                                onBlur={handleBlurChar}
                                error={Boolean(error.character1)}
                                helperText={error.character1}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Characters2(with whitespaces allowed)"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={character2}
                                onChange={handleChar2}
                                error={Boolean(error.character2)}
                                helperText={error.character2}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Characters3(with character,symbol,numbers)"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={character3}
                                onChange={handleChar3}
                                error={Boolean(error.character3)}
                                helperText={error.character3}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Button
                                variant='contained'
                                onClick={submitChar}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='email'
                                label="Email validation"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={typeEmail}
                                onChange={handleEmail}
                                onBlur={handleBlurEmail}
                                error={Boolean(error.typeEmail)}
                                helperText={error.typeEmail}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='password'
                                label="Enter Password"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={typePass1}
                                onChange={handlePass1}
                                error={Boolean(error.typePass1)}
                                helperText={error.typePass1}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='password'
                                label="Confirm Password"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={typePass2}
                                onChange={handlePass2}
                                error={Boolean(error.typePass2)}
                                helperText={error.typePass2}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Button
                                variant='contained'
                                onClick={submitEmail}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={8} md={8} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label='Address1'
                                InputLabelProps={{ shrink: true }}
                                variant='outlined'
                                value={address1}
                                onChange={handleAdd1}
                                error={Boolean(error.address1)}
                                helperText={error.address1}
                                fullWidth
                            />
                        </Col>
                        <Col xl={2} md={2} sm={24} xs={24}>
                            <Checkbox
                                label="Same as above"
                                checked={checked}
                                onChange={handleCheckbox}
                                color="primary"
                            />
                        </Col>
                        <Col xl={8} md={8} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label='Address2'
                                InputLabelProps={{ shrink: true }}
                                variant='outlined'
                                value={address2}
                                onChange={handleAdd2}
                                error={Boolean(error.address2)}
                                helperText={error.address2}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Button
                                variant='contained'
                                onClick={SubmitAdd}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="First Name"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={first}
                                onChange={handleFirst}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Last Name"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={last}
                                onChange={handleLast}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Full Name"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={full}
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Button
                                variant='contained'
                                onClick={handleFullname}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]}
                        style={{
                            margin: '20px'
                        }}
                    >
                        <Col xl={9} md={9} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Mobile Number"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={mobileno3}
                                onChange={handleChange3}
                                onBlur={handleBlur3}
                                error={Boolean(error.mobileno3)}
                                helperText={error.mobileno3}
                                fullWidth
                            />
                        </Col>
                        <Col xl={9} md={9} sm={24} xs={24}>
                            <TextField
                                type='text'
                                label="Whatsapp Number"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                value={mobileno4}
                                onChange={handleChange4}
                                onBlur={handleBlur4}
                                error={Boolean(error.mobileno4)}
                                helperText={error.mobileno4}
                                fullWidth
                            />
                        </Col>
                        <Col xl={4} md={4} sm={24} xs={24}>
                            <Button
                                variant='contained'
                                onClick={handleContactno}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>

                </Box>
            </Paper>
        </Container>
    );
};

export default ValidateForm;
