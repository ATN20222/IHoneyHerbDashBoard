import React, { useState, useEffect } from "react";
import './Notifications.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListCategories, ListCoupons, ListNotifications, RemoveCategory } from "../../Services/Api"; // Importing ListCategories and RemoveCategory functions


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListNotifications(auth_key, user_id);
                console.log(response);
                if(response.status){
                    
                    setNotifications(response.notifications); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Notifications</h3>
                <Link className="btn btn-warning" to="/addnotification">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>En Title</th>
                            <th>Ar Title</th>
                            <th>En Description</th>
                            <th>Ar Description</th>
                            <th>Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notification, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>{notification.title_en}</td>
                                <td>{notification.title_ar}</td> 
                                <td>{notification.body_en}</td> 
                                <td>{notification.body_ar}</td> 
                                <td>{notification.added_on}</td> 
                                
                               
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Notifications;
