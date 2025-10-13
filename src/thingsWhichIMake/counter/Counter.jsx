import { useState } from "react"
import { Button } from "../../components/Button"

const Counter = () => {

    return (
        <div>
            <Button children="prev btn" onClick={handlePrev} />
            <h2>{count}</h2>
            <Button children="next btn" onClick={handleNext} />
        </div>
    )
}

export default Counter;