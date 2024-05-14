import React, { useState, useEffect } from "react";
import './Orders.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {  ListNotifications, ListOrderStatus, ListOrders } from "../../Services/Api"; 


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [OrderStatus, setOrderStatus] = useState([]);
    const [selectedState, setselectedState] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListOrders(auth_key, user_id);
                const statusResponse = await ListOrderStatus(auth_key , user_id ,'0');
                console.log(statusResponse);
                if(response.status &&statusResponse.status){
                    
                    setOrders(response.orders);
                    setOrderStatus(statusResponse.statuses);
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    
    const ChangeState = async (e)=>{
        setselectedState(e);
        setOrders([]);
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            console.log(auth_key, user_id ,e);
            const response = await ListOrders(auth_key, user_id ,e);            
            if(response.status){
                
                setOrders(response.orders);
               
            }else{
                if(response.msg === "Wrong key"){
                    localStorage.removeItem('token');
                    alert("session exprired ");
                    
                    window.location.href = '/login';
                  }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Orders</h3>
                
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            
                            <th className="OrderstTh">Order ID</th>
                            <th className="OrderstTh">User ID</th>
                            <th className="OrderstTh">Total Cost</th>
                            <th className="OrderstTh">Order Date</th>
                            <th className="OrderstTh">Arrival Date</th>
                            <th>
                            
                            <select 
                                className="col-lg-12 form-select OrderStatus"
                                value={selectedState}
                                onChange={(e) => ChangeState(e.target.value)}
                            
                            >
                            <option value={0}>Status</option>
                            {OrderStatus.map(OrderState => (
                                <option key={OrderState.id} value={OrderState.id}>{OrderState.status_en}</option>
                            ))}
                            </select>
                            </th>
                            <th className="OrderstTh">Edit</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                
                                
                                <td>{order.id}</td>
                                <td>{order.user_id}</td> 
                                <td>{order.total_cost}</td> 
                                <td>{order.order_date}</td> 
                                <td>{order.arrival_date ||"_______"}</td> 
                                <td>{order.order_status_name}</td> 
                                
                                
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editorder/${order.id}`}
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

export default Orders;
