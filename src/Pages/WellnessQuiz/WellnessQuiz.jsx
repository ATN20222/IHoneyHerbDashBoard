import React, { useState, useEffect } from "react";
import './WellnessQuiz.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { DeleteWellnessQuestion, ListQuestions, RemoveGroup } from "../../Services/Api"; 

import DeleteQuestion from "./DeleteQuestion";
import Swal from "sweetalert2";

const WellnessQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [ShowDeleteQuestion, setShowDeleteQuestion] = useState(false);
    const [DeleteQuestionId, setDeleteQuestionId] = useState(null);
    const Genders = [
            {
                id: 1 ,
                name:"Male"
            },
            {
                id: 2 ,
                name:"Female"
            },
            {
                id: 3,
                name:"Both"
            },
        ] 
    const Ages = [
        {
            id: "1",
            age: "18 - 44"
        },
        {
            id: "2",
            age: "45 - 64"
        },
        {
            id: "3",
            age: "65+"
        },
        {
            id: "4",
            age: "Any"
        }
    ]
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListQuestions(auth_key, user_id);
                if(response.status){

                    setQuestions(response.list); 
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
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await DeleteWellnessQuestion(auth_key, user_id, DeleteQuestionId);
            console.log(response);
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
                  }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {ShowDeleteQuestion && <DeleteQuestion onClick={() => setShowDeleteQuestion(false)} onConfirmDelete={removeQuestionRequest} />}

            <div className="CategoriesHeader">
                <h3 >All Questions</h3>
                <Link className="btn btn-warning" to="/addquestion" > <FontAwesomeIcon icon={faPlus}/> Add New </Link>
            </div>
            
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>En Question</th>
                            <th>Ar Question</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={question.image} width="40px" alt="" /> 
                                </td>
                                <td>{question.question_en}</td>
                                <td>{question.question_ar}</td> 
                                <td> {Genders.find(gender => gender.id == question.gender)?.name}</td> 
                                <td> {Ages.find(age => age.id == question.age)?.age}</td> 
                                <td>
                                    <Link 
                                        className="btn btn-warning" 
                                        to={`/editquestion/${question.id}`}
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDeleteQuestion(question.id)}>
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

export default WellnessQuiz;
