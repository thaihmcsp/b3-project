import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserMenu from "./components/userMenu/userMenu";
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import Order from "./pages/admin/order/Order";
import 'antd/dist/antd.css';
import '../src/pages/admin/order/order.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
        <Route path='/pages/admin/order' element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
