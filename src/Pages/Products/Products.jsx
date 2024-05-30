import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faEye, faClone, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductImage from '../../Assets/Images/ProductImage.png';
import { RemoveProduct, SearchProduct, addProduct, listProducts } from "../../Services/Api";
import DeleteProduct from "./DeleteProduct";
import Swal from "sweetalert2";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [SearchProducts, setSearchProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setstart] = useState(0);
    const [limit, setlimit] = useState(50);
    const [TotalProducts, seTotalProducts] = useState(0);
     
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [EnableShowMore, setEnableShowMore] = useState(false);
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        
        fetchData();
    }, [page]);
    const fetchData = async () => {
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            console.log(auth_key, user_id, limit, start);
            const response = await listProducts(auth_key, user_id, limit, start);
            
            console.log("response" , response);
            if ( response.status ) {
                
                    setProducts([...products,...response.products_list]);
                    if(response.products_list[0].total_products > start+limit ){
                        setEnableShowMore(true);
                    }else{
                        setEnableShowMore(false); 

                    }
                    setstart(start + limit );
                    setlimit(50);
                    
            } else{
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
            console.error('Error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }finally {
            setLoading(false);
        }
    };

    const handleShowMore = async () => {   
            fetchData();
    };


    const handleDeleteProduct = (productId) => {
        setSelectedProductId(productId);
        setShowDeleteProduct(true);
    };



    const confirmDeleteProduct = async () => {
        
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            const response = await RemoveProduct(auth_key, user_id, selectedProductId);
            console.log(response);
            if (response.status) {
                window.location.reload();
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
            console.error('Error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }
    };

    const DuplicateProduct = async (product)=>{
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            const response = await addProduct(auth_key, user_id,
                product.name_en ,product.name_ar ,
                product.short_desc_en , product.short_desc_ar,
                product.description_en,product.description_ar,
                product.category_id,null,
                product.sku,product.list_price,
                product.sale_price,product.barcode,
                product.quantity,product.group_id
                
            );
            console.log("Product cloned successfully!",response);
            if (response.status) {
                // alert("Product cloned successfully!");

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product cloned successfully!",
                    showConfirmButton: false,
                    timer: 2500
                  });

                  setTimeout(() => {
                    window.location.href=`/editproduct/${response.products_id}`
          
                }, 3000);

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
            console.error('Error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        Filter();
        if(event.target.value==""){
            setSearchProducts([]);
        }
        
    };
    const Filter = async ()=>{
        // const filteredProducts = products.filter((product) =>
        //     product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //     product.name_ar.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            
            const response = await SearchProduct(auth_key, user_id, searchQuery);
            console.log(response);
            if (response.status) {
                setSearchProducts(response.products);
                
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
            console.error('Error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 3000
              });
        }

        


        
    }


    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            {showDeleteProduct && <DeleteProduct onClose={() => setShowDeleteProduct(false)} onConfirmDelete={confirmDeleteProduct} />}

            <div className="CategoriesHeader">
                <h3>All Products</h3>
                <Link className="btn btn-warning" to="/addproduct">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>

            <div className="12 Search ">
                <div className="row">
                        <div className="col-12 SearchItem">
                        <input 
                        className=" form-control " 
                        placeholder="Search by name "
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                        <button className="btn btn-warning" onClick={Filter} >
                            <FontAwesomeIcon icon={faSearch}/> 
                        </button>
                    </div>
                    
                </div>
            
            


        


            </div>
            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        
                        <tr>
                            <th>Product ID</th>
                            <th>Image</th>
                            <th>Name En </th>
                            <th>Name Ar </th>
                            <th>Category</th>
                            <th>Group</th>
                            <th>Sale Price</th>
                            <th>List Price</th>
                            <th>Edit</th>
                            <th>View</th>
                            <th>Duplicate</th>
                            <th>Delete</th>

                        </tr>
                        
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8">Loading...</td>
                            </tr>
                        ) : (
                            searchQuery.length==0?
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img src={product.thumb_image} width="40px" alt="" />
                                    </td>
                                    <td>{product.name_en}</td>
                                    <td>{product.name_ar}</td>
                                    <td>{product.category_name}</td>
                                    <td>{product.group_name||"______"}</td>
                                    <td>{product.sale_price}</td>
                                    <td>{product.list_price}</td>
                                    <td>
                                        <Link to={`/editproduct/${product.id}`} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faPen}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/productdetails/${product.id}`} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faEye}/>
                                        </Link>
                                    </td>
                            
                                    <td>
                                        <button onClick={()=>DuplicateProduct(product)} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faClone}/>
                                        </button>
                                    </td>


                                     <td>
                                        <button className="btn btn-warning" onClick={() => handleDeleteProduct(product.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </td>

                                </tr>
                            ))
                            :
                            SearchProducts.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img src={product.thumb_image} width="40px" alt="" />
                                    </td>
                                    <td>{product.name_en}</td>
                                    <td>{product.name_ar}</td>
                                    <td>{product.category_name}</td>
                                    <td>{product.group_name||"______"}</td>
                                    <td>{product.sale_price}</td>
                                    <td>{product.list_price}</td>
                                    <td>
                                        <Link to={`/editproduct/${product.id}`} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faPen}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/productdetails/${product.id}`} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faEye}/>
                                        </Link>
                                    </td>
                            
                                    <td>
                                        <button onClick={()=>DuplicateProduct(product)} className="btn btn-warning">
                                            <FontAwesomeIcon icon={faClone}/>
                                        </button>
                                    </td>


                                     <td>
                                        <button className="btn btn-warning" onClick={() => handleDeleteProduct(product.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </td>

                                </tr>
                            ))


                        )}
                        {(products.length==0||SearchProduct.length==0)&&
                        <tr>
                            <td colSpan="8">No data found</td>
                        </tr>

                        }
                    </tbody>
                </table>
                {!loading &&EnableShowMore && (
                    <div className="text-center">
                        <button className="btn btn-warning" onClick={handleShowMore}>Show More</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
