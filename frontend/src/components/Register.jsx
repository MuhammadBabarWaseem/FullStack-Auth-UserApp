import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            });
            navigate('/login')

        } catch (error) {
            alert(error)
        }

    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleRegister} className="box">

                                <div className="field mt-5">
                                    <label className="label">First Name</label>
                                    <div className="controls">
                                        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} className='input' placeholder='Enter Your FirstName' />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <label className="label">Last Name</label>
                                    <div className="controls">
                                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} className='input' placeholder='Enter Your Last Name' />
                                    </div>
                                </div>


                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='input' placeholder='Enter Your Email' />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='**********' />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <button type='submit' className="button is-success is-fullwidth">Register</button>
                                </div>

                                <Link to='/login'>Already Have an Account, Signin here!</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
