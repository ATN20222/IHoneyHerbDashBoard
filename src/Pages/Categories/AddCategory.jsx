import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, ListCategories, TestCats } from "../../Services/Api";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameAr, setCatNameAr] = useState('');
  const [parentId, setParentId] = useState('');
  const [catIcon, setCatIcon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const response = await TestCats(auth_key, user_id);


        if (response && response.status && response.categories_list) {
            setCategories( getCategoryList(response.categories_list));

        } else {
          if(response.msg === "Wrong key"){
            localStorage.removeItem('token');
            alert("session exprired ");
            
            window.location.href = '/login';
          }
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 8 * 1024 * 1024) {
        alert("File size exceeds the limit of 8MB.");
        e.target.value = null; 
        setCatIcon(null); 
    } else {
      setCatIcon(file);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await addCategory(auth_key, user_id, catNameEn, catNameAr, parentId, catIcon);   
      if(response.status){

        // alert('Category added successfully');

        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.href = "/categories";
        }, 3000);

        console.log('Category added successfully:', response);
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
      // setError('Failed to add category');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
      console.error('Error adding category:', error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/categories";
}
function getCategoryList(data, parentId = '0', prefix = '') {
  const categories = [];

  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const item = data[key];
          if (item.parent_id === parentId) {
              const category = `${prefix}${item.cat_name_en}`;
              categories.push({ id: item.id, category });
              if (item.children) {
                  const childCategories = getCategoryList(item.children, item.id, `${category} > `);
                  categories.push(...childCategories);
              }
          }
      }
  }
  // console.log("categories", categories);
  return categories;
}



  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Category</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Category Name</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={catNameEn}
              onChange={(e) => setCatNameEn(e.target.value)}
            />
          </div>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic name</h6>
            </label>
            <input
            required 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={catNameAr}
              onChange={(e) => setCatNameAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Category Parent</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Parent Name</h6>
            </label>
            <select
            required 
              className="col-lg-12 form-select EmailInput"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.category}</option>
              ))}
            </select>
            
          </div>
          <h3 className="categoryheader">Category Icon</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Icon</h6>
            </label>
                        <input 
                            required={parentId==''||parentId==0} 
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

export default AddCategory;