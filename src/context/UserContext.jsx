import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const handleButton = () => {
        alert('Hello');
    }

    return (
        <UserContext.Provider value={
            handleButton
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;