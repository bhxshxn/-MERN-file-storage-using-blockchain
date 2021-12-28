import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
function Login() {
    const [status, setStatus] = useState()
    const [data, setData] = useState({
        username: undefined,
        password: undefined
    })

    const submit = async (event) => {
        event.preventDefault()
        const result = await axios.post(`/user/login`, data)
        setStatus(result.data.msg)
        if (result.data.msg === 'success') {
            Cookies.set('user', result.data.user.username);
        }
        window.location.reload()
    }
    const inputEvent = (event) => {
        const value = event.target.value
        const name = event.target.name
        setData((prevalue) => {
            if (name === 'username') {
                return {
                    username: value,
                    password: prevalue.password
                }
            } else {
                return {
                    username: prevalue.username,
                    password: value
                }
            }
        })
    }
    if (status === "success") {
        return (
            <>
                <Redirect to="/" />
            </>
        )
    } else if (status) {
        return (
            <div>
                <form class="form-signin" onSubmit={submit}>
                    <h2 class="form-signin-heading">Please Sign in</h2>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {status}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <label for="inputPassword" class="sr-only">Username</label>
                    <input type="text" class="form-control" placeholder="Username"
                        required style={{ marginBottom: 10 }} value={data.username} name='username' onChange={inputEvent} />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" class="form-control" placeholder="Password"
                        required style={{ marginBottom: 10 }} value={data.password} name='password' onChange={inputEvent} />
                    <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Sign in</button>
                </form>
                <ul class="register">New here?<Link to="/register" class="signup">Sign Up.</Link></ul>
            </div>
        )
    } else {
        return (
            <div>
                <form class="form-signin" onSubmit={submit}>
                    <h2 class="form-signin-heading">Please Sign in</h2>
                    <label for="inputPassword" class="sr-only">Username</label>
                    <input type="text" class="form-control" placeholder="Username"
                        required style={{ marginBottom: 10 }} value={data.username} name='username' onChange={inputEvent} />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" class="form-control" placeholder="Password"
                        required style={{ marginBottom: 10 }} value={data.password} name='password' onChange={inputEvent} />
                    <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Sign in</button>
                </form>
                <ul class="register">New here?<Link to="/register" class="signup">Sign Up.</Link></ul>
            </div>)
    }
}

export default Login