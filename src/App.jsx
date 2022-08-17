import logo from "./logo.svg";
import "./App.css";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminMenu from "./components/adminMenu/AdminMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminMenu></AdminMenu>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
