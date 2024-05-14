import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddNotifications, ListCategories, TestCats } from "../../Services/Api";

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

        alert('notification has been sent');
        window.location.href = "/notifications";
        
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          alert("session exprired ");
          
          window.location.href = '/login';
        }
      }


    } catch (error) {
      setError('Failed to send notification');
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
          
          <h3 className="categoryheader">Notification Body</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Body</h6>
            </label>
            <textarea 
              className="col-lg-12 form-control EmailInput" 
              placeholder="English Body"
              value={NotDescEn}
              onChange={(e) => setNotDescEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Body</h6>
            </label>
            <textarea 
              className="col-lg-12 form-control EmailInput" 
              
              placeholder="Arabic Body"
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