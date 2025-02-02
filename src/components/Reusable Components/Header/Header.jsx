export default function Header({
    children,
    openedPage,
    setOpenedPage
}) {

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
                {children}
            </ul>
        </header >
    );
}

