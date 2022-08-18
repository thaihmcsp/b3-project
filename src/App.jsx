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
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import ProductDetail from "./pages/user/productDetail/ProductDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
            <Route path={'/pages/admin/order'} element={<Order/>}/>
      </Routes>
      <Route path="/" element={<Footer/>}/>
    </BrowserRouter>
  );
}

export default App;
