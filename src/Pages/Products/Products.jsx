import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import ProductImage from '../../Assets/Images/ProductImage.png';
import { listProducts } from "../../Services/Api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setstart] = useState(0);
    const [limit, setlimit] = useState(50);
    const [TotalProducts, seTotalProducts] = useState(0);
     
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth_key = localStorage.getItem('token');
                const user_id = localStorage.getItem('user_id');
                
                const response = await listProducts(auth_key, user_id, limit, start);
                if (response && response.status && response.products_list) {
                    
                        setProducts(response.products_list);
                   
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleShowMore = async () => {
        // setPage(prevPage => prevPage + 1);
        try {
            const auth_key = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            const newLimit = limit+50;
            const newStart = start+50;
            console.log(newLimit);
            console.log(newStart);
            
            setlimit(newLimit);
            setstart(newStart);
            
            const response = await listProducts(auth_key, user_id, newLimit, newStart);
            if (response && response.status && response.products_list) {
                    seTotalProducts(response.products_list[0].total_products);
                    setProducts(response.products_list);
                    if(newLimit>TotalProducts){
                        setIsLastPage(true);
                        return;
                    }
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className="col-lg-10 col-md-9 col-sm-9 MainCol HomeCol CategoriesCol">
            <div className="CategoriesHeader">
                <h3>All Products</h3>
                <Link className="btn btn-warning" to="/addproduct">
                    <FontAwesomeIcon icon={faPlus}/> Add New
                </Link>
            </div>

            <div className="table-responsive TableContainer">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>En Name</th>
                            <th>Ar Name</th>
                            <th>Category</th>
                            <th>List Price</th>
                            <th>Sale Price</th>
                            <th>Edit</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8">Loading...</td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={product.thumb_image} width="40px" alt="" />
                                    </td>
                                    <td>{product.name_en}</td>
                                    <td>{product.name_ar}</td>
                                    <td>{product.category_id}</td>
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
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {!loading && !isLastPage && (
                    <div className="text-center">
                        <button className="btn btn-warning" onClick={handleShowMore}>Show More</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
