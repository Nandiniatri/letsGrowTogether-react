import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const handlePrev = () => {
        setCount(count - 1);
    }
    const handleNext = () => {
        setCount(count + 1);
    }

    const handleButton = () => {
        alert('Hello');
    }

    return (
        <UserContext.Provider value={
            { handleButton, count, handlePrev, handleNext }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;