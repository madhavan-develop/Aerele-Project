import axios from "axios";
import React from "react";
export function Add() {
    function add(event) {
        event.preventDefault()
        var pname = document.getElementById("pname").value
        var p_des = document.getElementById("des").value
        var category = document.getElementById("cat").value
        var quantity = document.getElementById("qty").value
        var price = document.getElementById("price").value
        var from_loc = document.getElementById("fromloc").value
        var key = {
            pname: pname,
            p_des: p_des,
            category: category,
            quantity: quantity,
            price: price,
            from_loc: from_loc
        }
        if (pname = "") {
            alert("please enter product name")
        }
        else if (p_des = "") {
            alert("please enter product description")
        }
        else if (category = "") {
            alert("please enter the category")
        }
        else if (quantity = "") {
            alert("please enter quantity")
        }
        else if (price = "") {
            alert("please enter price")
        }
        else if (from_loc = "") {
            alert("please enter the from location")
        }
        else {
            axios.post("http://localhost:3017/addproduct", key)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("data are not inserted ")
                        window.location.reload()
                    }
                    else if (res.data.status === "success") {
                        alert("data are inserted")
                        window.location.href = "/dashboard"
                    }
                })
        }
    }
    return (
        <>
            <div class="text-center d-flex flex-column align-items-center addproduct">
                <form onSubmit={add}>
                    <h1 class="mt-5">ADD PRODUCT FORM</h1>
                    <table className='p-2' cellpadding="10px">
                        <tr>
                            <td><label>PRODUCT NAME</label> </td>
                            <td> <input type="text" id="pname" placeholder='Enter the product Name' /></td>
                        </tr>
                        <tr>
                            <td><label>PRODUCT DESCRIPTION</label> </td>
                            <td> <input type="text" id="des" placeholder='Enter the product Name' /></td>
                        </tr>
                        <tr>
                            <td><label>CATEGORY</label></td>
                            <td><input type="text" id="cat" placeholder='Enter the category' /><br /></td>
                        </tr>
                        <tr>
                            <td><label>QUANTITY</label></td>
                            <td> <input type="text" id="qty" placeholder='Enter the quantity' /></td>
                        </tr>
                        <tr>
                            <td><label>PRICE</label></td>
                            <td><input type="text" id="price" placeholder='Enter the price' /></td>
                        </tr>
                        <tr>
                            <td><label>FROM LOCATION</label></td>
                            <td><input type="text" id="fromloc" placeholder='Enter the from location' /></td>
                        </tr>
                        <tr>
                            <td><button className='btn btn-primary'>SUBMIT</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </>
    );
}