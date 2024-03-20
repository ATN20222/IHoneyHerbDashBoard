import React from "react";
import './Home.css'
import Logo from '../../Assets/Images/I_H_H_LOGO.png'
const Home = ()=>{
    return(
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol">
            <img src={Logo} width="20%" alt="" />
            <h1 className="WelcomeText">Welcome to IHoneyHerb Dashboard</h1>
        </div>
    );
}
export default Home; 