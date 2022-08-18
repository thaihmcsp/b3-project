import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Order from "./pages/admin/order/Order";
import UserMenu from "./components/userMenu/UserMenu";
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";
import '../src/pages/admin/order/order.css'
import 'antd/dist/antd.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/pages/admin/order'} element={<Order/>}/>
        <Route path={'/pages/admin/order'} element={<Order/>}/>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
