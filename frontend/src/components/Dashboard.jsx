import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUser()
    }, [])

    const refreshToken = async () => {
        try {
            const respone = await axios.get('http://localhost:5000/token');
            setToken(respone.data.accessToken);
            const decoded = jwt_decode(respone.data.accessToken)
            setName(`${decoded.firstname} ${decoded.lastname}`)
            setExpire(decoded.exp);
        } catch (error) {
            navigate('/login')
            setTimeout(() => {
                alert('Login Required To Continue')
            }, "1000");
            if (error.respone) {
                navigate('/login')
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const respone = axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${respone.data.accessToken}`;
            setToken(respone.data.accessToken);
            const decoded = jwt_decode(respone.data.accessToken)
            setName(`${decoded.firstname} ${decoded.lastname}`)
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    const getUser = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }


    return (
        <div>
            <Navbar />
            <div className="container mt-t">
                <h1>Welcome Back : {name}</h1>
                <button onClick={getUser} className='button is-info'>Get Users</button>
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
