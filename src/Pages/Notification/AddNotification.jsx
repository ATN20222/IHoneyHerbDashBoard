import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddNotifications, ListCategories, TestCats } from "../../Services/Api";
import Swal from "sweetalert2";

const AddNotification = () => {
  const [notNameEn, setnotNameEn] = useState('');
  const [NotNameAr, setNotNameAr] = useState('');
  const [NotDescEn, setNotDescEn] = useState('');
  const [NotDescAr, setNotDescAr] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await AddNotifications(auth_key, user_id, notNameEn, NotNameAr, NotDescEn, NotDescAr);   
        console.log(response)
      if(response.status){

        // alert('notification has been sent');

        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/notifications";

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
      setError('Failed to send notification');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
      console.error('Error sending notification:', error);
    } finally {
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/notifications";
}



  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Notification</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Notification Title</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Title</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Title in English"
              value={notNameEn}
              onChange={(e) => setnotNameEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Title</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Title in Arabic"
              value={NotNameAr}
              onChange={(e) => setNotNameAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Notification Description</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Description En</h6>
            </label>
            <textarea 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Description En"
              value={NotDescEn}
              onChange={(e) => setNotDescEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Description Ar</h6>
            </label>
            <textarea 
              className="col-lg-12 form-control EmailInput" 
              
              placeholder="Description Ar"
              value={NotDescAr}
              onChange={(e) => setNotDescAr(e.target.value)}
            />
          </div>
          
            
          
          {error && <div className="col-lg-12 text-danger">{error}</div>}
          <div className="col-lg-12 LoginWithCol CategoryFormBtns">
            <button type="submit" className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${loading ? 'WaitBtn' : ''}`} disabled={loading}>
              <span className="Login">{loading ? 'Wait...' : 'Send'}</span>
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

export default AddNotification;