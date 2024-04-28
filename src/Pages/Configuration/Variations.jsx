import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { listVariation } from "../../Services/Api"; 
const Variations = () => {
    const [Variations, setVariations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await listVariation(auth_key, user_id);
                console.log(response);
                setVariations(response.variation_list); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3 >All Variations</h3>
                <Link className="btn btn-warning" to="/addvariation" > <FontAwesomeIcon icon={faPlus}/> Add New </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            
                            <th>En Name</th>
                            <th>Ar Name</th>
                            <th>Edit</th>
                            {/* <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Variations.map((variation, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>{variation.name_en}</td>
                                <td>{variation.name_ar}</td> 
                                <td>
                                <Link 
                                        className="btn btn-warning" 
                                        to={`/editvariation/${variation.id}`}
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


export default Variations;
