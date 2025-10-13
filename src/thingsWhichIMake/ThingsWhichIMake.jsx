import { useContext } from "react";
import { Button } from "../components/Button";
import { UserContext } from "../context/UserContext";

const ThingsWhichIMake = () => {
    const { handleButton } = useContext(UserContext);

    return (
        <div>
            <Button children="Click Me" onClick={handleButton} />
        </div>
    )
}

export default ThingsWhichIMake;