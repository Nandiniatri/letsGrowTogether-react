import { useContext } from "react";
import { Button } from "../components/Button";
import { UserContext } from "../context/UserContext";
import Counter from "./counter/Counter";

const ThingsWhichIMake = () => {
    const { handleButton } = useContext(UserContext);

    return (
        <div>
            <Button children="Click Me" onClick={handleButton} />
            <Counter />
        </div>
    )
}

export default ThingsWhichIMake;