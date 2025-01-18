import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import MainMenu from "./components/MainMenu/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection/AdvertisementSection"
import Footer from "./components/Footer/Footer"
import SignUp from "./components/Header/components/SignUp"
import Login from "./components/Header/components/Login"

import { useEffect, useState } from "react"
import CardPage from "./components/CardPage.jsx/CardPage"
import DishInfoCard from "./components/CardPage.jsx/components/DishInfoCard"
//import Warning from "./components/Header/components/Warning"
import Curtain from "./Curtain"
import UserAccountInfo from "./components/UserAccountInfo/UserAccountInfo"
import AddMealPage from "./components/AddMealPage/AddMealPage"

// import { DISHES, SIGNED_UP_USERS } from "./constants"

export default function App() {
    const [query, setQuery] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [recipesOrder, setRecipesOrder] = useState([]);
    // const [showMenu, setShowMenu] = useState(false);

    const [openedPopup, setOpenedPopup] = useState("none");
    const [users, setUsers] = useState([]);

    const [openAccountPage, setOpenAccountPage] = useState(false);
    const [openCardPage, setOpenCardPage] = useState(false);
    const [openAddMealPage, setOpenAddMealPage] = useState(false);
    const [openHomePage, setOpenHomePage] = useState(true);

    useEffect(function () {
        const controller = new AbortController();
        async function fetchRecipes() {
            try {
                setError("");
                setIsLoading(true);
                const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`
                    , { signal: controller.signal }
                );

                if (!res.ok) throw new Error("Couldn't fetch recipe");

                const data = await res.json();

                if (data.total === 0)
                    throw new Error("There is no items matches your search");

                setRecipe(data.recipes);
                setError("");
                console.log(data.recipes)
            } catch (err) {
                console.log(err.message);
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }

            if (query.length < 2) {
                setError("");
                setRecipe([]);
                return;
            }
        }
        fetchRecipes();

        return function () {
            controller.abort();
        }

    }, [query]);

    useEffect(function () {
        if (openCardPage)
            document.title = `Tomato | Bill`;
        if (openAccountPage)
            document.title = `Tomato | Account`;
        if (openAddMealPage)
            document.title = `Tomato | Create Meal`;

        return function () {
            document.title = `Tomato`;
        };

    }, [openCardPage]);

    return (
        <div className="app">
            {openCardPage && <CardPage setOpenCardPage={setOpenCardPage}>
                <Header setOpenCardPage={setOpenCardPage} openCardPage={openCardPage}
                    setOpenAccountPage={setOpenAccountPage} openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                    openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                </Header>
                <DishInfoCard recipesOrder={recipesOrder}
                    setRecipesOrder={setRecipesOrder}
                />
            </CardPage>} {openAccountPage && <UserAccountInfo>
                <Header setOpenCardPage={setOpenCardPage} openCardPage={openCardPage}
                    setOpenAccountPage={setOpenAccountPage} openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                    openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                </Header>
            </UserAccountInfo>
            }
            {openAddMealPage && <AddMealPage>
                <Header setOpenCardPage={setOpenCardPage} openCardPage={openCardPage}
                    setOpenAccountPage={setOpenAccountPage} openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                    openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                </Header>
            </AddMealPage>}
            {
                openHomePage &&
                <>
                    <Header setOpenCardPage={setOpenCardPage} setOpenAccountPage={setOpenAccountPage}
                        openCardPage={openCardPage} openAccountPage={openAccountPage}
                        openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                        openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                    >
                        <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                        <li><button onClick={() => setOpenedPopup("signup")}>Sign in</button></li>
                    </Header>
                    {openedPopup === "signup" ?
                        <>
                            <SignUp users={users} setUsers={setUsers} setOpenedPopup={setOpenedPopup} />
                            <Curtain />
                        </>
                        : openedPopup === "login" ?
                            <>
                                <Login setOpenedPopup={setOpenedPopup} />
                                <Curtain />
                            </>
                            : ""}
                    <HeroSection />
                    <ExploreMenu query={query} setQuery={setQuery} />
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MainMenu recipe={recipe}
                        setQuery={setQuery} setOpenCardPage={setOpenCardPage}
                        recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                    />}
                    {error && <ErrorMessage message={error} />}
                    <AdvertisementSection />
                    <Footer />
                </>}
        </div>
    )
}

function Loader() {
    return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
    return <div className="error">
        🛑 <p>{message}</p>
    </div>
}