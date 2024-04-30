import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddGroup, DropDown, ListCategories, ListGroups, TestCats } from "../../Services/Api";

const AddGroups = () => {
  const [GroupNameEn, setGroupNameEn] = useState('');
  const [GroupNameAr, setGroupNameAr] = useState('');
  const [parentId, setParentId] = useState('');
  const [GroupIcon, setGroupIcon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth_key = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        // const response = await TestCats(auth_key, user_id);
        const response = await DropDown(auth_key, user_id);
        if (response && response.status && response.groups_list) {
            console.log(response);
            setGroups( getGroupsList(response.groups_list));
            // setGroups(response.groups_list)

        } else {
          if(response.msg === "Wrong key"){
            localStorage.removeItem('token');
            alert("session exprired ");
            
            window.location.href = '/login';
          }
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    };

    fetchData();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 8 * 1024 * 1024) {
        alert("File size exceeds the limit of 8MB.");
        e.target.value = null; 
        setGroupIcon(null); 
    } else {
      setGroupIcon(file);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      console.log(auth_key, user_id, GroupNameEn, GroupNameAr, parentId, GroupIcon);
      const response = await AddGroup(auth_key, user_id, GroupNameEn, GroupNameAr, parentId, GroupIcon);   

      if(response.status){
        window.location.href = "/groups";
        alert('Group added successfully');
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          alert("session exprired ");
          
          window.location.href = '/login';
        }
      }



    } catch (error) {
      setError('Failed to add group');
      console.error('Error adding group:', error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/groups";
}
  function getGroupsList(data, parentId = '0', prefix = '') {
    const categories = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            if (item.parent_id === parentId) {
                const category = `${prefix}${item.group_name_en}`;
                categories.push({ id: item.id, category });
                if (item.children) {
                    const childCategories = getGroupsList(item.children, item.id, `${category} > `);
                    categories.push(...childCategories);
                }
            }
        }
    }
    console.log(categories);
    return categories;
  }


  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Group</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Group name</h3>


          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={GroupNameEn}
              onChange={(e) => setGroupNameEn(e.target.value)}
            />
          </div>

          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Name</h6>
            </label>
            <input 
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={GroupNameAr}
              onChange={(e) => setGroupNameAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Group Parent</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">Parent Name</h6>
            </label>
            <select 
              className="col-lg-12 form-select EmailInput"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.category}</option>
              ))}
            </select>
            
          </div>
          <h3 className="categoryheader">Group Icon</h3>
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

export default AddGroups;