import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddOption, AddPhotos, AssignProduct, DropDown, ListCategories, ProductDetails, RemoveOption, TestCats, uploadImage } from "../../Services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const Details= ()=>{
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    const [barcode, setBarcode] = useState('');
    const [sku, setSku] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [quantity , setQuantity]  = useState(0);
    const [IsExist, setIsExist] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [productImages, setproductImages] = useState([]);
    const [photos, setphotos] = useState([]);
    const [Variations, setVariations] = useState([]);
    const [newVariations, setnewVariations] = useState([]);
    const [OnlyOneVariation, setOnlyOneVariation] = useState(false);
    const [OneVar, setOneVar] = useState(false);
    const [HasVariations, setHasVariations] = useState(false);
    const [newRecords, setNewRecords] = useState([]);
    const [varIds, setvarIds] = useState([]);
    const [varNames, setvarNames] = useState([]);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const location = useLocation();
    const pathname = location.pathname.split('/');
    const productId = pathname[pathname.length-1];  





    const handleAddRecord = () => {
        
        const emptyRecord = {
            productId: '',
            option1En: '',
            option1Ar: '',
            option2En: '',
            option2Ar: ''
        };
        setNewRecords([...newRecords, emptyRecord]);
    };
    const handleDeleteRecord = (index) => {
        
        const updatedRecords = [...newRecords];
        updatedRecords.splice(index, 1);
        setNewRecords(updatedRecords);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ProductDetails(auth_key, productId);
                if (response && response.status && response.product_view) {
                    console.log(response)
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
                    setProductImage(productData.main_image);
                    setnewVariations(productData.variations);
                    setQuantity(productData.quantity);
                    console.log(productData.variations);
                    if(productData.variations!=null){
                        setHasVariations(true);


                        


                        // console.log("vars",productData.variations.filter(variation => variation.variation_id !== null));
                        var Ids = [];
                        var Names = [] ; 
                        for(const item of productData.variations){
                            console.log(item.variation_id);
                            console.log(item.variation_name_en);
                                Names.push(item.variation_name_en);
                                Ids.push(item.variation_id);
                        }
                        setvarNames([...new Set(Names)]);
                        const ids=[...new Set(Ids)];
                        setvarIds(ids);
                        console.log(Ids);
                        if(ids.length<2){
                            console.log("Ids.length<2",Ids);
                            setOneVar(true);
                        }








                        
                        productData.variations = productData.variations.filter(variation => variation.product_id !== null);
                        
                
                        setVariations( productData.variations );
                        // setVariations(productData.variations);

                        const groupedByProductId = productData.variations.reduce((acc, obj) => {
                            const productId = obj.product_id;
                            if (!acc[productId]) {
                                acc[productId] = [];
                            }
                            acc[productId].push(obj);
                            return acc;
                        }, {});
                        setVariations(groupedByProductId);
                        
                        
                        console.log(groupedByProductId);
                        // if(groupedByProductId)
                        const innerLengths = Object.values(groupedByProductId).map(array => array.length);
                        console.log(innerLengths[0]);
                        if(innerLengths[0]==1){
                            setOnlyOneVariation(true);
                        }
                    }
                    if(productData.photos!=null){

                        setphotos(productData.photos);
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
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const auth_key = localStorage.getItem('token');
    //             const user_id = localStorage.getItem('user_id');
    //             const response = await ListCategories(auth_key, user_id);
    //             if (response && response.status && response.categories_list) {
    //                 setCategories(response.categories_list);
    //             } else {
    //                 console.error('Invalid response format:', response);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);




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





    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];

        files.forEach((file) => {
            if (file.size <= 8 * 1024 * 1024) { 
                newImages.push((file));
            } else {
                alert(`Image ${file.name} exceeds the maximum size limit of 8MB and won't be uploaded.`);
            }
        });

        setproductImages([...productImages, ...newImages]);
    };


    
    const handleDelete = async (productId, optionId , option2Id) => {
        console.log("Deleting option:", optionId, "for product:", productId);
        try {
            const auth_key = localStorage.getItem('token');
            const response = await RemoveOption(auth_key, productId, optionId);
            if(option2Id!=null){
                const response = await RemoveOption(auth_key, productId, option2Id);
            }
            if (response.status) {
                alert("Deleted successfully");
                window.location.reload();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            alert("Failed to delete");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!loading) { 
                setLoading(true); 
                let ImageNames = [];
                for (const image of productImages) {
                    const response = await uploadImage(image);
                    ImageNames.push(response.image_name);
                }
                console.log("Images uploaded successfully!");
                console.log(ImageNames);
                const auth_key = localStorage.getItem('token');

                for(const image in ImageNames){
                    console.log(ImageNames[image]);
                    const response = await AddPhotos(auth_key ,productId ,ImageNames[image] );
                    console.log(response);
                }

                
              

                console.log("newRecords",newRecords[0]);


                let variationIds = varIds;

                console.log("Variations" , newVariations);
                console.log("Variations" , Variations);
                Object.keys(Variations).forEach(key => {
                    Variations[key].forEach(option => {
                        if ('variation_id' in option) {
                            variationIds.push(option.variation_id);
                        }
                    });
                });

                
                let TableData =[];
                console.log(variationIds);
                for (const record of newRecords) {
                    
                    console.log(auth_key, record.productId, variationIds[0], record.option1Ar, record.option1En);
                    let response = await AddOption(auth_key, productId, variationIds[0], record.option1En,record.option1Ar);
                    
                    
                    if(response.status===true){
                        
                        let Td = {
                            ProductId: record.productId,
                            OptionId: response.option[0].id,
                        };
                        TableData.push(Td);
                        console.log("Td" , Td);
                        console.log("TableData1" , TableData);
                    }else{
                        alert("error");
                    }
                  
                    
                    if (record.option2Ar !== '' && record.option2En !== '') {
                        console.log(auth_key, productId, variationIds[1], record.option2Ar, record.option2En);
                        response = await AddOption(auth_key,productId, variationIds[1], record.option2En, record.option2Ar);
                        if(response.status===true){
                            
                            let Td = {
                                ProductId: record.productId,
                                OptionId: response.option[0].id,
                            };
                            TableData.push(Td);
                            console.log("Td" , Td);
                            console.log("TableData2" , TableData);

                        }else{
                            alert("error");
                        }
                       

                        
                        
                    }
                    
                }
                console.log(variationIds);
                console.log(productId);
                console.log("Table Data" , TableData);
                let flag = true;
                for(const item of TableData){
                    console.log("item" , item);
                    const response = await AssignProduct(auth_key,item.ProductId,item.OptionId);
                    flag = response.status;
                    console.log(response);
                    
                }
                if(flag){

                    alert("Operation done successfully");
                    window.location.reload();
                }else{
                    alert("error");
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleCancel = () => {
        
        window.location.href="/products";
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3>Product Details</h3>
                
            </div>
            
            <div action="" className="row">
                <div className="row Center LoginWithRow">
                    {IsExist ?(
                        <form onSubmit={handleSubmit} className="row">


                            <h3 className="categoryheader">Product Image</h3>
                            <h3 className="categoryheader">Product ID : {productId}</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 CategoryFormItem">
                                <div className="row">
                                    <div className="col-lg-3 col-md-5 col-sm-5 col-5 ImageItem card">
                                        <img src={productImage} width="100%" alt="" />
                                    </div>
                                    

                                    {photos.length>0&&
                                        photos.map((photo, index) => (
                                            <div key={index} className="col-lg-3 col-md-5 col-sm-5 col-5 card Center ImageItem ContainerImagesUpload">
                                                <img src={photo.photo} width="100%" alt="" />
                                            </div>
                                        ))
                                    }


                                    <div className="col-lg-3 col-md-5 col-sm-5 col-5 card Center ImageItem ContainerImagesUpload">
                                        <FontAwesomeIcon icon={faUpload}/>
                                        <div className="text-align-center">
                                            <span>Upload Product Images</span>
                                        </div>
                                        <input      
                                             
                                            className="col-lg-12 ImagesUpload" 
                                            type="file" 
                                            onChange={handleImageChange}
                                            multiple
                                            
                                        />
                                        <span> You select {productImages.length} images</span>
                                    </div>
                                
                                </div>
                                
                            </div>

                            <h3 className="categoryheader">Product Name</h3>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">English Name</h6>
                                </label>
                                <input disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="name in english"
                                    value={product.name_en || ''}
                                    
                                />
                            </div>

                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Arabic Name</h6>
                                </label>
                                <input disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="name in arabic"
                                    value={product.name_ar || ''}
                                    
                                />
                            </div>
                            
                            <h3 className="categoryheader">Description</h3>

                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Short description En</h6>
                                </label>
                                <input disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="short english description "
                                    value={product.short_desc_en || ''}
                                    
                                />
                            </div>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Short description Ar</h6>
                                </label>
                                <input disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="short arabic description"
                                    value={product.short_desc_ar || ''}
                                    
                                />
                            </div>

                            <div className="col-lg-12 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Description En</h6>
                                </label>
                                <textarea 
                                    disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="english description"
                                    value={product.description_en || ''}
                                    
                                ></textarea>
                            </div>
                            <div className="col-lg-12 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Description Ar</h6>
                                </label>
                                <textarea 
                                    disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="arabic description"
                                    value={product.description_ar || ''}
                                    
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
                                                
                                                // onChange={(e) => handleCategoryCheckboxChange(category.id, e.target.checked)}
                                                disabled
                                            />
                                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                                {category.category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {/* {categoryError && <p className="text-danger">Please select at least one category.</p>} */}

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
                                                // onChange={(e) => handleGroupCheckboxChange(group.id, e.target.checked)}
                                                disabled
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
                                <input disabled
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="barcode"
                                    value={barcode || ''}
                                    type="number"
                                    
                                />
                            </div>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">SKU</h6>
                                </label>
                                <input disabled
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="sku"
                                    value={sku || ''}
                                    
                                />
                            </div>

                            <h3 className="categoryheader">Pricing</h3>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">List Price (UAD)</h6>
                                </label>
                                <input disabled
                                    required 
                                    type="number" 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="list price in UAD"
                                    value={listPrice || ''}
                                    
                                />
                            </div>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Sale Price (UAD)</h6>
                                </label>
                                <input disabled
                                    required 
                                    type="number" 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="sale price in UAD"
                                    value={salePrice || ''}
                                    
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
                                    disabled
                                    required 
                                    type="number" 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="quantity"
                                    value={quantity}
                              
                                ></input>
                            </div>

                            {HasVariations&&
                                <div className="table-responsive TableContainer">
                            <h3 className="categoryheader">Variations</h3>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                        <th>#</th>
                                        <th colSpan="2">{varNames[0]}</th>
                                        <th colSpan="2">{varNames[1]}</th>
                                        <th>Product ID</th>
                                        <th>Delete</th>
                                        </tr>
                                        <tr>
                                        <th></th>
                                        <th>En</th>
                                        <th>Ar</th>
                                        <th>En</th>
                                        <th>Ar</th>
                                        <th></th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                    
                                        {!OnlyOneVariation && Object.entries(Variations).map(([productId, options]) => (
                                            <tr key={productId}>
                                            <td>#</td>
                                            <td>{options[0].value_en}</td>
                                            <td>{options[0].value_ar}</td>
                                            <td>{options[1].value_en}</td>
                                            <td>{options[1].value_ar}</td>
                                            <td>{productId}</td>
                                            <td>
                                            <button className="btn btn-warning" onClick={() => handleDelete(productId, options[0].option_id , options[1].option_id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            </td>
                                            </tr>
                                        )) }

                                        {!OnlyOneVariation &&newRecords.map((record, index) => (

                                            <tr key={index}>
                                                <td>#</td>
                                                
                                                <td>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        value={record.option1En}
                                                        onChange={(e) => {
                                                            const updatedRecords = [...newRecords];
                                                            updatedRecords[index].option1En = e.target.value;
                                                            setNewRecords(updatedRecords);
                                                        }}
                                                    />
                                                </td>


                                                <td>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        value={record.option1Ar}
                                                        onChange={(e) => {
                                                            const updatedRecords = [...newRecords];
                                                            updatedRecords[index].option1Ar = e.target.value;
                                                            setNewRecords(updatedRecords);
                                                        }}
                                                    />
                                                </td>


                                                
                                                <td>
                                                <input
                                                        disabled = {OneVar}
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        value={record.option2En}
                                                        onChange={(e) => {
                                                            const updatedRecords = [...newRecords];
                                                            updatedRecords[index].option2En = e.target.value;
                                                            setNewRecords(updatedRecords);
                                                        }}
                                                    />
                                                </td>


                                                <td>
                                                <input
                                                        disabled={OneVar}
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        value={record.option2Ar}
                                                        onChange={(e) => {
                                                            const updatedRecords = [...newRecords];
                                                            updatedRecords[index].option2Ar = e.target.value;
                                                            setNewRecords(updatedRecords);
                                                        }}
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        type="number"
                                                        value={record.productId}
                                                        onChange={(e) => {
                                                            const updatedRecords = [...newRecords];
                                                            updatedRecords[index].productId = e.target.value;
                                                            setNewRecords(updatedRecords);
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-warning" onClick={() => handleDeleteRecord(index)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>

                                        ))}


                                        
                                        {OnlyOneVariation && Object.entries(Variations).map(([productId, options]) => (
                                            <tr key={productId}>
                                            <td>#</td>
                                            <td>{options[0].value_en}</td>
                                            <td>{options[0].value_ar}</td>
                                            <td>____________</td>
                                            <td>____________</td>
                                            <td>{productId}</td>
                                            <td>
                                            <button type="button" className="btn btn-warning" onClick={() => handleDelete(productId, options[0].option_id , null)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            </td>
                                            </tr>


                                    
                                            



                                        ))}

                                        {OnlyOneVariation&&newRecords.map((record, index) => (


                                        <tr key={index}>
                                            <td>#</td>
                                           
                                            <td>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="text"
                                                    value={record.option1En}
                                                    onChange={(e) => {
                                                        const updatedRecords = [...newRecords];
                                                        updatedRecords[index].option1En = e.target.value;
                                                        setNewRecords(updatedRecords);
                                                    }}
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    required
                                                    
                                                    className="form-control"
                                                    type="text"
                                                    value={record.option1Ar}
                                                    onChange={(e) => {
                                                        const updatedRecords = [...newRecords];
                                                        updatedRecords[index].option1Ar = e.target.value;
                                                        setNewRecords(updatedRecords);
                                                    }}
                                                />
                                            </td>

                                            <td>
                                               ____________
                                            </td>
                                            <td>
                                               ____________
                                            </td>
                                            <td>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="number"
                                                    value={record.productId}
                                                    onChange={(e) => {
                                                        const updatedRecords = [...newRecords];
                                                        updatedRecords[index].productId = e.target.value;
                                                        setNewRecords(updatedRecords);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => handleDeleteRecord(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>

                                        ))}


                                       

                                        </tbody>
                                </table>
                                        
                                            <div className="AddRecord col-lg-12">
                                                <button type="button" onClick={handleAddRecord} className="btn btn-dark">
                                                    Add Record
                                                </button>
                                            </div>
                                            
                                        
                            </div>
                            }
                            







                            
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                
                                   
                                    <div className="col-lg-12 LoginWithCol CategoryFormBtns">
                                        <button className="btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn" disabled={loading}>
                                            <span className="Login"> Save </span>
                                        </button>
                                        <button type="button" onClick={handleCancel} className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn" disabled={loading}>
                                            <span className="Login"> Cancel </span>
                                        </button>
                                    </div>
                                
                            )}
                           
                        </form>
                    ):(  <div>No product found</div>)
                    }
                   
                </div>
            </div>
        </div>
    );
};
export default Details;