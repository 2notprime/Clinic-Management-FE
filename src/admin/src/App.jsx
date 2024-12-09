import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContextProvider from './context/AppContext'; // Đảm bảo đường dẫn chính xác
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddDoctor from './pages/AddDoctor';
import Dashboard from './pages/Dashboard';
import DoctorsList from './pages/DoctorsList';
import Login from './pages/Login';

const App = () => {
  return (
    <AppContextProvider>  {/* Bọc tất cả trong AppContextProvider để context có thể được sử dụng trong các trang con */}
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
