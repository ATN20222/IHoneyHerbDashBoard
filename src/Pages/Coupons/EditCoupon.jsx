import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddCoupons, EditCoupons, ListCategories, ListCoupons, TestCats } from "../../Services/Api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditCoupon = () => {
  const [couponName, setCouponName] = useState('');
  const [couponDiscount, setCouponDiscount] = useState('');
  const [couponStatus, setCouponStatus] = useState(false); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();


  useEffect(()=>{
    const fetchData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await ListCoupons(auth_key, user_id);
            console.log(response);
            if(response.status){
                console.log(id)
                const cop = response.coupon_list.find(e=>e.id == id);
                console.log(cop)
                setCouponName(cop.coupon);

                console.log(cop.is_active);
                setCouponStatus(parseInt(cop.is_active))
                setCouponDiscount(cop.discount)
                
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
            console.error('Error fetching coupons:', error);
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
      console.log(auth_key, user_id, 
        couponName,
        couponDiscount,
        couponStatus  );
      const response = await EditCoupons(auth_key, user_id,id, 
        couponName,
        couponDiscount,
        couponStatus  
      );
      console.log(response)

      if(response.status) {
        // alert('Coupon edited successfully');

        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/coupons";
        }, 3000);

        console.log('Coupon edited successfully:', response);
      } else {
        if(response.msg === "Wrong key") {
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
      setError('Failed to add coupon');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
      console.error('Error editing coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const CancelHandle = (e) => {
    e.preventDefault();
    window.location.href = "/coupons";
  };

  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>Edit Coupon</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Coupon</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Coupon Code</h6>
            </label>
            <input
            required
              className="col-lg-12 form-control EmailInput"
              placeholder="Code"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Coupon Discount</h6>
            </label>
            <input
            required
              className="col-lg-12 form-control EmailInput"
              type="number"
              placeholder="Discount"
              value={couponDiscount}
              onChange={(e) => setCouponDiscount(e.target.value)}
            />
          </div>
          <h3 className="categoryheader">Coupon Status</h3>
          <div className="col-lg-12 CategoryFormItem">
            <div className="CheckBoxes col-lg-1 col-md-2 col-sm-3 col-3">
              <input
              
                className="form-checkbox"
                type="checkbox"
                id="ActiveCopo"
                checked={parseInt(couponStatus)==1}
                onChange={(e) => setCouponStatus(e.target.checked?1:0)}
              />
              <label htmlFor="ActiveCopo">Active</label>
            </div>
          </div>
          {error && <div className="col-lg-12 text-danger">{error}</div>}
          <div className="col-lg-12 LoginWithCol CategoryFormBtns">
            <button
              type="submit"
              className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${
                loading ? 'WaitBtn' : ''
              }`}
              disabled={loading}
            >
              <span className="Login">{loading ? 'Wait...' : 'Save'}</span>
            </button>
            <button onClick={CancelHandle} className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn">
              <span className="Login">Cancel</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCoupon;
