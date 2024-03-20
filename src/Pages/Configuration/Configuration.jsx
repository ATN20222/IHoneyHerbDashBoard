import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import './Configuration.css';
const Configuration = ()=>{




    return(
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol">
            <div className="CategoriesHeader">
                <h3 >Configuration</h3>
            </div>


            <div className="row ConfigurationRow">
                <div className="col-lg-12">
                <ul className="list-unstyled">
                    <li className="list-item">
                        <Link to="/addvariation" className="LinkItem"> <FontAwesomeIcon icon={faCubesStacked}/>  Add Variations </Link>
                    </li>
                </ul>
                </div>
            </div>
            
        </div>
    );



}

export default Configuration;