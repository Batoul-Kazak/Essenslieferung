

export default function Header({
    children,
    setOpenCardPage,
    openAccountPage,
    setOpenAccountPage,
    openCardPage,
    openAddMealPage,
    setOpenAddMealPage,
    openHomePage,
    setOpenHomePage,
    openMenuPage,
    setOpenMenuPage
}) {

    function handleGoToHomePage() {
        setOpenHomePage(true);
        setOpenCardPage(false);
        setOpenAccountPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(false);
    }

    function handleGoToUserAccountPage() {
        setOpenHomePage(false);
        setOpenAccountPage(true);
        setOpenCardPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(false);
    }

    function handleGoToAddMealPage() {
        setOpenHomePage(false);
        setOpenCardPage(false);
        setOpenAccountPage(false);
        setOpenAddMealPage(true);
        setOpenMenuPage(false);
    }

    function handleGoToMenuPage() {
        setOpenHomePage(false);
        setOpenAccountPage(false);
        setOpenCardPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(true);
    }

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

