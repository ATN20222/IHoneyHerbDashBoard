import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddPhotos, ListCategories, ProductDetails, RemoveOption, uploadImage } from "../../Services/Api";
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
    const [IsExist, setIsExist] = useState(false);
    const [productImage, setProductImage] = useState(null);
    const [productImages, setproductImages] = useState([]);
    const [photos, setphotos] = useState([]);
    const [Variations, setVariations] = useState([]);
    const [OnlyOneVariation, setOnlyOneVariation] = useState(false);
    
    const [loading, setLoading] = useState(false); 
    const location = useLocation();
    const pathname = location.pathname.split('/');
    const productId = pathname[pathname.length-1];  


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
                    setSelectedCat(productData.category_id);
                    setSku(productData.sku);
                    setBarcode(productData.barcode);
                    setListPrice(productData.list_price);
                    setSalePrice(productData.sale_price);
                    setProductImage(productData.main_image);
                    if(productData.variations!=null){
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
    }, [productId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ListCategories(auth_key, user_id);
                if (response && response.status && response.categories_list) {
                    setCategories(response.categories_list);
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

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
                alert("Operation done successfully");
                window.location.reload();
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
                                            <span>Upload Product images</span>
                                        </div>
                                        <input      
                                            required 
                                            className="col-lg-12 ImagesUpload" 
                                            type="file" 
                                            onChange={handleImageChange}
                                            multiple
                                            
                                        />
                                        <span> You select {productImages.length} images</span>
                                    </div>
                                
                                </div>
                                
                            </div>

                            <h3 className="categoryheader">Product name</h3>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Arabic name</h6>
                                </label>
                                <input disabled
                                    required 
                                    className="col-lg-12 form-control EmailInput" 
                                    placeholder="name in arabic"
                                    value={product.name_ar || ''}
                                    
                                />
                            </div>
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

                            <h3 className="categoryheader">Description</h3>

                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">Short description en</h6>
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
                                    <h6 className="">Short description ar</h6>
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
                                    <h6 className="">Description en</h6>
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
                                    <h6 className="">Description ar</h6>
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
                                <label htmlFor="">
                                    <h6 className="">Category name</h6>
                                </label>
                                <select
                                    required
                                    disabled
                                    className="col-lg-12 form-select EmailInput"
                                    value={selectedCat}
                                    
                                >
                                    <option value="">Choose...</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.cat_name_en}</option>
                                    ))}
                                </select>
                            </div>

                            <h3 className="categoryheader">Codes</h3>
                            <div className="col-lg-6 CategoryFormItem">
                                <label htmlFor="">
                                    <h6 className="">BARCODE</h6>
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
                            <h3 className="categoryheader">Variations</h3>
                            <div className="table-responsive TableContainer">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                        <th>#</th>
                                        <th colSpan="2">Variation Option 1</th>
                                        <th colSpan="2">Variation Option 2</th>
                                        <th>Product Id</th>
                                        <th>Delete</th>
                                        </tr>
                                        <tr>
                                        <th></th>
                                        <th>Ar</th>
                                        <th>En</th>
                                        <th>Ar</th>
                                        <th>En</th>
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
                                            <button className="btn btn-warning" onClick={() => handleDelete(productId, options[0].option_id , null)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                </table>
                            </div>







                            
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                
                                   
                                    <div className="col-lg-12 LoginWithCol CategoryFormBtns">
                                        <button className="btn btn-warning col-lg-1 col-md-2 col-5 LoginBtn SaveBtn" disabled={loading}>
                                            <span className="Login"> Save </span>
                                        </button>
                                        <button onClick={handleCancel} className="btn btn-warning col-lg-1 col-md-2 col-5 CancelBtn" disabled={loading}>
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