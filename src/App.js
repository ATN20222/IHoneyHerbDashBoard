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
