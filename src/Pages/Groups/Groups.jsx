import React, { useState, useEffect } from "react";
import './Groups.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { ListGroups, RemoveGroup } from "../../Services/Api"; 
import { useLocation } from "react-router-dom";
import DeleteGroup from "./DeleteGroup";
import Swal from "sweetalert2";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [ShowDeleteGroup, setShowDeleteGroup] = useState(false);
    const [DeleteGroupId, setDeleteGroupId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListGroups(auth_key, user_id);
                if(response.status){

                    setGroups(response.groups_list); 
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
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed",
                    showConfirmButton: false,
                    timer: 3000
                  });
                console.error('Error fetching groups:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteGroup = (GroupId) => {
        setDeleteGroupId(GroupId); 
        setShowDeleteGroup(true); 
    };

    async function removeGroupRequest() {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await RemoveGroup(auth_key, user_id, DeleteGroupId);
            console.log(response);
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
                    
                  }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }
    }

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {ShowDeleteGroup && <DeleteGroup onClick={() => setShowDeleteGroup(false)} onConfirmDelete={removeGroupRequest} />}

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
                            <th>Delete</th>
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
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDeleteGroup(group.id)}>
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

export default Groups;
