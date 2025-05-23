import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import Home from "./pages/Home"
import ProtectedRoute from "./pages/authontication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


