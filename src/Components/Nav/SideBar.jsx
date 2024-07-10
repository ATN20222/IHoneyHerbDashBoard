import React, { useState } from "react";
import './SideBar.css';
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBox, faBoxArchive, faBullhorn, faCircleQuestion, faComment, faComments, faCubesStacked, faDoorOpen, faFlag, faGear, faHand, faHome, faImages, faLayerGroup, faMobile, faQuestion, faScrewdriverWrench, faTicket, faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";
import ConfirmLogout from "./confirmLogout";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
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
                            <Link onClick={handleLinkClick}  className="LinkItem" to="/products"> <FontAwesomeIcon icon={faBox}/>  Products </Link>
                        </li>
                        <li className="list-item">
                            <Link onClick={handleLinkClick} className="LinkItem" to="/variations"> <FontAwesomeIcon icon={faCubesStacked}/>  Variations </Link>
                        </li>

                        <li className="list-item">
                            <Link onClick={handleLinkClick} to="/categories" className="LinkItem"> <FontAwesomeIcon icon={faLayerGroup}/>  Categories </Link>
                        </li>
                        
                        
                        <li className="list-item">
                            <Link onClick={handleLinkClick} to="/groups" className="LinkItem"> <FontAwesomeIcon icon={faBoxArchive}/>  Groups </Link>
                        </li>
                        
                        <li className="list-item">
                            <Link  onClick={handleLinkClick} className="LinkItem" to="/WellnessQuiz"> <FontAwesomeIcon icon={faQuestion}/>  WellnessQuiz </Link>
                        </li>

                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/Orders"> <FontAwesomeIcon icon={faTruckFast}/>  Orders </Link>
                        </li>

                       
                        {/* <li className="list-item">
                            <button disabled onClick={handleLinkClick} className="LinkItem" to="/Chat"> <FontAwesomeIcon icon={faComments}/> Chat </button>
                        </li> */}

                        <li className="list-item">
                            <Link  onClick={handleLinkClick} className="LinkItem" to="/Coupons"> <FontAwesomeIcon icon={faTicket}/>  Coupons </Link>
                        </li>

                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/Reviews"> <FontAwesomeIcon icon={faComment}/>  Reviews </Link>
                        </li>
                        <li className="list-item">
                            <Link  onClick={handleLinkClick} className="LinkItem" to="/screens"> <FontAwesomeIcon icon={faMobile}/> Intro Screens </Link>
                        </li>
                        <li className="list-item">
                            <Link  onClick={handleLinkClick} className="LinkItem" to="/websiteslider"> <FontAwesomeIcon icon={faImages}/> Slider </Link>
                        </li>
                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/Users"> <FontAwesomeIcon icon={faUser}/>  Users </Link>
                        </li>

                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/Notifications"> <FontAwesomeIcon icon={faBell}/>  Notifications </Link>
                        </li>
                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/returnrequests"> <FontAwesomeIcon icon={faBullhorn}/>  Return Requests </Link>
                        </li>

                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/faq"> <FontAwesomeIcon icon={faCircleQuestion}/>  FAQ </Link>
                        </li>

                        <li className="list-item">
                            <Link disabled onClick={handleLinkClick} className="LinkItem" to="/regions"> <FontAwesomeIcon icon={faFlag}/>  Regions </Link>
                        </li>

                        <li className="list-item">
                            <Link  className="LinkItem" onClick={()=>setShowDeleteModal(true)} > <FontAwesomeIcon icon={faDoorOpen}/>  logout </Link>
                        </li>
                        
                    </ul>
                </div>
                {showDeleteModal && (
                <ConfirmLogout onClose={() => setShowDeleteModal(false)} onConfirmDelete={Logout} />
                )}


            </div>
                
        </div>
    );
}    
export default SideBar;