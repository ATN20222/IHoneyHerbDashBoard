import React, { useState, useEffect } from "react";
import './Coupons.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListCategories, ListCoupons, RemoveCategory } from "../../Services/Api"; // Importing ListCategories and RemoveCategory functions
import Swal from "sweetalert2";


const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListCoupons(auth_key, user_id);
                console.log(response);
                if(response.status){
                    
                    setCoupons(response.coupon_list); 
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
                console.error('Error fetching coupons:', error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Coupons</h3>
                <Link className="btn btn-warning" to="/addcoupon">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Coupon</th>
                            <th>Discount</th>
                            <th>Expiry Date</th>
                            <th>Edit</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>{coupon.coupon}</td>
                                <td>{coupon.discount}</td> 
                                <td>{(coupon.expiry_date=="0000-00-00"||coupon.expiry_date==null)?"_______":coupon.expiry_date}</td> 
                                
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editcoupon/${coupon.id}`}
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

export default Coupons;
