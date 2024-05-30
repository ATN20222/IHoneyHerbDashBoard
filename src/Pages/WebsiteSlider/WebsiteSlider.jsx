import React, { useState, useEffect } from "react";
import './Slider.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DeleteAppScreen, DeleteSlides, ListScreens, ListSlides } from "../../Services/Api"; 
import DeleteScreen from "./DeleteScreen.jsx";
import Swal from "sweetalert2";


const WebsiteSlider = () => {
    const [screens, setScreens] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedScreenId, setselectedScreenId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListSlides(auth_key, user_id);
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
            const response = await DeleteSlides(auth_key, user_id, selectedScreenId);
            if (response.status) {
                window.location.reload();

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
            console.error('Error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {showDeleteModal && (
                <DeleteScreen onClose={() => setShowDeleteModal(false)} onConfirmDelete={confirmDeleteScreen} />
            )}

            <div className="CategoriesHeader">
                <h3>Website Slides</h3>
                <Link className="btn btn-warning" to="/addslide">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {screens.map((screen, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={screen.image_en} width="40px" alt="" /> 
                                </td>
                                
                                <td>{screen.product_id}</td> 
                                
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

export default WebsiteSlider;
