import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import home from '../home/home.jpg';
import 'aos/dist/aos.css';
import Aos from 'aos';
export function Home() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div className="row homepage">
        <h1 className="text-center mt-5 p-5"><Typewriter
          options={{
            strings: "INVENTORY MANAGEMENT SYSTEM",
            autoStart: true,
            loop: true,
          }}
        /></h1>
        <div className="col-lg-6 p-5">
          <img src={home} className="img-fluid" data-aos="fade-down" />
        </div>
        <div className="col-lg-6 p-5 " data-aos="fade-down">
          <p>The goal is to create web application usin ReactJS framework to manage inventory of a list of products in respective warehouses.imaging this application will be used in a shop or a warehouses that needs to keep track of various locations</p><br></br>
          <Link to="/log"><button className="bg-warning rounded text-center me-2 but">LOG IN</button></Link>
          <Link to="/cont"><button className="bg-warning rounded text-center  but">contact</button></Link>
        </div>
      </div>
    </>
  );
}