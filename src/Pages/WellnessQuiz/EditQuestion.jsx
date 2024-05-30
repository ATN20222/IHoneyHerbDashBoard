import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addCategory, AddGroup, AddWellnessQuestion, AssignQuestionProduct, DropDown, EditWellnessQuestion, ListCategories, ListGroups, QuestionById, RemoveAssignQuestionProduct, TestCats, WellnessQuestionProducts } from "../../Services/Api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditQuestion = () => {
  const [QuestionNameEn, setQuestionNameEn] = useState('');
  const [QuestionNameAr, setQuestionNameAr] = useState('');
  const [SelectedGender, setSelectedGender] = useState('');
  const [SelectedAge, setSelectedAge] = useState('');
  const [QuestionImage, setQuestionImage] = useState(null);
  const [QuestionProducts , setQuestionProducts] = useState([])
  const [QuestionProductsLength , setQuestionProductsLength]=useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const Genders = [
        {
            id: 1 ,
            name:"Male"
        },
        {
            id: 2 ,
            name:"Female"
        },
        {
            id: 3,
            name:"Both"
        },
    ]; 
  const Ages = [
    {
        id: "1",
        age: "18 - 44"
    },
    {
        id: "2",
        age: "45 - 64"
    },
    {
        id: "3",
        age: "65+"
    },
    {
        id: "4",
        age: "Any"
    }
    ];

    useEffect(()=>{
        getProductById();
        getQuestionProducts();
    },[]);

    const handleAddRecord = () => {
        
        const emptyRecord = {
            product_id: '',
            
        };
        setQuestionProducts([...QuestionProducts, emptyRecord]);
    };
    const handleDeleteRecord = (e,index) => {
        e.preventDefault();
        const updatedRecords = [...QuestionProducts];
        updatedRecords.splice(index, 1);
        setQuestionProducts(updatedRecords);
        if(index < QuestionProductsLength){
            DeleteFromAssigning(QuestionProducts[index].product_id);
        }  


    };
    async function DeleteFromAssigning(product_id){

        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await RemoveAssignQuestionProduct(auth_key, user_id , id , product_id);
            if(response.status){
                // alert("Product removed successfully");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "success",
                  showConfirmButton: false,
                  timer: 3000
                });
                
                setQuestionProductsLength(QuestionProductsLength - 1);
            }else{
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
            }

        }catch(error){
            // alert("Faild to remove product")
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed",
              showConfirmButton: false,
              timer: 3000
            });

        }
    }

    async function AssignProduct(){
        try{
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const ProductsToAssign = QuestionProducts.slice(QuestionProductsLength);

            for (const ProductId of ProductsToAssign) {
                const response = await AssignQuestionProduct(
                  auth_key,
                  user_id,
                  id,
                  ProductId.product_id,
                  
                );
                if (!response.status) {
                  // alert("Failed to add product");
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed",
                    showConfirmButton: false,
                    timer: 3000
                  });
                  return;
                }
              }
            
        

        }catch(error){
            // alert("Failed to add product");
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed",
              showConfirmButton: false,
              timer: 3000
            });

        }
    }

    

    async function getProductById(){
        try {

            if (loading) return;
            
      
            setLoading(true);
      
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await QuestionById(auth_key, user_id, id);   
      
            if(response.status){
              setQuestionNameEn(response.list.question_en);
              setQuestionNameAr(response.list.question_ar);
              setSelectedAge(response.list.age);
              setSelectedGender(response.list.gender)

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
            setError('Failed to add question');
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed",
              showConfirmButton: false,
              timer: 3000
            });   
            console.error('Error adding question:', error);
          } finally {
            setLoading(false);
          }
    }
    async function getQuestionProducts(){
        try {

            if (loading) return;
            
      
            setLoading(true);
      
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await WellnessQuestionProducts(auth_key, user_id, id);   
            
            if(response.status){
                setQuestionProducts(response.list)
                setQuestionProductsLength(response.list.length);
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
                  // alert("Faild to get products");
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
            setError('Failed to get products');
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed",
              showConfirmButton: false,
              timer: 3000
            });
            console.error('Error getting products:', error);
          } finally {
            setLoading(false);
          }
    }

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/svg+xml") {
        // alert("SVG files are not allowed.");
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "SVG files are not allowed.",
          showConfirmButton: false,
          timer: 3000
        });
        
        
        e.target.value = null; 
        setQuestionImage(null); 
      } else if (file && file.size > 8 * 1024 * 1024) {
        // alert("File size exceeds the limit of 8MB.");
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "File size exceeds the limit of 8MB.",
          showConfirmButton: false,
          timer: 3000
        });
        e.target.value = null; 
        setQuestionImage(null); 
      } else {
        setQuestionImage(file);
      }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (loading) return;

      if(QuestionProductsLength < QuestionProducts.length)
        AssignProduct();
      

      setLoading(true);

      const auth_key = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      const response = await EditWellnessQuestion(auth_key, user_id,id, QuestionNameEn, QuestionNameAr, SelectedGender, SelectedAge, QuestionImage);   
      
      if(response.status){

        // alert('Question edited successfully');
        Swal.fire({
          position: "center",
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 3000
        });
        setTimeout(() => {
          window.location.reload();

      }, 3000);
      }else{
        if(response.msg === "Wrong key"){
          localStorage.removeItem('token');
          // alert("session exprired ");
          
          // window.location.href = '/login';
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
            // alert("Failed to edit question");
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
      setError('Failed to edit question');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 3000
      });
      console.error('Error editing question:', error);
    } finally {
      setLoading(false);
    }
  };


  const CancelHadel =(e)=>{
    e.preventDefault();
    window.location.href = "/wellnessquiz";
}
 

  return (
    <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
      <div className="CategoriesHeader">
        <h3>New Question</h3>
      </div>
      <form onSubmit={handleSubmit} className="row">
        <div className="row Center LoginWithRow">
          <h3 className="categoryheader">Question</h3>


          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">English Question</h6>
            </label>
            <input 
              required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in English"
              value={QuestionNameEn}
              onChange={(e) => setQuestionNameEn(e.target.value)}
            />
          </div>

          <div className="col-lg-6 CategoryFormItem">
            <label htmlFor="">
              <h6 className="">Arabic Question</h6>
            </label>
            <input 
                required
              className="col-lg-12 form-control EmailInput" 
              placeholder="Name in Arabic"
              value={QuestionNameAr}
              onChange={(e) => setQuestionNameAr(e.target.value)}
            />
          </div>
          
          <h3 className="categoryheader">Question Gender</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">gender</h6>
            </label>
            <select 
            required
              className="col-lg-12 form-select EmailInput"
              value={SelectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {Genders.map(gender => (
                <option key={gender.id} value={gender.id}>{gender.name}</option>
              ))}
            </select>
            
          </div>


          <h3 className="categoryheader">Question Age</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className=""> Age</h6>
            </label>
            <select 
            required
              className="col-lg-12 form-select EmailInput"
              value={SelectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              
            >
              <option value={0}>Choose...</option>
              {Ages.map(age => (
                <option key={age.id} value={age.id}>{age.age}</option>
              ))}
            </select>
            
          </div>

          <h3 className="categoryheader">Question Image</h3>
          <div className="col-lg-12 CategoryFormItem">
            <label htmlFor="">
              <h6  className="">image</h6>
            </label>
                        <input 
                             
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange} 
                        />
          </div>




          <div className="table-responsive TableContainer">
                            <h3 className="categoryheader">Question Products</h3>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                        <th>#</th>
                                        <th>Product ID</th>
                                        <th>Delete</th>
                                        </tr>
                                       
                                    </thead>
                                        <tbody>
                                    

                                        {QuestionProducts.map((record, index) => (


                                        <tr key={index}>
                                            <td>#</td>
                                    
                                            <td>
                                                <input
                                                    disabled={index <QuestionProductsLength}
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    value={record.product_id}
                                                    onChange={(e) => {
                                                        const updatedRecords = [...QuestionProducts];
                                                        updatedRecords[index].product_id = e.target.value;
                                                        setQuestionProducts(updatedRecords);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn btn-warning"  onClick={(e) => handleDeleteRecord(e,index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>

                                        ))}


                                       

                                        </tbody>
                                </table>
                                        
                                            <div className="AddRecord col-lg-12" onClick={handleAddRecord}>
                                                <button type="button"  className="btn btn-dark">
                                                    Add Record
                                                </button>
                                            </div>
                                            
                                        
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

export default EditQuestion;