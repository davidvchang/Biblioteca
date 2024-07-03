import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Books/>}/>
        <Route path="/add-book" element={<AddBook/>}/>
        <Route path="/update-book/:id" element={<AddBook/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
