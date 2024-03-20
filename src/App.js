// App.js
import './App.css';
import './Responsive.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SideBar from './Components/Nav/SideBar.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Categories from './Pages/Categories/Categories.jsx';
import AddCategory from './Pages/Categories/AddCategory.jsx';
import Products from './Pages/Products/Products.jsx';
import Test from './Pages/Configuration/Test.jsx';
import AddVariation from './Pages/Configuration/AddVariation.jsx';
import EditCategory from './Pages/Categories/EditCategory.jsx';
import Variations from './Pages/Configuration/Variations.jsx';
import EditVariation from './Pages/Configuration/EditVariations.jsx';
import AddProduct from './Pages/Products/AddProduct.jsx';
import EditProduct from './Pages/Products/EditProduct.jsx';
import Details from './Pages/Products/Details.jsx';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <div className="App"> 
        <section className='MainContainer'>
          <div className='row'>
          {isLoggedIn ? <SideBar />: <Navigate to="/login" />}
            <Routes>
              <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="*" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
              <Route path="/categories" element={isLoggedIn ? <Categories /> : <Navigate to="/login" />} />
              <Route path="/addcategory" element={isLoggedIn ? <AddCategory /> : <Navigate to="/login" />} />
              <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/login" />} />
              <Route path="/addproduct" element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />
              <Route path="/editproduct/:id" element={isLoggedIn ? <EditProduct /> : <Navigate to="/login" />} />
              <Route path="/productdetails/:id" element={isLoggedIn ? <Details /> : <Navigate to="/login" />} />
              <Route path="/test" element={isLoggedIn ? <Test /> : <Navigate to="/login" />} />
              <Route path="/variations" element={isLoggedIn ? <Variations /> : <Navigate to="/login" />} />
              <Route path="/addvariation" element={isLoggedIn ? <AddVariation /> : <Navigate to="/login" />} />
              <Route path="/editvariation/:variationId"  element={isLoggedIn ? <EditVariation /> : <Navigate to="/login" />} />

              <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/editcategory/:categoryId"  element={isLoggedIn ? <EditCategory /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
