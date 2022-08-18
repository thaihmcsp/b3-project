import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
