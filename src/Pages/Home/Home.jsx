import React, { useEffect, useState } from "react";
import './Home.css'
import Logo from '../../Assets/Images/I_H_H_LOGO.png'
import ReportCard from "../../Components/ReportCards/ReportCard";
import { faUser , faUserSlash , faTruckFast , faBox,faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { ListActivities, ListCategoriesOrders, ListOrdersStatus, ListProducts } from "../../Services/Api";
import Swal from "sweetalert2";

const Home = ()=>{
    const [Users , setUsers] = useState({});
    const [Orders , setOrders] = useState([]);
    const [Products , setProducts] = useState([]);
    const [CatsOrders , setCatsOrders] = useState([]);

    useEffect(()=>{
        getUsers();
        getOrders();
        getProducts();
        getCatsOrders();
    },[])

    const getUsers = async ()=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListActivities(auth_key, user_id);
            
            if(response.status ){
                setUsers(response.user_report);
                
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
    }

    const getOrders = async ()=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListOrdersStatus(auth_key, user_id);
            
            if(response.status ){
                setOrders(response.order_status_report)
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
    }
    const getProducts = async ()=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListProducts(auth_key, user_id);
            
            if(response.status ){
                setProducts(response.category_product_count);
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
    }
    const getCatsOrders = async ()=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListCategoriesOrders(auth_key, user_id);
            
            if(response.status ){
                setCatsOrders(response.order_category_count);
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
    }

    return(
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol">
            <div className="container">
                <div className="row ReportRow">
                    <h3 className="categoryheader">Users</h3>
                    <ReportCard 
                        Icon={faUser}
                        color="green" 
                        text="Active Users" 
                        count={Users.active_users}
                        />
                    <ReportCard 
                        Icon={faUserSlash}
                        color="red" 
                        text="Inactive Users"
                        count={Users.inactive_users}
                        />

                    <h3 className="categoryheader">Orders status</h3>
                    {Orders.map((order , index)=>(
                        <ReportCard 
                        Icon={faTruckFast}
                        color={
                            order.order_status === "Canceled" ? "red" :
                            order.order_status === "Pending"?"orange" :
                            order.order_status === "Delivered"?"green" :' '  } 
                        text={order.order_status}
                        count={order.order_count}
                        />
                    ))}
                    
                    
                    <h3 className="categoryheader">Categories Products</h3>
                    {Products.map((product , index)=>(
                        <ReportCard 
                        Icon={faLayerGroup}
                        text={product.category_name}
                        color=" "
                        count={product.product_count}
                        />
                    ))}
                    
                    
                    <h3 className="categoryheader">Categories Orders</h3>
                    {CatsOrders.map((order , index)=>(
                        <ReportCard 
                        Icon={faBox}
                        text={order.category_name}
                        color=" "
                        count={order.order_count}
                        />
                    ))}
                    
                </div>
            </div>
            
        </div>
    );
}
export default Home; 