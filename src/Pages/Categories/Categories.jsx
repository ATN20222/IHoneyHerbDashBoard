import React, { useState, useEffect } from "react";
import './Categories.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListCategories, RemoveCategory } from "../../Services/Api"; // Importing ListCategories and RemoveCategory functions

import DeleteCategory from "./DeleteCategory";

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
                setCategories(response.categories_list); 
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
                window.location.reload();

            }
        } catch (error) {
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
