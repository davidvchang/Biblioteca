import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Books from "./pages/Books";

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      
      <Routes>
        <Route path="/books" element={<Books/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
