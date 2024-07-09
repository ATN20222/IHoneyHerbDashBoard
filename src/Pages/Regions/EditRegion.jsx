import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddFaq, AddNotifications, AddRegions, EditRegions, ListCategories, ListRegions, TestCats } from "../../Services/Api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditRegion = () => {
  const [EmirateEN, setEmirateEN] = useState('');
  const [EmirateAr, setEmirateAr] = useState('');
  const [RegionEn, setRegionEn] = useState('');
  const [RegionAr, setRegionAr] = useState('');
  const [ShipingCost, setShipingCost] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
    const fetchData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListRegions(auth_key, user_id);
            console.log(response);
            if(response.status){
                console.log(id)
                const region = response.region_list.find(e=>e.id == id);
                setRegionAr(region.region_ar);
                setRegionEn(region.region_en);
                setEmirateAr(region.emirate_ar);
                setEmirateEN(region.emirate_en);
                setShipingCost(region.shipping_cost);
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
                      window.location.href = '/login';
                    }, 3000);
                  }
            }
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    fetchData();
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await EditRegions(auth_key, user_id,id, EmirateEN, EmirateAr, RegionEn, RegionAr , ShipingCost);   
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
          window.location.href = "/regions";

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
      setError('Failed to add Region');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/regions";
}



  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>Edit Region</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Emirate</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Emirate</h6>
            </label>
            <input
            required 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Emirate in English"
              value={EmirateEN}
              onChange={(e) => setEmirateEN(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Emirate</h6>
            </label>
            <input
            required 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Emirate in Arabic"
              value={EmirateAr}
              onChange={(e) => setEmirateAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Region</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Region En</h6>
            </label>
            <input
            required 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Region En"
              value={RegionEn}
              onChange={(e) => setRegionEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Region Ar</h6>
            </label>
            <input 
            required
              className="col-lg-12 form-control EmailInput" 
              
              placeholder="Region Ar"
              value={RegionAr}
              onChange={(e) => setRegionAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Shiping Cost</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Shiping Cost</h6>
            </label>
            <input 
            required
              min="0"
              className="col-lg-12 form-control EmailInput" 
              type="number"
              placeholder="Shiping Cost"
              value={ShipingCost}
              onChange={(e) => setShipingCost(e.target.value)}
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

export default EditRegion;