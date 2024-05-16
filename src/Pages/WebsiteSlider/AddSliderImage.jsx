import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddAppScreen, addCategory, AddSlides, ListCategories, TestCats } from "../../Services/Api";

const AddSliderImage = () => {
  const [ProductId, setProductId] = useState('');
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
      const response = await AddSlides(auth_key, user_id, ProductId, ScreenImage);   
      if(response.status){

        alert('Sscreen added successfully');

        window.location.href = "/websiteslider";
        console.log('Screen added successfully:', response);
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          alert("session exprired ");
          
          window.location.href = '/login';
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

export default AddSliderImage;