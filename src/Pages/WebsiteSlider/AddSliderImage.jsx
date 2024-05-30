import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddAppScreen, addCategory, AddSlides, ListCategories, TestCats } from "../../Services/Api";
import Swal from "sweetalert2";

const AddSliderImage = () => {
  const [ProductId, setProductId] = useState('');
  const [ScreenImage, setScreenImage] = useState(null);
  const [ScreenArImage, setScreenArImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 8 * 1024 * 1024) {
        // alert("");
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "File size exceeds the limit of 8MB.",
          showConfirmButton: false,
          timer: 3000
        });
        
        e.target.value = null; 
        setScreenImage(null); 
    } else {
      setScreenImage(file);
    }
};

const handleFileChange2 = (e) => {
  const file = e.target.files[0];
  if (file && file.size > 8 * 1024 * 1024) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "File size exceeds the limit of 8MB.",
      showConfirmButton: false,
      timer: 3000
    });      e.target.value = null; 
      setScreenArImage(null); 
  } else {
    setScreenArImage(file);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await AddSlides(auth_key, user_id, ProductId, ScreenImage ,ScreenArImage);   
      if(response.status){

        // alert('screen added successfully');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/websiteslider";

      }, 3000);

        console.log('Screen added successfully:', response);
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
        <h3>New Slide</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Slide Product</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Product ID</h6>
            </label>
            <input 
              required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Product ID"
              type="number"
              value={ProductId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
        
          
          <h3 className="categoryheader">Slide Image</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Image En</h6>
            </label>
                        <input 
                            required
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange} 
                        />
          </div>

          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Image Ar</h6>
            </label>
                        <input 
                            required
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange2} 
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

export default AddSliderImage;