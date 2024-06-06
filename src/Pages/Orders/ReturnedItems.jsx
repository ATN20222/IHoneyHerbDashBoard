import React, { useState, useEffect } from "react";
import './Orders.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {  ListNotifications, ListOrderStatus, ListOrders, ListReturnedItems } from "../../Services/Api"; 
import Swal from "sweetalert2";


const ReturnedItems = () => {
    const [orders, setOrders] = useState([]);
    const [OrderStatus, setOrderStatus] = useState([]);
    const [selectedState, setselectedState] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListReturnedItems(auth_key, user_id);
                
                console.log(response)
                if(response.status ){
                    
                    setOrders(response.return_items);
                    
                }else{
                    if(response.msg === "Wrong key"){
                      localStorage.removeItem('token');
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "session exprired",
                        showConfirmButton: false,
                        timer: 3000
                      });
                      setTimeout(() => {
                        window.location.href = "/login";
              
                    }, 3000);
                    }else{
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Failed",
                        showConfirmButton: false,
                        timer: 3000
                      });
                    }
                  }
            } catch (error) {
                console.error('Error', error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed",
                    showConfirmButton: false,
                    timer: 3000
                  });
            }
        };

        fetchData();
    }, []);

    
    
    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Orders</h3>
                
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th className="OrderstTh">Order ID</th>
                            <th className="OrderstTh">Item ID</th>
                            <th className="OrderstTh">User ID</th>
                            <th className="OrderstTh">Product ID</th>
                            <th className="OrderstTh">Edit</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                
                                <td>{index + 1}</td>
                                <td>{order.order_id}</td>
                                <td>{order.order_item_id}</td> 
                                <td>{order.user_id}</td> 
                                <td>{order.product_id}</td> 
                                
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editorder/${order.order_id}`}
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Link>
                                </td>
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReturnedItems;
