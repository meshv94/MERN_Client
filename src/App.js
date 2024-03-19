import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import Admin from "./pages/Admin";
import AdminContact from "./components/Admin/AdminContact"
import AdminUsers from "./components/Admin/AdminUsers";
import { useAuth } from './store/store'


function App() {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
          {user.isAdmin ? (
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="contacts" element={<AdminContact />} />
            </Route>
          ) : ''}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
