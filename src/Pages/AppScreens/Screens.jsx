import React, { useState, useEffect } from "react";
import './screens.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DeleteAppScreen, ListScreens } from "../../Services/Api"; 
import DeleteScreen from "./DeleteScreen";


const Screens = () => {
    const [screens, setScreens] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedScreenId, setselectedScreenId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListScreens(auth_key, user_id);
                console.log(response);
                if(response.status){
                    
                    setScreens(response.list); 
                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching screens:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteScreen = (ScreenId) => {
        setselectedScreenId(ScreenId);
        setShowDeleteModal(true);
    };

    const confirmDeleteScreen = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await DeleteAppScreen(auth_key, user_id, selectedScreenId);
            if (response.status) {
                window.location.reload();

            }else{
                if(response.msg === "Wrong key"){
                    localStorage.removeItem('token');
                    alert("session exprired ");
                    
                    window.location.href = '/login';
                  }
            }
        } catch (error) {
            console.error('Error deleting screen:', error);
        }
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {showDeleteModal && (
                <DeleteScreen onClose={() => setShowDeleteModal(false)} onConfirmDelete={confirmDeleteScreen} />
            )}

            <div className="CategoriesHeader">
                <h3>App Screens</h3>
                <Link className="btn btn-warning" to="/addscreen">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>En Title</th>
                            <th>Ar Title</th>
                            <th>En Description</th>
                            <th>Ar Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {screens.map((screen, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={screen.image} width="40px" alt="" /> 
                                </td>
                                <td>{screen.title_en}</td>
                                <td>{screen.title_ar}</td> 
                                <td>{screen.desc_en}</td> 
                                <td>{screen.desc_ar}</td> 
                                {/* <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editcategory/${category.id}`}
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Link>
                                </td> */}
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDeleteScreen(screen.id)}>
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

export default Screens;
