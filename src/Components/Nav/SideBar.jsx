import React, { useState } from "react";
import './SideBar.css';
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCubesStacked, faDoorOpen, faHome, faLayerGroup, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

const SideBar = () =>{
    const [ShowSideBar, setShowSideBar] = useState(false);
    const OpenMenu = ()=>{
        setShowSideBar(!ShowSideBar);
    }
    const Logout = ()=>{
        localStorage.setItem('token', '') ;
        window.location.href="/login";
    }
    const handleLinkClick = () => {
        setShowSideBar(!ShowSideBar);
    };
    return(
        <div className={`col-lg-2 col-md-3 col-sm-3 SideMenu ${!ShowSideBar ? 'ShowSideBar' : ''}`}>
            <div className="InsideMenu ">
                <div className="LogoContainer">
                    <img src={Logo} alt="" width="50px"/> 
                    <span className='LogoWords Center'>
                    <span className='Word-1'>I</span> <span className='Word-2 InSideBar'>HONEY</span><span className='Word-3'>HERB</span>

                    </span>
                </div>
                <div className="container">
                    <hr />
                </div>
                <div className="MenuText" onClick={OpenMenu}>
                    MENU
                </div>
                <div className="SideBarItems">
                    <ul className="list-unstyled">
                    <li className="list-item">
                            <Link onClick={handleLinkClick} to="home" className="LinkItem"> <FontAwesomeIcon icon={faHome}/>  Home </Link>
                        </li>
                        <li className="list-item">
                            <Link onClick={handleLinkClick} to="/categories" className="LinkItem"> <FontAwesomeIcon icon={faLayerGroup}/>  Categories </Link>
                        </li>
                        <li className="list-item">
                            <Link onClick={handleLinkClick}  className="LinkItem" to="/products"> <FontAwesomeIcon icon={faBox}/>  Products </Link>
                        </li>
                        <li className="list-item">
                            <Link onClick={handleLinkClick} className="LinkItem" to="/variations"> <FontAwesomeIcon icon={faCubesStacked}/>  Variations </Link>
                        </li>
                        <li className="list-item">
                            <Link  className="LinkItem" onClick={Logout} > <FontAwesomeIcon icon={faDoorOpen}/>  logout </Link>
                        </li>
                        
                    </ul>
                </div>



            </div>
                
        </div>
    );
}    
export default SideBar;