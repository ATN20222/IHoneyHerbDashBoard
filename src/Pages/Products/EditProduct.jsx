import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ListCategories, ProductDetails, EditProduct as EditProductApi, uploadImage, listVariation, AddOption, AssignProduct, TestCats, DropDown } from "../../Services/Api";
import VariationOptions from "./VariatioinOptions";

const EditProduct = () => {



    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [HasVariations, setHasVariations] = useState(false);
    const [selectedCat, setSelectedCat] = useState('');
    const [barcode, setBarcode] = useState('');
    const [sku, setSku] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [IsExist, setIsExist] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const pathname = location.pathname.split('/');
    const productId = pathname[pathname.length-1];  




    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isApplied, setIsApplied] = useState(false);
    const [combinations, setCombinations] = useState([]);
    const [Hascombinations, setHasCombinations] = useState(false);
    const [Option2Flag, setOption2Flag] = useState(false);
    

    const [arabicName, setArabicName] = useState('');
    const [englishName, setEnglishName] = useState('');
    const [shortDescriptionEn, setShortDescriptionEn] = useState('');
    const [shortDescriptionAr, setShortDescriptionAr] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');


    const [VariationsList, setVariationsList] = useState([]);
    const [CombinationList, setCombinationList] = useState([]);
    const [Option1Table, setOption1Table] = useState([]);
    const [Option2Table, setOption2Table] = useState([]);

    const [productIds, setProductIds] = useState([]);

    const [ProductFlag, setProductFlag] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [quantity , setQuantity]  = useState(0);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(0);
    
    const newProductId=productId;

    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryError, setCategoryError] = useState(false);

    const handleGroupCheckboxChange = (groupId, isChecked) => {
        if (isChecked) {
            setSelectedGroups([...selectedGroups, groupId]);
        } else {
            setSelectedGroups(selectedGroups.filter(id => id !== groupId));
        }
    };




    const handleCategoryCheckboxChange = (categoryId, isChecked) => {
        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }
        
        // setCategoryError(selectedCategories.length === 0);
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


    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const auth_key = localStorage.getItem('token');
    //       const user_id = localStorage.getItem('user_id');
    //       const response = await ListCategories(auth_key, user_id);
    //       if (response && response.status && response.categories_list) {
    //         setCategories(response.categories_list);
    //         console.log(response.categories_list);
    //       } else {
    //         console.error('Invalid response format:', response);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching categories:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);


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






    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ProductDetails(auth_key, productId);
                console.log("response",response        );
                if (response && response.status && response.product_view) {
                    setIsExist(true);
                    const productData = response.product_view;
                    setProduct(productData);
                    // setSelectedCat(productData.category_id);
                    // setGroup(productData.group_id);
                    var CIds =  response.product_view.category_id.split(",");
                    var GIds = response.product_view.group_id.split(",");
                    console.log("CIds", GIds);
                    console.log("GIds" , GIds);
                    setSelectedCategories(CIds)
                    setSelectedGroups(GIds);
                    setSku(productData.sku);
                    setBarcode(productData.barcode);
                    setListPrice(productData.list_price);
                    setSalePrice(productData.sale_price);
                    setQuantity(productData.quantity);

                    if(productData.variations!=null){
                        setHasVariations(true);
                    }
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
        GetCatData();
        getGroups();
    }, [productId]);

    const GetCatData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const response = await TestCats(auth_key, user_id);
            if (response && response.status && response.categories_list) {
                setCategories( getCategoryList(response.categories_list));
                console.log(response.categories_list);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        if (selectedCategories.length === 0) {
            setCategoryError(true); 
            return; 
        }

        setLoading(true);

        try {
            const resp = await uploadImage(productImage);
            if (resp.status === false) {
                alert("Error Uploading Image");
                setLoading(false);
                return;
            } else {
                const image_name = resp.image_name;
                const finalCats = selectedCategories.join(',');
                const finalGroups = selectedGroups.join(',');

                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                
                
                const response = await EditProductApi(
                    auth_key,
                    user_id,
                    productId,
                    product.name_en,
                    product.name_ar,
                    product.short_desc_en,
                    product.short_desc_ar,
                    product.description_en,
                    product.description_ar,
                    finalCats,
                    image_name,
                    sku,
                    listPrice,
                    salePrice,
                    barcode,
                    quantity,
                    finalGroups
                );
                if (response.status === true) {
                    alert("Product edited successfully");
                } else {
                    alert("Failed to edit product");
                }
            }
        } catch (error) {
            console.error('Failed to edit product:', error);
            alert("Failed to edit product");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        window.location.href = "/products";
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3>Edit Product</h3>
            </div>
            
            <div action="" className="row">
                    {IsExist ?(
                        <div className="row Center LoginWithRow">
                        <form onSubmit={handleSubmit} className="row">
                        <h3 className="categoryheader">Product name</h3>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">English Name</h6>
                            </label>
                            <input 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="name in english"
                                value={product.name_en || ''}
                                onChange={(e) => setProduct({ ...product, name_en: e.target.value })}
                            />
                        </div>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Arabic Name</h6>
                            </label>
                            <input 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="name in arabic"
                                value={product.name_ar || ''}
                                onChange={(e) => setProduct({ ...product, name_ar: e.target.value })}
                            />
                        </div>
                        

                        <h3 className="categoryheader">Description</h3>

                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Short description En</h6>
                            </label>
                            <input 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="short english description "
                                value={product.short_desc_en || ''}
                                onChange={(e) => setProduct({ ...product, short_desc_en: e.target.value })}
                            />
                        </div>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Short description Ar</h6>
                            </label>
                            <input 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="short arabic description"
                                value={product.short_desc_ar || ''}
                                onChange={(e) => setProduct({ ...product, short_desc_ar: e.target.value })}
                            />
                        </div>

                        <div className="col-lg-12 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Description En</h6>
                            </label>
                            <textarea 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="english description"
                                value={product.description_en || ''}
                                onChange={(e) => setProduct({ ...product, description_en: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="col-lg-12 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Description Ar</h6>
                            </label>
                            <textarea 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="arabic description"
                                value={product.description_ar || ''}
                                onChange={(e) => setProduct({ ...product, description_ar: e.target.value })}
                            ></textarea>
                        </div>

                        <h3 className="categoryheader">Product Category</h3>
                            <div className="col-lg-12 CategoryFormItem">
                                <h6 className="">Category Name</h6>
                                <div className="dropdown">
                                    {categories.map(category => (
                                        <div key={category.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`category-${category.id}`}
                                                value={category.id}
                                                checked={selectedCategories.includes(category.id)}
                                                
                                                onChange={(e) => handleCategoryCheckboxChange(category.id, e.target.checked)}
                                                
                                            />
                                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                                {category.category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {categoryError && <p className="text-danger">Please select at least one category.</p>}

                            </div>


                            <h3 className="categoryheader">Product Group</h3>
                            <div className="col-lg-12 CategoryFormItem">
                                <h6 className="">Group Name</h6>
                                
                                    <div className="dropdown">
                                        {groups.map(group => (
                                        <div key={group.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`group-${group.id}`}
                                                value={group.id}
                                                checked={selectedGroups.includes(group.id)}
                                                onChange={(e) => handleGroupCheckboxChange(group.id, e.target.checked)}
                                                
                                            />
                                            <label className="form-check-label" htmlFor={`group-${group.id}`}>
                                                {group.category}
                                            </label>
                                        </div>
                                    ))}

                                    </div>
                                
                                
                                
                            </div>


                        <h3 className="categoryheader">Codes</h3>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Barcode</h6>
                            </label>
                            <input 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="barcode"
                                value={barcode || ''}
                                type="number"
                                onChange={(e) => setBarcode(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">SKU</h6>
                            </label>
                            <input 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="sku"
                                value={sku || ''}
                                onChange={(e) => setSku(e.target.value)}
                            />
                        </div>

                        <h3 className="categoryheader">Pricing</h3>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">List Price (UAD)</h6>
                            </label>
                            <input 
                                required 
                                type="number" 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="list price in UAD"
                                value={listPrice || ''}
                                onChange={(e) => setListPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Sale Price (UAD)</h6>
                            </label>
                            <input 
                                required 
                                type="number" 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="sale price in UAD"
                                value={salePrice || ''}
                                onChange={(e) => setSalePrice(e.target.value)}
                            />
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
                                <h6 className="">Image</h6>
                            </label>
                            <input 
                             
                            className="col-lg-12 form-control EmailInput" 
                            type="file" 
                            placeholder="name in english"
                            onChange={handleFileChange} 
                        />
                        </div>
                        {!HasVariations&&
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
                        }

                    {isChecked&& !HasVariations&&
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

                        <button type="button" className="btn col-lg-1 col-md-2 col-5 btn-outline-dark ApplyBtn" onClick={handleSave} disabled={isApplied}>Apply</button>

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

                        <div className="col-lg-12 LoginWithCol CategoryFormBtns">
                                <button 
                                    type="submit" 
                                    className="btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn" 
                                    disabled={loading}
                                >
                                    <span className="Login">{loading ? "Saving..." : "Save"}</span>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleCancel} 
                                    className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn"
                                    disabled={loading}
                                >
                                    <span className="Login"> Cancel </span>
                                </button>
                            </div>
                    </form>
                    
                        
                    
                    



                    </div>
                    ) : (
                        <div>No product found</div>
                    )}
            </div>
        </div>
    );
};

export default EditProduct;
