import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export function Dispatch() {
    let { product_id } = useParams()
    const [pname, setPname] = useState("")
    const [p_des, setP_des] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [from_loc, setFrom_loc] = useState("")

    useEffect(() => {
        fetch('http://localhost:3017/getsingle/' + product_id)
            .then(res => res.json())
            .then((out) => {
                console.log(out)
                setPname(out[0].pname)
                setP_des(out[0].p_des)
                setCategory(out[0].category)
                setQuantity(out[0].quantity)
                setFrom_loc(out[0].from_loc)
            })
    }, [])
    function dis(event) {
        event.preventDefault()
        var pname = document.getElementById("pname").value
        var p_des = document.getElementById("des").value
        var category = document.getElementById("cat").value
        var quantity = document.getElementById("qty").value
        var d_quantity = document.getElementById("dis").value
        var from_loc = document.getElementById("fromloc").value
        var to_loc = document.getElementById("toloc").value
        var dispatchtime = document.getElementById("time").value
        var key = {
            pname: pname,
            p_des: p_des,
            category: category,
            quantity: quantity,
            d_quantity: d_quantity,
            from_loc: from_loc,
            to_loc: to_loc,
            dispatchtime: dispatchtime
        }
        if (pname == "") {
            alert("please enter the product name")
        }
        else if (p_des = "") {
            alert("please enter product description")
        }
        else if (category == "") {
            alert("please enter the category")
        }
        else if (quantity == "") {
            alert("please enter the quantity")
        }
        else if (d_quantity = "") {
            alert("please enter dispatch quantity")
        }
        else if (from_loc == "") {
            alert("please enter the from location")
        }
        else if (to_loc == "") {
            alert("please enter the to location")
        }
        else {
            axios.post("http://localhost:3017/dispatch/" + product_id, key)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("data are not inserted ")
                    }
                    else if (res.data.status === "success") {
                        alert("data are inserted")
                    }

                })
        }
    }
    return (
        <>
            <div class="text-center d-flex flex-column align-items-center dispatch">
                <h1 className="text-dark">DISPATCH PRODUCT</h1>
                <form onSubmit={dis}>
                    <table className='p-2' cellpadding="10px">
                        <tr>
                            <td><label>PRODUCT NAME</label> </td>
                            <td> <input type="text" id="pname" placeholder='Enter the product Name' value={pname} /></td>
                        </tr>
                        <tr>
                            <td><label>PRODUCT DESCRIPTION</label> </td>
                            <td> <input type="text" id="des" placeholder='Enter the description' value={p_des} /></td>
                        </tr>
                        <tr>
                            <td><label>CATEGORY</label></td>
                            <td><input type="text" id="cat" placeholder='Enter the category' value={category} /></td>
                        </tr>
                        <tr>
                            <td><label> QUANTITY</label></td>
                            <td><input type="text" id="qty" placeholder='Enter the  quantity' value={quantity} /></td>
                        </tr>
                        <tr>
                            <td><label>DISPATCH QUANTITY</label></td>
                            <td><input type="text" id="dis" placeholder='Enter the dispatch quantity' /><br /></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><label>FROM LOCATION</label></td>
                            <td><input type="text" id="fromloc" placeholder='Enter the from location' value={from_loc} /></td>
                        </tr>
                        <tr>
                            <td><label>TO LOCATION</label></td>
                            <td><input type="text" id="toloc" placeholder='Enter the to location' /></td>
                        </tr>
                        <tr>
                            <td><label>DISPATCH TIME</label></td>
                            <td><input type="datetime-local" id="time" placeholder='Enter the to location' /></td>
                        </tr>
                        <tr>
                            <td><button className='btn btn-primary'>SUBMIT</button>
                            </td></tr>
                    </table>
                </form>
            </div>
        </>
    );
}