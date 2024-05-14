import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, EditOrder, ListCategories, ListOrders, ListOrderStatus, OrderById, TestCats } from "../../Services/Api";
import { useParams } from "react-router-dom";

const EditOrders = () => {
    const [order, setOrder] = useState([]);
    const [OrderStatus, setOrderStatus] = useState([]);
    const [selectedState, setselectedState] = useState('');
    const [arrivalDate , setArrivalDate] = useState('');
    const [Apply , SetApply] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const OrderResponse = await OrderById(auth_key, user_id , id);
                const response = await ListOrderStatus(auth_key , user_id);
                
                if(response.status&&OrderResponse.status){
                    setOrder(OrderResponse.orders);
                    
                    setOrderStatus(response.statuses);
                    setselectedState(response.statuses.find(st => st.id === OrderResponse.orders.order_status).id);
                    if (OrderResponse.arrival_date === "0000-00-00") {
                        setArrivalDate(''); 
                    } else {
                        setArrivalDate(OrderResponse.arrival_date);
                    }
                   
                    if(OrderResponse.order_status=='3')
                        SetApply(true);

                }else{
                    if(response.msg === "Wrong key"){
                        localStorage.removeItem('token');
                        alert("session exprired ");
                        
                        window.location.href = '/login';
                      }
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
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
        console.log(auth_key , user_id , id , selectedState ,arrivalDate);
        const date=arrivalDate;
        if(date=="0000-00-00")
            date=null;
      const response = await EditOrder(auth_key , user_id , id , selectedState ,date );   
      if(response.status){

        alert('Order Edited successfully');

        window.location.href = "/orders";
        console.log('Order Edited successfully:', response);
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          alert("session exprired ");
          
          window.location.href = '/login';
        }
      }


    } catch (error) {
      setError('Failed to edit order');
      console.error('Error editing order:', error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/orders";
}


const ChangeState =(e)=>{
    if(e=='3')
        SetApply(true);
    else
        SetApply(false);

    setselectedState(e);
}
  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>Order ID : {order.id} | User ID : {order.user_id}</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
            <div className="row">
                <h3 className="categoryheader">Location Details</h3>
            <div className="col-lg-6 CategoryFormItem">
                <label htmlFor="">
                <h6  className="">Name</h6>
                </label>
                <input 
                className="col-lg-12 form-control EmailInput" 
                disabled
                value={order.name}
                />
            </div>
            <div className="col-lg-6 CategoryFormItem">
                <label htmlFor="">
                <h6  className="">Phone</h6>
                </label>
                <input 
                className="col-lg-12 form-control EmailInput" 
                disabled
                value={order.phone}
                />
            </div>
            <div className="col-lg-6 CategoryFormItem">
                <label htmlFor="">
                <h6 className="">Location Name</h6>
                </label>
                <input 
                className="col-lg-12 form-control EmailInput" 
                disabled
                value={order.location_name}
                />
            </div>
            <div className="col-lg-6 CategoryFormItem">
                <label htmlFor="">
                <h6 className="">Address</h6>
                </label>
                <input 
                className="col-lg-12 form-control EmailInput" 
                disabled
                value={order.address}
                />
            </div>
            
            <div className="col-lg-6 CategoryFormItem">
                <label htmlFor="">
                <h6 className="">Phone</h6>
                </label>
                <input 
                className="col-lg-12 form-control EmailInput" 
                disabled
                value={order.phone}
                />
            </div>
          
            </div>
            <div className="col-lg-12 CategoryFormItem">

                    <h3 className="categoryheader">Order Status</h3>
                <div className="col-lg-12 CategoryFormItem">
                    <label htmlFor="">
                    <h6  className="">Status Name</h6>
                    </label>
                    <select 
                    
                    className="col-lg-12 form-select EmailInput"
                    value={selectedState}
                    onChange={(e) => ChangeState(e.target.value)}
                    
                    >
                    <option value={0}>Choose...</option>
                    {OrderStatus.map(OrderState => (
                        <option key={OrderState.id} value={OrderState.id}>{OrderState.status_en}</option>
                    ))}
                    </select>
                </div>
                    
                </div>
            <div className="row">
                <h3 className="categoryheader">Order Details</h3>

                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Price</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.price}
                    />
                </div>
                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Discount</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.discount}
                    />
                </div>

                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Vat</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.vat}
                    />
                </div>
                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Shipping Cost</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.shipping_cost}
                    />
                </div>
                <div className="col-lg-12 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Total Cost</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.total_cost}
                    />
                </div>

                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Order Date</h6>
                    </label>
                    <input 
                        className="col-lg-12 form-control EmailInput" 
                        disabled
                        value={order.order_date}
                    />
                </div>
                <div className="col-lg-6 CategoryFormItem">
                    <label htmlFor="">
                        <h6 className="">Delivery Date</h6>
                    </label>
                    <input 
                        disabled={!Apply}
                        className="col-lg-12 form-control EmailInput" 
                        placeholder=""
                        type="date"
                        required={!Apply}
                        onChange={(e) => setArrivalDate(e.target.value)}

                        value={order.arrival_date}
                    />
                </div>
            </div>
            <h3 className="categoryheader">OrderItems</h3>
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            
                            <th className="OrderstTh">Product ID</th>
                            <th className="OrderstTh">En Name</th>
                            <th className="OrderstTh">Ar Name</th>
                            <th className="OrderstTh">En Description</th>
                            <th className="OrderstTh">Ar Description</th>
                            
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {order.order_items&&order.order_items.map((order, index) => (
                            <tr key={index}>
                                
                                
                                <td>{order.product_id}</td>
                                <td>{order.product_name_en}</td> 
                                <td>{order.product_name_ar}</td> 
                                <td>{order.product_description_en}</td> 
                                <td>{order.product_description_ar}</td> 
                                
                                
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default EditOrders;