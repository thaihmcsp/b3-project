import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/admin/order/Order";
import 'antd/dist/antd.css';
import '../src/pages/admin/order/order.css'
import UserMenu from "./components/userMenu/UserMenu";
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/pages/admin/order'} element={<Order/>}/>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
