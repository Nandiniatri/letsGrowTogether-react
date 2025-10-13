import { useState } from "react"
import { Button } from "../../components/Button"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Counter = () => {
    const { count, handlePrev, handleNext } = useContext(UserContext);

    return (
        <div>
            <Button children="prev btn" onClick={handlePrev} />
            <h2>{count}</h2>
            <Button children="next btn" onClick={handleNext} />
        </div>
    )
}

export default Counter;