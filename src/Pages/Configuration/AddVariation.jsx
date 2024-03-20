import React, { useState } from "react";
import { addVariation } from "../../Services/Api";

const AddVariation = () => {
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loading) return;

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await addVariation(auth_key, user_id, nameEn, nameAr);   
      if(response.status==true){
        console.log('Variation added successfully:', response);

        alert('Variation added successfully');
        window.location.href='/variations';
        setNameEn('');
        setNameAr('');
      }else{
        alert('Field to add variation');

      }

    } catch (error) {
      setError('Failed to add variation');
      console.error('Error adding variation:', error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };
  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/variations";
}

  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Variation</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Variation name</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">English Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
            />
          </div>
          {error && <div className="col-lg-12 text-danger">{error}</div>}
          <div className="col-lg-12 LoginWithCol CategoryFormBtns">
            <button 
              type="submit" 
              className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${loading ? 'WaitBtn' : ''}`} 
              disabled={loading}
            >
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

export default AddVariation;
