import { useContext } from "react";
import { OpenedPageContext } from "./../../PagesComponents/App"

export default function Header() {
    const Context = useContext(OpenedPageContext);
    const openedPage = Context?.openedPage;
    const setOpenedPage = Context?.setOpenedPage;
    const setOpenedPopup = Context?.setOpenedPopup;

    console.log("openedPage", openedPage, " setOpenedPage", setOpenedPage);

    function handleToggleBasket() {
        if (openedPage === "cart")
            setOpenedPage("home");
        else
            setOpenedPage("cart");
    }

    return (
        <header>
            <h1>🍅 Tomato</h1>
            <ul className="links">
                <li>
                    <a href="#" className={openedPage === "home" ? "active-link" : ""} onClick={() => setOpenedPage("home")}>home</a>
                    {openedPage !== "home" && <div className="line"></div>}
                </li>
                <li>
                    <a href="#" className={openedPage === "menu" ? "active-link" : ""} onClick={() => setOpenedPage("menu")}>menu</a>
                    {openedPage !== "menu" && <div className="line"></div>}
                </li>

                <li>
                    <a href="#" className={openedPage === "meal" ? "active-link" : ""} onClick={() => setOpenedPage("meal")}>add meal</a>
                    {openedPage !== "meal" && <div className="line"></div>}
                </li>
                <li>
                    <a href="#" className={openedPage === "account" ? "active-link" : ""} onClick={() => setOpenedPage("account")}>my account</a>
                    {openedPage !== "account" && <div className="line"></div>}
                </li>
                <li>
                    <a href="#" className={openedPage === "contact" ? "active-link" : ""} onClick={() => setOpenedPage("contact")}>contact us</a>
                    {openedPage !== "contact" && <div className="line"></div>}
                </li>
            </ul>
            <ul className="icons">
                <li><div className="basket-icon" role="button" onClick={handleToggleBasket}></div></li>
                <li><button onClick={() => setOpenedPopup("signup")}>Sign Up</button></li>
            </ul>
        </header >
    );
}

