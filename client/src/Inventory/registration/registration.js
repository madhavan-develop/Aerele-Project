import React from "react";
import axios from 'axios';
export function Register(){
    function reg(event){
        event.preventDefault()
        var fname=document.getElementById("fname").value
        var lname=document.getElementById("lname").value
        var phone=document.getElementById("phone").value
        var email=document.getElementById("email").value
        var city=document.getElementById("city").value
        var state=document.getElementById("state").value
        var password=document.getElementById("password").value
        var key={
            fname:fname,
            lname:lname,
            phone:phone,
            email:email,
            city:city,
            state:state,
            password:password

        }
        if(fname==""){
            alert("please enter the first name")
        }
        else if(lname==""){
            alert("please enter the last name")
        }
        else if(phone==""){
            alert("please enter your mobile number")
        }
        else if(email==""){
            alert("please enter your email")
        }
        else if(city==""){
            alert("please enter your city")
        }
        else if(state==""){
            alert("please enter your state")
        }
        else if(password==""){
            alert("please enter your password")
        }
        else{
            axios.post("http://localhost:3017/register",key)
            .then((res)=>{
                if(res.data.status==="error"){
                    alert("data are not inserted ")
                    window.location.reload()
                }
                else if(res.data.status==="success"){
                    alert("data are inserted")
                    window.location.href="/login"
                }

             })
        }
    }
    return(
        <>
        <div class="register">
        <div class="text-center d-flex flex-column align-items-center ">
        <form onSubmit={reg}>
        <h1 class="mt-5">REGISTER FORM</h1>
        <table className='p-2' cellpadding="10px">
            <tr>
                <td>
                <label>FIRST NAME</label> </td> 
                <td> <input type="text"id="fname" placeholder='Enter your First Name'/></td>
            </tr>
            <tr>
                <td><label>LAST NAME</label></td> 
                <td><input type="text" id="lname"placeholder='Enter your Last Name'/><br/></td>
            </tr>
            <tr>
                <td><label>PHONE NUMBER</label></td> 
                    <td> <input type="tel" id="phone" placeholder='Enter your Mobile Number'/></td>
            </tr>
            <tr>
                <td> <label>EMAIL</label></td>
                    <td> <input type="email" id="email" placeholder='Enter your Email ID'/></td>
            </tr>
            <tr>
                <td> <label>City</label></td>
                    <td> <input type="text" id="city"/></td>
            </tr>
            <tr>
                <td> <label>STATE</label></td>
                    <td> <input type="text" id="state"/> </td>
            </tr>
            <tr>
                <td>  <label>PASSWORD</label></td>
                    <td> <input type="password" id="password" placeholder='Enter Your Password'/> </td>
            </tr>
            <tr>
             <td><button className='btn btn-primary'>SUBMIT</button>
            </td></tr>
        </table>
        </form>
    </div> 
    </div>
        </>
    );
}