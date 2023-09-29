import axios from "axios";
import React from "react";
import Typewriter from "typewriter-effect";
import './app.css';
import { Link } from "react-router-dom";
export function Login() {
    function log(event) {
        event.preventDefault()
        var username = document.getElementById("uname").value
        var password = document.getElementById("pass").value
        var key = {
            username: username,
            password: password
        }
        if (username == "") {
            alert("enter the user name")
        }
        else if (password == "") {
            alert("enter the password")
        }
        else {
            axios.post("http://localhost:3017/login", key)
                .then((res) => {
                    if (res.data.status === "empty set") {
                        alert("please check ")
                    }
                    else if (res.data.status === "success") {
                        var id = res.data.id
                        alert("successfully log in")
                        window.location.href = `/dashboard/${id}`
                    }
                    else if (res.data.status === "invalid_user") {
                        alert("plz enter valid user name")
                    }
                    else if (res.data.status === "error") {
                        alert("all the data are invalid")
                    }
                    else {
                        alert("please enter all details")
                    }
                }

                )
        }
    }
    return (
        <>
            <div className="loginpage">
                <div class="login-container">
                    <h2 className="text-center"><Typewriter
                        options={{
                            strings: "LOG IN",
                            autoStart: true,
                            loop: true,
                        }}
                    /></h2>
                    <form onSubmit={log} className>
                        <label className="text-light">Username</label>
                        <input type="text" id="uname" name="uname" classsname="text" required />
                        <label className="text-light">Password</label>
                        <input type="password" id="pass" name="password" required className="mb-2" />
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/reg" className="text-light">sign in</Link>
                </div>
            </div>
        </>
    );
}