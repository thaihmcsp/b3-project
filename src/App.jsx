import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserMenu from "./components/userMenu/UserMenu";
import 'antd/dist/antd.css'
import UserProfile from "./components/userMenu/UserProfile";
import ChangeMenu from "./components/userMenu/ChangeMenu";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
            <Route path='/user' element={<UserMenu />}/>
            <Route path='/signin' element={<SignIn />}/>
            <Route path='/signup' element={<SignUp />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
