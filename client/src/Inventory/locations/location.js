import React, { useEffect, useState } from "react";
export function Location(){
    const [fetchd, setFetchd] = useState([])
  useEffect(() => {
    fetch("http://localhost:3017/getlocation")
      .then(result => result.json())
      .then(data => setFetchd(data))
  })
    return(
        
        <> 
        <div className="location ">
         <h1 className="text-center text-light p-5 m-3 text-uppercase">location</h1>
        {
        fetchd.map((value,index)=>(
            <div class="card text-center container mb-5 loc-card ">
              <div class="card-header">
    Featured
  </div>
      <div class="card-body">
        <h5 class="card-title">{value.location_name}</h5>
        <a href="/dashboard" class="btn btn-primary btn-bg">view</a>
      </div>
    </div>
   
        ))
        }
        </div>
        </>
    );
}