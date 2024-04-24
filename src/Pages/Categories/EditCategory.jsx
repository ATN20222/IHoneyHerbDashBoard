import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, editCategory, ListCategories, TestCats } from "../../Services/Api";

const EditCategory = () => {
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameAr, setCatNameAr] = useState('');
  const [parentId, setParentId] = useState('');
  const [catIcon, setCatIcon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: "",
    cat_name_en: "",
    cat_name_ar: "",
    parent_id: "",
    icon: "",
    parent_name_en: "",
    parent_name_ar: ""
  });
  const location = useLocation();
  var pathname = location.pathname.split('/');
  const category_id = pathname[pathname.length-1];  

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


function getCategoryList(data, parentId = '0', prefix = '') {
  const categories = [];

  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const item = data[key];
          if (item.parent_id === parentId) {
              const category = `${prefix}${item.category}`;
              categories.push({ id: item.id, category });
              if (item.child) {
                  const childCategories = getCategoryList(item.child, item.id, `${category} > `);
                  categories.push(...childCategories);
              }
          }
      }
  }

  return categories;
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const response = await ListCategories(auth_key, user_id);
        const resp = await TestCats(auth_key , user_id);
        console.log(resp);
        // console.log(response);
        if (resp && resp.status && resp.data) {
          // setCategories(response.categories_list);
          console.log(resp.data)
          var arr = getCategoryList(resp.data);
          setCategories( getCategoryList(resp.data));

          var selectedCategory = response.categories_list.find(cat => cat.id === category_id);
          setCatNameEn(selectedCategory.cat_name_en);
          setCatNameAr(selectedCategory.cat_name_ar);
          setParentId(selectedCategory.parent_id);
          selectedCategory = arr.find(cat => cat.id === category_id);
          setCategory(selectedCategory);
          console.log(selectedCategory)
          

        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
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
      const response = await editCategory(auth_key, user_id, category_id, catNameEn, catNameAr, parentId, catIcon);   
      if(response.status==true){
        
        console.log('Category edited successfully:', response);
        alert('Category edited successfully');
        window.location.href = "/categories";
      }else{
        alert('Error editing category');
      }

    } catch (error) {
      setError('Failed to edit category');
      console.error('Error editing category:', error);
    } finally {
      setLoading(false);
    }
  };

  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/categories";
}


  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Category</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Category name</h3>
          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={catNameAr}
              onChange={(e) => setCatNameAr(e.target.value)}
            />
          </div>
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
          <h3 className="categoryheader">Category Parent</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Parent name</h6>
            </label>
            <select 
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

export default EditCategory;
