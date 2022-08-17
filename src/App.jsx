import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css'; 
import ProductDetail from "./pages/user/productDetail/ProductDetail";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
            <Route path="/product-detail" element={<ProductDetail/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
