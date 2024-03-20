import React, { useState, useEffect } from "react";
import './Categories.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HoneyImage from '../../Assets/Images/Honey.png';
import HerbsImage from '../../Assets/Images/Herbs.png';
import { ListCategories } from "../../Services/Api"; // Importing ListCategories function
import { useLocation } from "react-router-dom";
const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming auth_key and user_id are available in local storage
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

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3 >All Categories</h3>
                <Link className="btn btn-warning" to="/addcategory" > <FontAwesomeIcon icon={faPlus}/> add new </Link>
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
                            {/* <th>Delete</th> */}
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
                                {/* <td>
                                    <button className="btn btn-warning">
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
