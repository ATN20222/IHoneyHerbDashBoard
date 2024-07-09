import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DeleteFaq, DeleteRegions, DeleteWellnessQuestion, ListFaq, ListQuestions, ListRegions, RemoveGroup } from "../../Services/Api"; 
import Swal from "sweetalert2";
import DeleteRegion from "./DeleteRegion";

const Regions = () => {
    const [regions, setRegions] = useState([]);
    const [ShowDeleteQuestion, setShowDeleteQuestion] = useState(false);
    const [DeleteQuestionId, setDeleteQuestionId] = useState(null);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListRegions(auth_key, user_id);
                console.log(response)
                if(response.status){

                    setRegions(response.region_list); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteQuestion = (GroupId) => {
        setDeleteQuestionId(GroupId); 
        setShowDeleteQuestion(true); 
    };

    async function removeQuestionRequest() {
        setShowDeleteQuestion(false); 

        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await DeleteRegions(auth_key, user_id, DeleteQuestionId);
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
        }
    }

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {ShowDeleteQuestion && <DeleteRegion onClick={() => setShowDeleteQuestion(false)} onConfirmDelete={removeQuestionRequest} />}

            <div className="CategoriesHeader">
                <h3 >All Regions</h3>
                <Link className="btn btn-warning" to="/addregion" > <FontAwesomeIcon icon={faPlus}/> Add New </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>En Emirate</th>
                            <th>Ar Emirate</th>
                            <th>En Region</th>
                            <th>Ar Region</th>
                            <th>Shipping Cost</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions.map((region, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{region.emirate_en}</td>
                                <td>{region.emirate_ar}</td> 
                                <td>{region.region_en}</td> 
                                <td>{region.region_ar}</td> 
                                <td>{region.shipping_cost}</td> 
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editregion/${region.id}`}
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDeleteQuestion(region.id)}>
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

export default Regions;
