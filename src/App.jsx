import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";
import 'antd/dist/antd.css'; 
import ProductDetail from "./pages/user/productDetail/ProductDetail";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />}/>
            <Route path="/product-detail" element={<ProductDetail/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
