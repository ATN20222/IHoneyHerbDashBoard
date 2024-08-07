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
import Groups from './Pages/Groups/Groups.jsx';
import AddGroups from './Pages/Groups/AddGroup.jsx';
import EditGroup from './Pages/Groups/EditGroup.jsx';
import WellnessQuiz from './Pages/WellnessQuiz/WellnessQuiz.jsx';
import AddQuestion from './Pages/WellnessQuiz/AddQuestion.jsx';
import EditQuestion from './Pages/WellnessQuiz/EditQuestion.jsx';
import Screens from './Pages/AppScreens/Screens.jsx';
import AddScreen from './Pages/AppScreens/AddScreen.jsx';
import Coupons from './Pages/Coupons/Coupons.jsx';
import AddCoupon from './Pages/Coupons/AddCoupon.jsx';
import EditCoupon from './Pages/Coupons/EditCoupon.jsx';
import Users from './Pages/Users/Users.jsx';
import Reviews from './Pages/Reviews/Reviews.jsx';
import Notifications from './Pages/Notification/Notifications.jsx';
import AddNotification from './Pages/Notification/AddNotification.jsx';
import Orders from './Pages/Orders/Orders.jsx';
import EditOrders from './Pages/Orders/EditOrders.jsx';
import ReturnedItems from './Pages/Orders/ReturnedItems.jsx';
import WebsiteSlider from './Pages/WebsiteSlider/WebsiteSlider.jsx';
import AddSliderImage from './Pages/WebsiteSlider/AddSliderImage.jsx';
import FAQ from './Pages/FAQ/FAQ.jsx';
import AddFAQ from './Pages/FAQ/AddFAQ.jsx';

import Regions from './Pages/Regions/Regions.jsx';
import AddRegion from './Pages/Regions/AddRegion.jsx';
import EditRegion from './Pages/Regions/EditRegion.jsx';

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
              <Route path="/groups" element={isLoggedIn ? <Groups /> : <Navigate to="/login" />} /> 
              <Route path="/addgroup" element={isLoggedIn ? <AddGroups /> : <Navigate to="/login" />} />
              <Route path="/editgroup/:id" element={isLoggedIn ? <EditGroup /> : <Navigate to="/login" />} />

              <Route path="/wellnessquiz" element={isLoggedIn ? <WellnessQuiz /> : <Navigate to="/login" />} /> 
              <Route path="/addquestion" element={isLoggedIn ? <AddQuestion /> : <Navigate to="/login" />} />
              <Route path="/editquestion/:id" element={isLoggedIn ? <EditQuestion /> : <Navigate to="/login" />} />


              <Route path="/screens" element={isLoggedIn ? <Screens /> : <Navigate to="/login" />} /> 
              <Route path="/addscreen" element={isLoggedIn ? <AddScreen /> : <Navigate to="/login" />} />

              <Route path="/websiteslider" element={isLoggedIn ? <WebsiteSlider /> : <Navigate to="/login" />} /> 
              <Route path="/addslide" element={isLoggedIn ? <AddSliderImage /> : <Navigate to="/login" />} />


              <Route path="/coupons" element={isLoggedIn ? <Coupons /> : <Navigate to="/login" />} /> 
              <Route path="/addcoupon" element={isLoggedIn ? <AddCoupon /> : <Navigate to="/login" />} /> 
              <Route path="/editcoupon/:id" element={isLoggedIn ? <EditCoupon /> : <Navigate to="/login" />} /> 

              <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} /> 

              <Route path="/reviews" element={isLoggedIn ? <Reviews /> : <Navigate to="/login" />} /> 

              <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} /> 
              <Route path="/addnotification" element={isLoggedIn ? <AddNotification /> : <Navigate to="/login" />} /> 


              <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/login" />} /> 
              <Route path="/editorder/:id" element={isLoggedIn ? <EditOrders /> : <Navigate to="/login" />} /> 
              <Route path="/returnrequests" element={isLoggedIn ? <ReturnedItems /> : <Navigate to="/login" />} /> 





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



              <Route path="/faq" element={isLoggedIn ? <FAQ /> : <Navigate to="/login" />} /> 
              <Route path="/addfaq" element={isLoggedIn ? <AddFAQ /> : <Navigate to="/login" />} /> 

              <Route path="/regions" element={isLoggedIn ? <Regions /> : <Navigate to="/login" />} /> 
              <Route path="/addregion" element={isLoggedIn ? <AddRegion /> : <Navigate to="/login" />} /> 
              <Route path="/editregion/:id"  element={isLoggedIn ? <EditRegion /> : <Navigate to="/login" />} />


            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
