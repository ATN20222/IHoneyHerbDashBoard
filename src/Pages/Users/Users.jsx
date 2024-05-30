import React, { useState, useEffect } from "react";
import './Users.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faLock, faLockOpen, faPen, faPlus, faRecycle, faSearch, faTrash, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { EditUsers, ListCategories, ListCoupons, ListUsers, RemoveCategory, SearchUser } from "../../Services/Api"; 
import Swal from "sweetalert2";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [SearchedUsers , setSearchedUsers] = useState([]);
    const [start, setstart] = useState(0);
    const [limit, setlimit] = useState(50);
    const [EnableShowMore, setEnableShowMore] = useState(false);
    useEffect(() => {
        

        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListUsers(auth_key, user_id , start , limit);
            console.log(response);
            if(response.status){
                
                setUsers([...users,...response.user_list]); 
                if(response.user_list.length < limit ){
                    setEnableShowMore(false);
                }else{
                    setEnableShowMore(true); 

                }
                setstart(start + limit );
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
                        window.location.href = '/login';
                      }, 3000);
                  }
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }
    };
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
                
                // alert("scuccess");

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "success",
                    showConfirmButton: false,
                    timer: 3000
                  });
                  setTimeout(() => {
                    window.location.reload();
                }, 3000);


                // window.location.reload();
                
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
                        window.location.href = '/login';
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
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
            console.error('Error :', error);
        }
    }

    
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        Filter();
        if(event.target.value==""){
            setSearchedUsers([]);
        }
        
    };
    const Filter = async ()=>{
        // const filteredProducts = products.filter((product) =>
        //     product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //     product.name_ar.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            const response = await SearchUser(auth_key, user_id, searchQuery);
            console.log(response);
            if (response.status) {
                setSearchedUsers(response.users);
                
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

    const handleShowMore = async () => {   
        fetchData();
};
    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Users</h3>
                
            </div>
            <div className="12 Search ">
                <div className="row">
                   

                    <div className="col-12 SearchItem">
                        <input 
                        className=" form-control " 
                        placeholder="Search by User ID"
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                        <button className="btn btn-warning" onClick={Filter} >
                            <FontAwesomeIcon icon={faSearch}/> 
                        </button>
                        
                        
                    </div>
                  
                    
                </div>
            
            


        


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
                    {searchQuery.length==0?
                    users.map((user, index) => (
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
                    ))
                    :
                    SearchedUsers.map((user, index) => (
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
                    ))
                    
                    }
                    {((searchQuery.length!=0&&SearchedUsers.length==0)||(searchQuery.length==0&&users.length==0))&&
                        <tr>
                            <td colSpan="6">No data found</td>
                        </tr>
                        
                    }
                     
                        
                    </tbody>
                </table>
            </div>
            {EnableShowMore && (
                    <div className="text-center">
                        <button className="btn btn-warning" onClick={handleShowMore}>Show More</button>
                    </div>
                )}
        </div>
    );
};

export default Users;
