import React, { useEffect, useState } from "react";
import VariationOptions from "./VariatioinOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import './Products.css'
import { AddOption, AssignProduct, DropDown, ListCategories, TestCats, addProduct, listVariation, uploadImage } from "../../Services/Api";
const AddProduct = () =>{
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isApplied, setIsApplied] = useState(false);
    const [combinations, setCombinations] = useState([]);
    const [Hascombinations, setHasCombinations] = useState(false);
    const [Option2Flag, setOption2Flag] = useState(false);
    //
    const [categories, setCategories] = useState([]);
    const [SelectedCat, setSelectedCat] = useState('');

    const [arabicName, setArabicName] = useState('');
    const [englishName, setEnglishName] = useState('');
    const [shortDescriptionEn, setShortDescriptionEn] = useState('');
    const [shortDescriptionAr, setShortDescriptionAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [barcode, setBarcode] = useState('');
    const [sku, setSku] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [quantity , setQuantity]  = useState(0);


    const [ProductImage, setProductImage] = useState(null);
    const [VariationsList, setVariationsList] = useState([]);
    const [CombinationList, setCombinationList] = useState([]);
    const [Option1Table, setOption1Table] = useState([]);
    const [Option2Table, setOption2Table] = useState([]);

    const [productIds, setProductIds] = useState([]);
    const [newProductId, setnewProductId] = useState('');
    const [ProductFlag, setProductFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(0);



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

      const getGroups = async () => {
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
            console.error('Invalid response format:', response);
          }
        } catch (error) {
          console.error('Error fetching group:', error);
        }
      };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await listVariation(auth_key, user_id);
                console.log(response);
                setVariationsList(response.variation_list); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);


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
          const response = await TestCats(auth_key, user_id);
          if (response && response.status && response.data) {
           
            setCategories( getCategoryList(response.data));
            
            console.log(response.data);
          } else {
            console.error('Invalid response format:', response);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      getGroups();
      fetchData();
    }, []);



    const [Option1, setOption1] = useState({
        OptName: "",
        values: [],
      });
      const [Option2, setOption2] = useState({
        OptName: "",
        values: [],
      });

      const handleCheckboxChange = (e) => {
        const selectedCheckbox = e.target.value;
        if (e.target.checked) {
          if (selectedCheckboxes.length < 2) {
            setSelectedCheckboxes([...selectedCheckboxes, selectedCheckbox]);
          }
        } else {
          setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== selectedCheckbox));
        }
      };


  var Variations={};
  const handleSave = async () => {
    if( selectedCheckboxes.length > 0){
        Variations = selectedCheckboxes;
        console.log("Selected Checkboxes:", selectedCheckboxes);
        console.log("Selected Variations:", Variations);

        const auth_key = localStorage.getItem('token');
        var flag = true;
        try{
            for(const item of Variations){
                console.log(item);
                var response= await AddOption(auth_key, newProductId, item, "_________", "_________");
                console.log(response);
                
                    flag = response.status;
                
            }

            if(flag){
                alert("added succefully");
                setIsApplied(true);
                window.location.href='/products';

            }else{
                alert("error")
                return;
            }
        }catch{
            alert("error")
            return;
        }
        
        
        



    }
    
  };

 

  var Alloptions={
    
  } ;
  
  var Option = {
    OptName:"",
    values:[
        
    ]
  };
  var Opt2 ={
    OptName:"",
    values:[
    ]
  };




    const handleApply = async (options) => {
        if(options.length==0){
            return;
        }
        // console.log(options);
        Alloptions = options;

        var Op1Table =[];
        var Op2Table =[];
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');

            var ForTable = [];
            
            if (typeof options[0] != 'undefined') {
                for (const e of options[0]) {
                    var response= await AddOption(auth_key, newProductId, e.variation, e.en, e.ar);
                    Op1Table.push(response.option);
                    console.log(response);
                }
                setOption1Table(Op1Table)

            }
            
            if (options.length > 1 &&typeof options[1] != 'undefined') {
                for (const e of options[1]) {
                    var response= await AddOption(auth_key, newProductId, e.variation, e.en, e.ar);
                    Op2Table.push(response.option);
                   
                    console.log(response);
                }
                setOption2Table(Op2Table);
            }
            
            console.log('Options added successfully');
            console.log(Op1Table);
            console.log(Op2Table);

        

        } catch (error) {
            console.error('Error adding options:', error);
        }
    
                    
           









        if(typeof options[0]!='undefined'){
            const newOption1 = {
                OptName: Alloptions[0][0].variation,
                values: Alloptions[0].map((e) => ({ ar: e.ar, en: e.en })),
              };
              console.log(newOption1);
              setOption1(newOption1);


              if (Alloptions.length === 2) {
                setHasCombinations(true);
            
                const newOption2 = {
                  OptName: Alloptions[1][0].variation,
                  values: Alloptions[1].map((e) => ({ ar: e.ar, en: e.en })),
                };
            
                setOption2(newOption2);
                // const comp = createCombinations(newOption1, newOption2);
                
                const comps = generateCombinations(Op1Table , Op2Table); 
                setCombinations(comps);
                // console.log(comp);
                console.log(comps);

                
              } else {
                setHasCombinations(false);
                setOption2({ OptName: "", values: [] });
                setCombinations([]);
              }
            

        }else{
            setOption2Flag(true);
            const newOption2 = {
                OptName: Alloptions[1][0].variation,
                values: Alloptions[1].map((e) => ({ ar: e.ar, en: e.en })),
              };
          
              setOption2(newOption2);
        }
        
        
     
        
    };




    function generateCombinations(option1Table, option2Table) {
        const combs = [];
    
        
        console.log(option1Table[0]);
        
        console.log(option2Table);
        option1Table.forEach(option1 => {
            
            option2Table.forEach(option2 => {
                
                const combi = {
                    id1: option1[0].id,
                    value_ar1: option1[0].value_ar,
                    value_en1: option1[0].value_en,
                    variation_id1: option1[0].variation_id,
                    id2: option2[0].id,
                    value_ar2: option2[0].value_ar,
                    value_en2: option2[0].value_en,
                    variation_id2: option2[0].variation_id
                };
                
                combs.push(combi);
            });
        });
        console.log("returned comps" ,combs );
        return combs;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 8 * 1024 * 1024) {
            alert("File size exceeds the limit of 8MB.");
            e.target.value = null; 
            setProductImage(null); 
        } else {
            setProductImage(file);
        }
    };
    const createCombinations = (option1, option2) => {
        
        const combinations = [];
      
        option1.values.forEach((value1) => {
          option2.values.forEach((value2) => {
            const combination = {
              [option1.OptName]: {
                ar: value1.ar,
                en: value1.en,
              },
              [option2.OptName]: {
                ar: value2.ar,
                en: value2.en,
              },
            };
      
            combinations.push(combination);
          });
        });
      
        return combinations;
      };



    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
    
            
    
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            // console.log(auth_key, user_id,
            //     englishName , arabicName,
            //     shortDescriptionEn,shortDescriptionAr,
            //     descriptionEn,descriptionAr,
            //     SelectedCat,
            //     sku,listPrice,
            //     salePrice,barcode, 
            //     quantity,
            //     group);
            //     return;
            const response = await uploadImage(ProductImage);
            if(response.status==false){
                alert("Error Uploading Image");
                setLoading(false);
                return;
            }
            
            const image_name= response.image_name;
            // console.log(image_name);

            

            console.log("group" ,group);
            const AddProductResponse = await addProduct(
                auth_key, user_id,
                englishName , arabicName,
                shortDescriptionEn,shortDescriptionAr,
                descriptionEn,descriptionAr,
                SelectedCat,response.image_name,
                sku,listPrice,
                salePrice,barcode, 
                quantity,
                group
            );
            console.log(AddProductResponse);
            if(AddProductResponse.status===true){
                setProductFlag(true);
                setnewProductId(AddProductResponse.products_id);

                
                alert('Product added successfully');

                if(!isChecked){
                    window.location.href='/products'
                }
            }else{
                alert('Faild to add product');
            }

    
    
        
        } catch (error) {
        //   setError('Failed to add category');                
            alert('Faild to add product');

          console.error('Error adding category:', error);
        } 
        setLoading(false);
      };









      const handleProductIdChange = (index, value) => {
        const newProductIds = [...productIds];
        newProductIds[index] = value;
        setProductIds(newProductIds);
    };
      const SubmitVariations = async (e) => {
        e.preventDefault();
        setLoading(true);
        var success = false;
        try {
            const auth_key = localStorage.getItem('token');
            var pId= newProductId;
            if(Hascombinations){
                console.log("combination form");
                var ids = productIds;
                
                console.log(ids);
                var i = 0;
                for (const combination of combinations) {
                    console.log(parseInt(ids[i]));
                    console.log(auth_key, parseInt(ids[i]), parseInt(pId),parseInt( combination.id1));
                    const response1 = await AssignProduct(auth_key, parseInt(ids[i]),parseInt( combination.id1));
                    console.log("AssignProduct response1:", response1);
                    i++;
                }
                i = 0;
               
                for (const combination of combinations) {
                    const response2 = await AssignProduct(auth_key, parseInt(ids[i]) ,parseInt( combination.id2));
                    console.log(auth_key, parseInt(ids[i]),parseInt(pId) ,parseInt( combination.id2));
                    console.log("AssignProduct response2:", response2);
                    i++;
                }
                
                // const response1 = await AssignProduct(auth_key,9, 120);
                // console.log(response1);
                success = true;

            }
            var ids = productIds;
            if(!Hascombinations && Option1Table.length > 0){
                console.log("!Hascombinations && Option1Table.length > 0");
                console.log("Option1Table",Option1Table);
                console.log("Option2Table",Option2Table);
                let i = 0;
                for (const item of Option1Table) {
                    console.log(auth_key, parseInt(ids[i]), parseInt(item[0].id));
                    console.log(item);
                    const response1 = await AssignProduct(auth_key, parseInt(ids[i]), parseInt(item[0].id));
                    console.log(response1);
                    i++;
                }
                success = true;

            }
            if(!Hascombinations && Option2Table.length > 0){
                console.log("!Hascombinations && Option2Table.length > 0");
                console.log("Option1Table",Option1Table);
                console.log("Option2Table",Option2Table);
                let i =0 ;
                for (const item of Option2Table) {
                    const response1 = await AssignProduct(auth_key, parseInt(ids[i]), parseInt(item.id));
                    console.log(response1);
                    i++;
                }   
                success = true;
            }
            // console.log("Product IDs:", productIds);
        } catch (error) {
            console.error('Error submitting product IDs:', error);
            success = false;
        }
        setLoading(false);
        if(success){
            alert("Operation done successfully");
            window.location.href='/products';
        }else{
            alert("Operation faild");

        }

        
      }
      const CancelHadel =(e)=>{
            e.preventDefault();
            window.location.href = "/products";
      }

    return(
        
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3 >New Product</h3>
            </div>
            
            <div action="" className="row">
                <div className="row Center LoginWithRow">
                    {!ProductFlag&&
                     <form onSubmit={handleSubmit} className="row">

                     <h3 className="categoryheader">Product Name</h3>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                                 English Name
                             </h6>
                         </label>
                         <input 
                             required className="col-lg-12 form-control EmailInput" 
                             placeholder="name in english"
                             value={englishName}
                             onChange={(e) => setEnglishName(e.target.value)}
                         ></input>
                     </div>

                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6 className="">Arabic Name</h6>
 
                         </label>
                         <input 
                             required 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="name in arabic"
                             value={arabicName}
                             onChange={(e) => setArabicName(e.target.value)}
                         ></input>
                     </div>
                     
 
                     <h3 className="categoryheader">Description</h3>
 
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6 className="">Short Description En</h6>
                         
                         </label>
                         <input 
                             required 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="short english description "
                             value={shortDescriptionEn}
                             onChange={(e) => setShortDescriptionEn(e.target.value)}
                         ></input>
                     </div>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                             Short Description Ar
                             </h6>
                         </label>
                         <input 
                             required 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="short arabic description"
                             value={shortDescriptionAr}
                             onChange={(e) => setShortDescriptionAr(e.target.value)}
                         ></input>
                     </div>
 
                     
 
                     <div className="col-lg-12 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                              Description En
                             </h6>
                         </label>
                         <textarea 
                             required 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="english description"
                             value={descriptionEn}
                             onChange={(e) => setDescriptionEn(e.target.value)}
                         ></textarea>
                     </div>
                     <div className="col-lg-12 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                              Description Ar
                             </h6>
                         </label>
                         <textarea 
                             required 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="arabic description"
                             value={descriptionAr}
                             onChange={(e) => setDescriptionAr(e.target.value)}
                         ></textarea>
                     </div>
 
 
                     <h3 className="categoryheader">Product Category</h3>
 
                     <div className="col-lg-12 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
                                 Category Name 
                             </h6>
                         </label>
                         <select
                             required
                             className="col-lg-12 form-select EmailInput"
                             onChange={(e) => setSelectedCat(e.target.value)}
                         >
                             <option value="">Choose...</option>
                             {categories.map(category => (
                                 <option key={category.id} value={category.id}>{category.category}</option>
                             ))}
                         </select>
                     </div>



                    <h3 className="categoryheader">Product Group</h3>
                    <div className="col-lg-12 CategoryFormItem">
                        <label htmlFor="">
                        <h6  className="">Group Name</h6>
                        </label>
                        <select 
                        className="col-lg-12 form-select EmailInput"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        
                        >
                        <option value={0}>Choose...</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.category}</option>
                        ))}
                        </select>
                        
                    </div>
 
                     <h3 className="categoryheader">Codes</h3>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                              Barcode
                             </h6>
                         </label>
                         <input 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="barcode"
                             value={barcode}
                             type="number"
                             onChange={(e) => setBarcode(e.target.value)}
                         ></input>
                     </div>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                              SKU
                             </h6>
                         </label>
                         <input 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="sku"
                             value={sku}
                             onChange={(e) => setSku(e.target.value)}
                         ></input>
                     </div>
 
 
 
                     <h3 className="categoryheader">Pricing</h3>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
 
                              List Price (UAD)
                             </h6>
                         </label>
                         <input 
                             required 
                             type="number" 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="list price in UAD"
                             value={listPrice}
                             onChange={(e) => setListPrice(e.target.value)}
                         ></input>
                     </div>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
                                 Sale Price (UAD)
                             </h6>
                         </label>
                         <input 
                             required 
                             type="number" 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="sale price in UAD"
                             value={salePrice}
                             onChange={(e) => setSalePrice(e.target.value)}
                         ></input>
                     </div>
                     <h3 className="categoryheader">Product Quantity</h3>
                     <div className="col-lg-6 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className="">
                                 Quantity
                             </h6>
                         </label>
                         <input 
                             required 
                             type="number" 
                             className="col-lg-12 form-control EmailInput" 
                             placeholder="quantity"
                             value={quantity}
                             onChange={(e) => setQuantity(e.target.value)}
                         ></input>
                     </div>
 
                     <h3 className="categoryheader">Product Image</h3>
                     <div className="col-lg-12 CategoryFormItem">
                         <label htmlFor="">
                             <h6  className=""> Image</h6>
                         </label>
                         <input 
                            required 
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange} 
                        />
    
                     </div>
 

                     <div className="col-lg-4 EnableVariations CategoryFormItem">
                     <input 
                              
                             id="enablevariations"
                             type="checkbox" 
                             className="col-lg-12 form-checkbox" 
                             placeholder="sale price in UAD"
                            //  value={salePrice}
                            //  onChange={(e) => setSalePrice(e.target.value)}
                            onChange={(e)=>setIsChecked(e.target.checked)}
                         ></input>
                         <label htmlFor="enablevariations">
                             <h6  className="">
                                Enable Variations
                             </h6>
                         </label>
                         
                     </div>


                     <div className="col-lg-12 LoginWithCol CategoryFormBtns">
                     <button className={`btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn ${loading ? 'disabled' : ''}`} disabled={loading}>
                                <span className="Login">{loading ? 'Loading...' : 'Save'}</span>
                            </button>
                         <button onClick={CancelHadel} className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn">
                             <span className="Login"> Cancel </span>
                         </button>
                     </div>
 
 
 
                     </form>
                    
                    }
                   




                    {ProductFlag&&isChecked&& 
                        <div className="row">

                    <h3 className="categoryheader">Product Variations</h3>
                    <span className="categoryheader">You can choose maximum two variations</span>
                    <div className="col-lg-12 row VariationFormItem">
                     
                    {VariationsList.map((variation, index) => (
                        <div key={index} className="CheckBoxes col-lg-1 col-md-2 col-sm-3 col-3">
                            <input
                            className="form-checkbox"
                            type="checkbox"
                            name={variation}
                            id={variation.id}
                            value={variation.id} // Use variation ID as value
                            onChange={handleCheckboxChange}
                            checked={selectedCheckboxes.includes(variation.id)} // Check against variation ID
                            disabled={isApplied}
                            />
                            <label htmlFor={variation.id}>{variation.name_en}</label>
                        </div>
                        ))}

                        <button className="btn col-lg-1 col-md-2 col-5 btn-outline-dark ApplyBtn" onClick={handleSave} disabled={isApplied}>Apply</button>

                    </div>
                    {/* <h3 className="categoryheader">Variation Options</h3>
                        { isApplied&&(
                            <VariationOptions Variations={selectedCheckboxes}  onApply={handleApply} />
                        )}
                    
                    
                    <div className="col-lg-12 VariationFormItem">
                        <div className="col-lg-12 VariationFormItem">
                            <form onSubmit={SubmitVariations} className="table-responsive TableContainer VariationTable">
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                    <th>#</th>
                                    <th colSpan="2">Variation Option 1</th>
                                    <th colSpan="2">Variation Option 2</th>
                                    <th>Product Id</th>
                                    </tr>
                                    <tr>
                                    <th></th>
                                    <th>Ar</th>
                                    <th>En</th>
                                    <th>Ar</th>
                                    <th>En</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Hascombinations && combinations.map((combination, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{combination.value_ar1}</td>
                                            <td>{combination.value_en1}</td>
                                            <td>{combination.value_ar2}</td>
                                            <td>{combination.value_en2}</td>
                                            <td>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="product id"
                                                    value={productIds[index] || ''}
                                                    onChange={(e) => handleProductIdChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}

                                    {!Hascombinations && Option1Table.length > 0 && Option1Table.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value[0].value_ar}</td>
                                            <td>{value[0].value_en}</td>
                                            <td colSpan="2">___________</td>
                                            <td>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="product id"
                                                    value={productIds[index] || ''}
                                                    onChange={(e) => handleProductIdChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}

                                    {!Hascombinations && Option2Table.length > 0 && Option2Table.map((value, index) => (


                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td colSpan="2">___________</td>
                                            <td>{value[0].value_ar}</td>
                                            <td>{value[0].value_en}</td>
                                            <td>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="product id"
                                                    value={productIds[index] || ''}
                                                    onChange={(e) => handleProductIdChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                                </table>
                                <div className="LoginWithCol CategoryFormBtns">
                                <button className={`btn btn-warning col-lg-1 col-md-2 col-5 ${loading ? 'disabled' : ''}`}  disabled={loading}>
                                    <span className="Login">{loading ? 'Loading...' : 'Save'}</span>
                                </button>
                                    <button onClick={CancelHadel} className="btn btn-warning  col-lg-1 col-md-2 col-5">
                                        <span className="Login"> Cacel </span>
                                    </button>
                                </div>
                            </form>
                                

                        </div>
                    </div> */}
                    
                        </div>

                    }
                    

                    

                                            
                    </div>
                
            </div>
        </div>

    );
}
export default AddProduct;