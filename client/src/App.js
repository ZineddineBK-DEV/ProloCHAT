import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register, Chat, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isExpired } from "react-jwt";
import { removeUserFromLocalStorage} from "./utils/localStorage";
import { useNavigate } from "react-router-dom";




const App = () => {
   
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
