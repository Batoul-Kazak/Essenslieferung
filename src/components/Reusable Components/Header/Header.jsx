

export default function Header({
    children,
    openAccountPage,
    openCardPage,
    openAddMealPage,
    openHomePage,
    openMenuPage,
    handleGoToHomePage,
    handleGoToAddMealPage,
    handleGoToMenuPage,
    handleGoToUserAccountPage
}) {

    return (
        <header>
            <h1>🍅 Tomato</h1>
            <ul className="links">
                <li>
                    <a href="#" className={openHomePage ? "active-link" : ""} onClick={handleGoToHomePage}>home</a>
                    {!openCardPage && <div className="line"></div>}
                </li>
                <li>
                    <a href="#" className={openMenuPage ? "active-link" : ""} onClick={handleGoToMenuPage}>menu</a>
                    {!openMenuPage && <div className="line"></div>}
                </li>

                <li>
                    <a href="#" className={openAddMealPage ? "active-link" : ""} onClick={handleGoToAddMealPage}>add meal</a>
                    <div className="line"></div>
                </li>
                <li>
                    <a href="#" className={openAccountPage ? "active-link" : ""} onClick={handleGoToUserAccountPage}>my account</a>
                    {!openAccountPage && <div className="line"></div>}
                </li>
                <li>
                    <a href="#">contact us</a>
                    <div className="line"></div>
                </li>
            </ul>
            <ul className="icons">
                {children}
            </ul>
        </header >
    );
}

