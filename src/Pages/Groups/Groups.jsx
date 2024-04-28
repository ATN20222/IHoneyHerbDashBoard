import React, { useState, useEffect } from "react";
import './Groups.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { ListGroups } from "../../Services/Api"; 
import { useLocation } from "react-router-dom";
const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListGroups(auth_key, user_id);
                setGroups(response.groups_list); 
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3 >All Groups</h3>
                <Link className="btn btn-warning" to="/addgroup" > <FontAwesomeIcon icon={faPlus}/> Add New </Link>
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
                        {groups.map((group, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={group.icon} width="40px" alt="" /> 
                                </td>
                                <td>{group.group_name_en}</td>
                                <td>{group.group_name_ar}</td> 
                                <td>
                                <Link 
                                        className="btn btn-warning" 
                                        to={`/editgroup/${group.id}`}
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

export default Groups;
