import { CloseCircleFilled, EyeFilled } from '@ant-design/icons';
import { Paper, Tooltip, Typography } from '@mui/material'
import { Space, Table} from 'antd';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from "axios";
import { apiUrl } from '../Config';
import { useNavigate } from 'react-router-dom';

const RouteTable = () => {
    const [tabledata, setTabledata] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const columns = [
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title={<Typography style={{ fontSize: 14 }}>Update Data</Typography>} placement='left-start'>
                        <EyeFilled onClick={() => handleEdit(record.id)} style={{ cursor: 'pointer', fontSize: 15 }} />
                    </Tooltip>
                    <Tooltip title={<Typography style={{ fontSize: 14 }}>Delete Data</Typography>} placement='right-start'>
                        <CloseCircleFilled onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(record.id);
                        }} style={{ cursor: 'pointer', color: '#ff0000', fontSize: 15 }} />
                    </Tooltip>
                </Space>)
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'first_name',
            width: 150
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'last_name',
            width: 150
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phone_number',
            width: 150
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            width: 150,
            render: (text) => new Date(text).toLocaleDateString()
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 150
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 150
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            width: 150
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 150
        }

    ]

    //to get data into table
    const getData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/routeforms`);
            console.log(res.data);
            setLoading(false);
            setTabledata(res.data);
            console.log(tabledata);
        } catch (error) {
            console.log('Error occurred during fetching data:', error);
        }
    }

    //to navigate edit function to the main routeForm form
    const handleEdit = (id) =>{
        navigate(`routeform/${id}`);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <Paper>
                <Table
                    dataSource={tabledata}
                    columns={columns}
                    loading={loading}
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 240 }}
                    style={{
                        margin: '10px',
                        padding: '20px'
                    }}
                />
            </Paper>
        </Container>
    )
}

export default RouteTable
