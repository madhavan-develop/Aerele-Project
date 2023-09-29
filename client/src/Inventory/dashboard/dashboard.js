import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export function Dashboard(){
    const [fetchd, setFetchd] = useState([])
  useEffect(() => {
    fetch("http://localhost:3017/getallproduct")
      .then(result => result.json())
      .then(data => setFetchd(data))
  })
  const dlte=(product_id)=>{
    var key={product_id:product_id}
    axios.post("http://localhost:3017/delete",key)
    .then((res)=>{
      if(res.data.status==="error"){
        alert("data are not deleted")
      }
      else if(res.data.status==="success"){
        alert("data are deleted successfully")
      }
    })
  }
  var {id}=useParams()
  const[fname,setFname]=useState([])
  useEffect(()=>{
    fetch(`http://localhost:3017/getsingleadmin/`+id)
    .then(res=>res.json())
    .then((output)=>{
    setFname(output[0].fname)
    })
  })
    return(
        <>
        <div className="dashboard">
       <h1 className="text-center">WELCOME TO DASHBOARD {fname}</h1>
        <Link to="/add"><button className="me-2 btn btn-primary rounded">ADD PRODUCT</button></Link>
        <Link to="/loc"><button className="btn btn-success rounded me-2">view locations</button></Link>
        <Link to="/home"><button className="btn btn-danger me-2">Logout</button></Link>
    <h1 className='text-center mt-5'>PRODUCT DETAILS</h1>
      <div className='text-center d-flex justify-content-center flex-column align-items-center  container'>
        <table className="tablealign">
          <thead>
            <tr> 
              <th>S.NO</th> 
              <th>PRODUCT NAME</th>
              <th>PRODUCT DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>FROM LOCATION</th>
              <th>EDIT</th>
              <th>DELETE</th>
              <th>DISPATCH</th>
            </tr>
          </thead>
          <tbody>
            {
              fetchd.map((value, index) => (
                <tr>
                  <td>{value.product_id}</td>
                  <td>{value.pname}</td>
                  <td>{value.p_des}</td>
                  <td>{value.category}</td>
                  <td>{value.quantity}</td>
                  <td>{value.price}</td>
                  <td>{value.from_loc}</td>
                  <td><Link to={`/proupd/${value.product_id}`}><button className='btn btn-success'>Edit</button></Link></td>
                  <td><button className='btn btn-danger'onClick={()=>{dlte(value.product_id)}}>delete</button></td>
                  <td><Link to={`/dispatch/${value.product_id}`}><button className="btn btn-primary rounded">Dispatch</button></Link></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
        </>
    );
}