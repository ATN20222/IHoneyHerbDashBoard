import React, { useState, useEffect } from "react";
import './Reviews.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faLockOpen, faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { EditReviews, ListCategories, ListCoupons, ListReviews, RemoveCategory } from "../../Services/Api"; 


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListReviews(auth_key, user_id);
                console.log("response", response);
                if(response.status){
                    
                    setReviews(response.reviews); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, []);

    const HandleShowHideReview = async (id , status)=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            var rev  = 1;
            if(status =='1'){
                rev=0
            }
            const response = await EditReviews(auth_key, user_id , id , rev);
            console.log(response);
            if(response.status){
                
                alert("Success"); 
                window.location.reload();
            }else{
                if(response.msg === "Wrong key"){
                    localStorage.removeItem('token');
                    alert("session exprired ");
                    
                    window.location.href = '/login';
                  }else{
                    alert("Faild"); 

                  }

            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
           

            <div className="CategoriesHeader">
                <h3>All Reviews</h3>
               
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>User ID</th>
                            <th>Product Id</th> 
                            <th>Title</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>Show/Hide</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{review.user_id}</td>
                                <td>{review.product_id}</td>
                                <td>{review.title}</td>
                                <td>{review.description}</td>
                                
                                <td>{review.rating}</td> 
                                
                               

                                <td>
                                    <button 
                                        className="btn btn-warning" 
                                        
                                        onClick={()=>HandleShowHideReview(review.id , review.active)}
                                    >
                                        <FontAwesomeIcon icon={review.active=='1'? faEyeSlash : faEye}/>
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

export default Reviews;
