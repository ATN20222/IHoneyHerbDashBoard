import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { editVariation, listVariation } from "../../Services/Api";
import Swal from "sweetalert2";

const EditVariation = () => {
  const [variationNameEn, setVariationNameEn] = useState('');
  const [variationNameAr, setVariationNameAr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState([]);
  const [variation, setVariation] = useState({
    id: "",
    name_en: "",
    name_ar: ""
  });
  const location = useLocation();
  var pathname = location.pathname.split('/');
  const variation_id = pathname[pathname.length-1];  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const response = await listVariation(auth_key, user_id);
        if (response && response.status && response.variation_list) {
          setVariations(response.variation_list);
          const selectedVariation = response.variation_list.find(variation => variation.id === variation_id);
          setVariation(selectedVariation);
          setVariationNameEn(selectedVariation.name_en);
          setVariationNameAr(selectedVariation.name_ar);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching variations:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loading) return;
      
      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await editVariation(auth_key, user_id, variation_id, variationNameEn, variationNameAr);   
      if(response.status === true){
        console.log('Variation edited successfully:', response);
        // alert('Variation edited successfully');


        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/variations";
        }, 3000);


      } else {
        // alert('Error editing variation');
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed",
          showConfirmButton: false,
          timer: 3000
        });
      }

    } catch (error) {
      // setError('Failed to edit variation');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
      console.error('Error editing variation:', error);
    } finally {
      setLoading(false);
    }
  };

  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/variations";
}


  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol VariationsCol">
      <div className="CategoriesHeader">
        <h3>Edit Variation</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
      
        <div className="row Center LoginWithRow">
        <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={variationNameEn}
              onChange={(e) => setVariationNameEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={variationNameAr}
              onChange={(e) => setVariationNameAr(e.target.value)}
            />
          </div>
          
          {error && <div className="col-lg-12 text-danger">{error}</div>}
          <div className="col-lg-12 LoginWithCol CategoryFormBtns">
            <button type="submit" className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${loading ? 'WaitBtn' : ''}`} disabled={loading}>
              <span className="Login">{loading ? 'Wait...' : 'Save'}</span>
            </button>
            <Link to="/variations" className="link-item col-lg-1 col-md-2 col-5">
            <button onClick={CancelHadel} className="btn btn-warning col-lg-12 col-md-12 col-12 CancelBtn">
              <span className="Login"> Cancel </span>
            </button>
            </Link>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVariation;
