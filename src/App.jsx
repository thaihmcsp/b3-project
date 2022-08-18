import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/user/sign-in/SignIn";
import SignUp from "./pages/user/sign-up/SignUp";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>OK</>}/>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
