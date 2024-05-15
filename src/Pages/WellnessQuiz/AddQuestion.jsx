import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddGroup, AddWellnessQuestion, DropDown, ListCategories, ListGroups, TestCats } from "../../Services/Api";

const AddQuestion = () => {
  const [QuestionNameEn, setQuestionNameEn] = useState('');
  const [QuestionNameAr, setQuestionNameAr] = useState('');
  const [SelectedGender, setSelectedGender] = useState('');
  const [SelectedAge, setSelectedAge] = useState('');
  const [QuestionImage, setQuestionImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    ]; 
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
    ];


 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/svg+xml") {
        alert("SVG files are not allowed.");
        e.target.value = null; 
        setQuestionImage(null); 
      } else if (file && file.size > 8 * 1024 * 1024) {
        alert("File size exceeds the limit of 8MB.");
        e.target.value = null; 
        setQuestionImage(null); 
      } else {
        setQuestionImage(file);
      }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      console.log(auth_key, user_id, QuestionNameEn, QuestionNameAr, SelectedGender, QuestionImage);
      const response = await AddWellnessQuestion(auth_key, user_id, QuestionNameEn, QuestionNameAr, SelectedGender, SelectedAge, QuestionImage);   

      if(response.status){
        window.location.href = "/wellnessquiz";
        alert('question added successfully');
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          alert("session exprired ");
          
          window.location.href = '/login';
        }else{
            alert("Faild to add question");
        }
      }



    } catch (error) {
      setError('Failed to add question');
      console.error('Error adding question:', error);
    } finally {
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/wellnessquiz";
}
 


  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Question</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Question</h3>


          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Question</h6>
            </label>
            <input 
              required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={QuestionNameEn}
              onChange={(e) => setQuestionNameEn(e.target.value)}
            />
          </div>

          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Question</h6>
            </label>
            <input 
                required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={QuestionNameAr}
              onChange={(e) => setQuestionNameAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Question Gender</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">gender</h6>
            </label>
            <select 
            required
              className="col-lg-12 form-select EmailInput"
              value={SelectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {Genders.map(gender => (
                <option key={gender.id} value={gender.id}>{gender.name}</option>
              ))}
            </select>
            
          </div>


          <h3 className="categoryheader">Question Age</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className=""> Age</h6>
            </label>
            <select 
            required
              className="col-lg-12 form-select EmailInput"
              value={SelectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {Ages.map(age => (
                <option key={age.id} value={age.id}>{age.age}</option>
              ))}
            </select>
            
          </div>

          <h3 className="categoryheader">Question Image</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">image</h6>
            </label>
                        <input 
                            required 
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange} 
                        />
          </div>
          {error && <div className="col-lg-12 text-danger">{error}</div>}
          <div className="col-lg-12 LoginWithCol CategoryFormBtns">
            <button type="submit" className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${loading ? 'WaitBtn' : ''}`} disabled={loading}>
              <span className="Login">{loading ? 'Wait...' : 'Save'}</span>
            </button>
            <button onClick={CancelHadel} className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn">
              <span className="Login"> Cancel </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;