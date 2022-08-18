import "./App.css";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserMenu from "./components/userMenu/userMenu";
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import AdminMenu from "./components/adminMenu/AdminMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminMenu></AdminMenu>} />
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
