import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Login from './pages/Login';
import NavBar from "./components/NavBar";
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Footer from "./components/Footer";
import { UserProvider, useUser } from './context/UserContext';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, setUserId } = useUser(); 

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && !userId) {
      setUserId(id); 
    }
  }, [location, userId, setUserId]);

  useEffect(() => {

    if (userId) {
      const currentPath = location.pathname;
      if (!location.search.includes('id=')) {
        navigate(`${currentPath}?id=${userId}`);
      }
    }
  }, [userId, location, navigate]);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointments/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
      <Footer />
    </div>
  );
};


const AppWithUserContext = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWithUserContext;