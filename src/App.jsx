import "./App.css";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import 'antd/dist/antd.css'; 
import Order from "./pages/admin/order/Order";
import 'antd/dist/antd.css';
import '../src/pages/admin/order/order.css'
import AdminMenu from "./components/adminMenu/AdminMenu";
import UserMenu from "./components/userMenu/UserMenu";
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";
import '../src/pages/admin/order/order.css'
import 'antd/dist/antd.css'; 
import ProductDetail from "./pages/user/productDetail/ProductDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/pages/admin/order'} element={<Order/>}/>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<Footer/>}/>
        <Route path="/admin" element={<AdminMenu></AdminMenu>} />
        <Route path="/product-detail" element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
