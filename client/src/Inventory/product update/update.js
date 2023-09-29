
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export function Update() {
    let { product_id } = useParams()
    const [pname, setPname] = useState("")
    const [p_des, setP_des] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    useEffect(() => {
        fetch('http://localhost:3017/getsingle/' + product_id)
            .then(res => res.json())
            .then((out) => {
                setPname(out[0].pname)
                setP_des(out[0].p_des)
                setCategory(out[0].category)
                setQuantity(out[0].quantity)
                setPrice(out[0].price)
            })
    }, [])
    function proupd(event) {
        event.preventDefault()
        var pname = document.getElementById("pname").value
        var p_des = document.getElementById("des").value
        var category = document.getElementById("cat").value
        var quantity = document.getElementById("qty").value
        var price = document.getElementById("price").value
        var key = {
            pname: pname,
            p_des: p_des,
            category: category,
            quantity: quantity,
            price: price
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
        else {
            axios.put("http://localhost:3017/productupdate/" + product_id, key)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("data are not updated")
                    }
                    else if (res.data.status === "update") {
                        alert("data are updated")
                    }
                })
        }
    }
    return (
        <>
            <div class="text-center d-flex flex-column align-items-center update">
                <h1>PRODUCTS UPDATE</h1>
                <form onSubmit={proupd}>
                    <table className='p-2' cellpadding="10px">
                        <tr>
                            <td>
                                <label>PRODUCT NAME</label> </td>
                            <td> <input type="text" id="pname" placeholder='Enter the product Name' value={pname} onChange={(upto) => setPname(upto.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>
                                <label>PRODUCT DESIGNATION</label> </td>
                            <td> <input type="text" id="des" placeholder='Enter the product Name' value={p_des} onChange={(upto) => setP_des(upto.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label>CATEGORY</label></td>
                            <td><input type="text" id="cat" placeholder='Enter the category' value={category} onChange={(upto) => setCategory(upto.target.value)} /><br /></td>
                        </tr>
                        <tr>
                            <td><label>QUANTITY</label></td>
                            <td> <input type="text" id="qty" placeholder='Enter the quantity' value={quantity} onChange={(upto) => setQuantity(upto.target.value)} /></td>
                        </tr>
                        <tr>
                            <td> <label>PRICE</label></td>
                            <td> <input type="text" id="price" placeholder='Enter the price' value={price} onChange={(upto) => setPrice(upto.target.value)} /></td>
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