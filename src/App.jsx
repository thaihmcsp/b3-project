import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./pages/admin/order/Order";
import 'antd/dist/antd.css';
import '../src/pages/admin/order/order.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
            <Route path={'/pages/admin/order'} element={<Order/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
