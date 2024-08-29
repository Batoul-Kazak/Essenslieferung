export default function Header() {
    return (
        <header>
            <h1>Tomato</h1>
            <ul className="pages flex-row gap">
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
            <ul className="flex-row gap">
                <li>
                    <div className="search-icon">search</div>
                </li>
                <li><a href="">Card-page</a>
                </li>
                <li><a href="">my account</a></li>
            </ul>
        </header>
    )
}

