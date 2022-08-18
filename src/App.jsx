import "./App.css";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";
import AdminMenu from "./components/adminMenu/AdminMenu";
import UserMenu from "./components/userMenu/UserMenu";
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserMenu />}>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/changePassword" element={<ChangeMenu />} />
        </Route>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
