import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/user/productDetail/ProductDetail";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
