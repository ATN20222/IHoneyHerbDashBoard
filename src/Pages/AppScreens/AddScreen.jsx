import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddAppScreen, addCategory, ListCategories, TestCats } from "../../Services/Api";
import Swal from "sweetalert2";

const AddScreen = () => {
  const [ScreenTitleEn, setScreenTitleEn] = useState('');
  const [ScreenTitleAr, setScreenTitleAr] = useState('');
  const [ScreenDescEn, setScreenDescEn] = useState('');
  const [ScreenDescAr, setScreenDescAr] = useState('');
  const [ScreenImage, setScreenImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 8 * 1024 * 1024) {
        alert("File size exceeds the limit of 8MB.");
        e.target.value = null; 
        setScreenImage(null); 
    } else {
      setScreenImage(file);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await AddAppScreen(auth_key, user_id, ScreenTitleEn, ScreenTitleAr, ScreenDescEn , ScreenDescAr, ScreenImage);   
      if(response.status){

        // alert('Screen added successfully');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/screens";
        }, 3000);
        // console.log('Screen added successfully:', response);
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          // alert("session exprired ");
          Swal.fire({
            position: "center",
            icon: "error",
            title: "session exprired",
            showConfirmButton: false,
            timer: 3000
          });
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
          // window.location.href = '/login';
        }
      }


    } catch (error) {
      setError('Failed to add screen');
      console.error('Error adding screen:', error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/screens";
}



  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Screen</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Screen Title</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Title</h6>
            </label>
            <input 
            required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Title in English"
              value={ScreenTitleEn}
              onChange={(e) => setScreenTitleEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Title</h6>
            </label>
            <input 
              required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Title in Arabic"
              value={ScreenTitleAr}
              onChange={(e) => setScreenTitleAr(e.target.value)}
            />
          </div>
          

          <h3 className="categoryheader">Screen Description</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Description</h6>
            </label>
            <input 
            required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Description in English"
              value={ScreenDescEn}
              onChange={(e) => setScreenDescEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Description</h6>
            </label>
            <input 
            required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Description in Arabic"
              value={ScreenDescAr}
              onChange={(e) => setScreenDescAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Screen Image</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Image</h6>
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

export default AddScreen;