import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path="/add-book" element={<AddBook/>}/>
            <Route path="/update-book/:id" element={<AddBook/>}/>

          </Route>
        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
