import { createContext } from "react";
import { doctors } from "../assets/assets"; // Kiểm tra đường dẫn này

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = { doctors }; // Sửa lại phần này để không dùng dấu ngoặc đơn
    console.log(doctors)

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
