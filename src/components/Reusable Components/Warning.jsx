import { useState } from "react"
import Curtain from "./Curtain"

export default function Warning({ message, handleWarningAnswerIfNo, handleWarningAnswerIfYes }) {

    return (
        <section className="warning-section">
            <main className="warning">
                <p>{message}</p>
                <div className="buttons-container">
                    <button onClick={handleWarningAnswerIfYes}>yes</button>
                    <button onClick={handleWarningAnswerIfNo}>no</button>
                </div>
            </main>
        </section>
    )
}