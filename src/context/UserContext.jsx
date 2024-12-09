import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../axiosClient'; // Đảm bảo bạn đã cấu hình axiosClient đúng

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Lưu trữ userId
  const [user, setUser] = useState(null);    // Lưu thông tin user

  // Hàm fetch dữ liệu người dùng từ backend
  const fetchUser = async (id) => {
    try {
        const formData = new FormData();
        formData.append('id', id); // Thêm ID vào FormData

        const response = await axiosClient.post('/user-profile', formData); // Sử dụng POST thay vì GET
        setUser(response.data); // Lưu thông tin user vào state
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Đặt user về null nếu có lỗi
    }
};



  // Theo dõi sự thay đổi của userId để tự động fetch dữ liệu
  useEffect(() => {
    if (userId) {
      fetchUser(userId); // Gọi hàm fetchUser khi userId khác null
    } else {
      setUser(null); // Xóa thông tin user khi userId là null
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
