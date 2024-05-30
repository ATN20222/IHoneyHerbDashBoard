import React, { useState, useEffect } from "react";
import './Categories.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListCategories, RemoveCategory } from "../../Services/Api"; // Importing ListCategories and RemoveCategory functions

import DeleteCategory from "./DeleteCategory";
import Swal from "sweetalert2";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListCategories(auth_key, user_id);
                if(response.status){
                    
                    setCategories(response.categories_list); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        // alert("session exprired ");
                        


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
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShowDeleteModal(true);
    };

    const confirmDeleteCategory = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await RemoveCategory(auth_key, user_id, selectedCategoryId);
            if (response.status) {
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
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {showDeleteModal && (
                <DeleteCategory onClose={() => setShowDeleteModal(false)} onConfirmDelete={confirmDeleteCategory} />
            )}

            <div className="CategoriesHeader">
                <h3>All Categories</h3>
                <Link className="btn btn-warning" to="/addcategory">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>En Name</th>
                            <th>Ar Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={category.icon} width="40px" alt="" /> 
                                </td>
                                <td>{category.cat_name_en}</td>
                                <td>{category.cat_name_ar}</td> 
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editcategory/${category.id}`}
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDeleteCategory(category.id)}>
                                        <FontAwesomeIcon icon={faTrash}/>
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

export default Categories;
