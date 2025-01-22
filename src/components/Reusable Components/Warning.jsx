import { useState } from "react"
import Curtain from "./Curtain"

export default function Warning({
    message,
    handleWarningAnswerIfNo,
    handleWarningAnswerIfYes,
    defaultSelectedOption
}) {
    return (
        <section className="warning-section">
            <main className="warning">
                <p>{message}</p>
                <div className="buttons-container">
                    <button onClick={handleWarningAnswerIfYes} className={defaultSelectedOption ? "selected" : ""}>yes</button>
                    <button onClick={handleWarningAnswerIfNo} className={defaultSelectedOption ? "" : "selected"}>no</button>
                </div>
            </main>
        </section>
    )
}