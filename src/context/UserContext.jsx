import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../axiosClient'; // Đảm bảo bạn đã cấu hình axiosClient đúng

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Lưu trữ userId
  const [user, setUser] = useState(null);    // Lưu thông tin user
  const [doctors, setDoctors] = useState([]); // Lưu danh sách bác sĩ

  // Hàm fetch dữ liệu người dùng từ backend
  const fetchUser = async (id) => {
    try {
      const response = await axiosClient.post('/user-profile', { id });
      setUser(response.data); // Lưu thông tin user vào state
      console.log('User fetched:', response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Xóa user nếu có lỗi
    }
  };

  // Hàm fetch danh sách bác sĩ
  const fetchDoctorsInvolve = async (id) => {
    try {
      const response = await axiosClient.get(`/get-my-appointment/${ id }`);
      setDoctors(response.data); // Lưu thông tin bác sĩ vào state
      console.log('Doctors fetched:', response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]); // Đặt mảng bác sĩ rỗng nếu có lỗi
    }
  };

  // Theo dõi sự thay đổi của userId
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchDoctorsInvolve(userId);
    } else {
      setUser(null); // Xóa thông tin user khi userId là null
      setDoctors([]); // Đặt danh sách bác sĩ rỗng
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, user, doctors }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
