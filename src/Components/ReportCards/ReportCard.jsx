import React from "react";
import './ReportCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReportCard = ({Icon ,color , text , count})=>{
    return(
        <div className={`col-lg-5 .col-md-5 col-sm-12 col-12 card RepoCard `}>
            <div className="row InnerRepoCardRow">
                <div className="col-lg-6 ">
                    <FontAwesomeIcon icon={Icon} />
                    <h3 className={`RepoCardText`} >{text}</h3>
                </div>
                <div className="col-lg-6 Center">
                    <h1 className={` ${color}`}>{count}</h1>
                </div>
            </div>
        </div>
    );
}
export default ReportCard;