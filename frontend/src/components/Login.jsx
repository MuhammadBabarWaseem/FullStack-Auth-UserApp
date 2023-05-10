import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        window.onpopstate = async function (event) {
            try {
                await axios.delete('http://localhost:5000/logout')
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate('/dashboard')

        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }

    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={handleLogin} className="box">
                                <p className="has-text-centered">{msg}</p>
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
                                    <button type='submit' className="button is-success is-fullwidth">Login</button>
                                </div>
                                <Link to='/'>Don't Have an Account, Register here!</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
