import { useState } from "react"
import Curtain from "./Curtain"

export default function Warning({ message, onAnswer }) {
    [isAgree, setIsAgree] = useState(true);

    function handleYes() {
        setIsAgree(true);
        onAnswer(true);
    }

    function handleNo() {
        setIsAgree(false);
        onAnswer(false);
    }

    return (
        <section className="warning-section">
            <Curtain />
            <main className="warning">
                <p>{message}</p>
                <div className="buttons-container">
                    <button onClick={handleYes}>yes</button>
                    <button onClick={handleNo}>no</button>
                </div>
            </main>
        </section>
    )
}