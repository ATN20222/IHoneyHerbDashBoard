import React, { useState, useEffect } from "react";
import './Users.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { EditUsers, ListCategories, ListCoupons, ListUsers, RemoveCategory } from "../../Services/Api"; 


const Users = () => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListUsers(auth_key, user_id);
                console.log(response);
                if(response.status){
                    
                    setUsers(response.user_list); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);
    const HandleBanUser = async (email , status)=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            var rev  = 1;
            if(status =='1'){
                rev=0
            }

            console.log(auth_key, user_id , email , rev);

            const response = await EditUsers(auth_key, user_id , email , rev);
            console.log(response);
            if(response.status){
                
                alert("scuccess");
                window.location.reload();
                
            }else{
                if(response.msg === "Wrong key"){
                    localStorage.removeItem('token');
                    alert("session exprired ");
                    
                    window.location.href = '/login';
                  }
            }
        } catch (error) {
            console.error('Error :', error);
        }
    }

    

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Users</h3>
                
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            {/* <th>Image</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Points</th>
                            <th>Ban</th>
                           
                           
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                {/* <td>
                                    <img src={user.image} width="40px" alt="" /> 
                                </td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td> 
                                <td>{user.phone}</td> 
                                <td>{user.points}</td> 
                                
                                <td>
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={()=>HandleBanUser(user.email , user.active)}
                                    >
                                        <FontAwesomeIcon icon={user.active=='1'?faBan:faLockOpen}/>
                                    </button>
                                </td>
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
