import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import 'antd/dist/antd.css'; 

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Footer/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
