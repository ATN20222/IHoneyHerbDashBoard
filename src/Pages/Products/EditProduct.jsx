import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ListCategories, ProductDetails, EditProduct as EditProductApi, uploadImage, TestCats } from "../../Services/Api";

const EditProduct = () => {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                const response = await ProductDetails(auth_key, productId);
                if (response && response.status && response.product_view) {
                    setIsExist(true);
                    const productData = response.product_view;
                    setProduct(productData);
                    setSelectedCat(productData.category_id);
                    setSku(productData.sku);
                    setBarcode(productData.barcode);
                    setListPrice(productData.list_price);
                    setSalePrice(productData.sale_price);
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

        setLoading(true);

        try {
            const resp = await uploadImage(productImage);
            if (resp.status === false) {
                alert("Error Uploading Image");
                setLoading(false);
                return;
            } else {
                const image_name = resp.image_name;

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
                    selectedCat,
                    image_name,
                    sku,
                    listPrice,
                    salePrice,
                    barcode
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
                <div className="row Center LoginWithRow">
                    {IsExist ?(
                        <form onSubmit={handleSubmit} className="row">
                        <h3 className="categoryheader">Product name</h3>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Arabic name</h6>
                            </label>
                            <input 
                                required 
                                className="col-lg-12 form-control EmailInput" 
                                placeholder="name in arabic"
                                value={product.name_ar || ''}
                                onChange={(e) => setProduct({ ...product, name_ar: e.target.value })}
                            />
                        </div>
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

                        <h3 className="categoryheader">Description</h3>

                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">Short description en</h6>
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
                                <h6 className="">Short description ar</h6>
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
                                <h6 className="">Description en</h6>
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
                                <h6 className="">Description ar</h6>
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
                            <label htmlFor="">
                                <h6 className="">Category name</h6>
                            </label>
                            <select
                                required
                                className="col-lg-12 form-select EmailInput"
                                value={selectedCat}
                                onChange={(e) => setSelectedCat(e.target.value)}
                            >
                                <option value="">Choose...</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                        </div>

                        <h3 className="categoryheader">Codes</h3>
                        <div className="col-lg-6 CategoryFormItem">
                            <label htmlFor="">
                                <h6 className="">BARCODE</h6>
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
                    ) : (
                        <div>No product found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
