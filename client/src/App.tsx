import "./App.css";
import Invoice from "./components/Invoice.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Invoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
