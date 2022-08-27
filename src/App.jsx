import "./App.css";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css'; 
import Order from "./pages/admin/order/Order";
import './components/header/Hearder.css'
import '../src/pages/admin/order/order.css'
import UserMenu from "./components/userMenu/UserMenu";
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";
import ProductDetail from "./pages/user/productDetail/ProductDetail";
import UserPage from "./components/userPage/UserPage";
import AdminPage from "./components/adminPage/AdminPage";
import Cart from "./pages/user/cart/Cart";
import CreateOrder from "./pages/user/createOrder/CreateOrder";
import Home from "./pages/user/home/Home";
import OrderDetail from "./pages/user/orderDetail/OrderDetail";
import UserOrderHistory from "./pages/user/userOrderHistory/UserOrderHistory";
import Category from "./pages/admin/category/Category";
import AddProduct from "./pages/admin/product/addProduct/AddProduct";
import AdminListProduct from "./pages/admin/product/adminListProduct/AdminListProduct";
import AddProductDetail from "./pages/admin/product/addProductDetail/AddProductDetail";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import AdminListProductDetail from "./pages/admin/product/listProductDetail/AdminListProductDetail";
import InventoryManagement from "./pages/admin/product/inventoryManagement/InventoryManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserPage/>}>
            <Route path='/' element={<Home/>}/>
            <Route path="/product-detail" element={<ProductDetail/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/create-order' element={<CreateOrder/>}/>
            <Route path="/user" element={<UserMenu />}>
                <Route path="/user" element={<UserProfile />} />
                <Route path="/user/changePassword" element={<ChangeMenu />} />
                <Route path="/user/order/:orderId" element={<OrderDetail/>}/>
                <Route path='/user/order' element={<UserOrderHistory/>}/>
            </Route>
        </Route>

        <Route path='/admin' element={<AdminPage/>}>
            <Route path={'/admin/order'} element={<Order/>}/>
            <Route path="/admin/category" element={<Category/>}/>
            <Route path="/admin/product/create" element={<AddProduct/>}/>
            <Route path="/admin/product" element={<AdminListProduct/>}/>
            <Route path="/admin/product/detail" element={<AdminListProductDetail/>}/>
            <Route path="/admin/product/inventory-management" element={<InventoryManagement/>}/>
            <Route path="/admin/product/detail/create" element={<AddProductDetail/>}/>
            <Route path='/admin/profile' element={<AdminProfile/>}/>
        </Route>
        
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
