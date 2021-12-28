
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function Register() {
    const [response, setResponse] = useState()
    const [data, setData] = useState({
        email: undefined,
        username: undefined,
        password: undefined
    })

    const submit = async (event) => {
        event.preventDefault()
        const result = await axios.post(`/user/register`, data)
        setResponse(result.data.msg)
        setData({
            email: '',
            username: '',
            password: ''
        })
    }
    const inputEvent = (event) => {
        const value = event.target.value
        const name = event.target.name
        setData((prevalue) => {
            if (name === 'email') {
                return {
                    email: value,
                    username: prevalue.username,
                    password: prevalue.password
                }
            } else if (name === 'username') {
                return {
                    email: prevalue.email,
                    username: value,
                    password: prevalue.password
                }
            } else {
                return {
                    email: prevalue.email,
                    username: prevalue.username,
                    password: value
                }
            }
        })
    }
    if (response === undefined) {
        return (
            <>
                <div class="center-text">
                    <form class="form-signin" onSubmit={submit} >
                        <h2 class="form-signin-heading">Please Sign up</h2>
                        <label for="inputEmail" class="sr-only">Email address</label>
                        <input type="text" class="form-control" placeholder="Email address"
                            required autofocus style={{ marginBottom: 10 }} value={data.email} name='email' onChange={inputEvent} />
                        <label for="inputPassword" class="sr-only">Username</label>
                        <input type="text" class="form-control" placeholder="Username"
                            required style={{ marginBottom: 10 }} value={data.username} name='username' onChange={inputEvent} />
                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" class="form-control" placeholder="Password"
                            required style={{ marginBottom: 10 }} value={data.password} name='password' onChange={inputEvent} />

                        <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Sign up</button>
                    </form>
                    <ul class="register" style={{ marginBottom: 15 }}>Back to<Link to="/login" class="signup"> Login.</Link></ul>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div class="center-text">
                    <form class="form-signin" onSubmit={submit} >
                        <h2 class="form-signin-heading">Please Sign up</h2>
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            {response}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <label for="inputEmail" class="sr-only">Email address</label>
                        <input type="text" class="form-control" placeholder="Email address"
                            required autofocus style={{ marginBottom: 10 }} value={data.email} name='email' onChange={inputEvent} />
                        <label for="inputPassword" class="sr-only">Username</label>
                        <input type="text" class="form-control" placeholder="Username"
                            required style={{ marginBottom: 10 }} value={data.username} name='username' onChange={inputEvent} />
                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" class="form-control" placeholder="Password"
                            required style={{ marginBottom: 10 }} value={data.password} name='password' onChange={inputEvent} />

                        <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Sign up</button>
                    </form>
                    <ul class="register" style={{ marginBottom: 15 }}>Back to<Link to="/login" class="signup"> Login.</Link></ul>
                </div>
            </>
        )
    }

}

export default Register