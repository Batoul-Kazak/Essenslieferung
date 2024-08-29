import { useState } from "react"

export default function Header({ onSetOpenedSignUp }) {
    return (
        <header>
            <h1>Tomato</h1>
            <ul className="links">
                <li>
                    <a href="">home</a>
                    <div className="line"></div>
                </li>
                <li>
                    <a href="">menu</a>
                    <div className="line"></div>
                </li>
                <li>
                    <a href="">mobile app</a>
                    <div className="line"></div>
                </li>
                <li>
                    <a href="">contact us</a>
                    <div className="line"></div>
                </li>
            </ul>
            <ul className="icons">
                <li>
                    <div className="search-icon"></div>
                </li>
                <li><div className="basket-icon"><a href=""></a></div></li>
                <li><button onClick={() => onSetOpenedSignUp(true)}>Sign in</button></li>
            </ul>
        </header>
    )
}

