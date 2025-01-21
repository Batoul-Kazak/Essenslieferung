import { useEffect, useState } from "react"
import Header from "./../../Reusable Components/Header/Header"
import HeroSection from "./HeroSection/HeroSection"
import ExploreMenu from "./ExploreMenu/ExploreMenu"
import MainMenu from "./MainMenu/MainMenu"
import AdvertisementSection from "./AdvertisementSection/AdvertisementSection"
import Footer from "./Footer/Footer"
import SignUp from "./../../Reusable Components/Header/components/SignUp"
import Login from "./../../Reusable Components/Header/components/Login"

import CardPage from "./../CardPage/CardPage"
import DishInfoCard from "./../CardPage/components/DishInfoCard"
import Curtain from "./../../Reusable Components/Curtain"
import UserAccountInfo from "./../UserAccountInfoPage/UserAccountInfoPage"
import AddMealPage from "./../AddMealPage/AddMealPage"

import MenuPage from "./../MenuPage/MenuPage"

import Loader from "./../../Reusable Components/Loader"
import ErrorMessage from "./../../Reusable Components/ErrorMessage"
// import { DISHES, SIGNED_UP_USERS } from "./constants"

export default function App() {
    const [query, setQuery] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [recipesOrder, setRecipesOrder] = useState([]);

    const [openedPopup, setOpenedPopup] = useState("none");
    const [users, setUsers] = useState([]);

    const [openAccountPage, setOpenAccountPage] = useState(false);
    const [openCardPage, setOpenCardPage] = useState(false);
    const [openAddMealPage, setOpenAddMealPage] = useState(false);
    const [openHomePage, setOpenHomePage] = useState(true);
    const [openMenuPage, setOpenMenuPage] = useState(false);

    const [specificMeals, setSpecificMeals] = useState([]);

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

    }, [openCardPage, openAccountPage, openAddMealPage]);



    return (
        <div className="app">
            {openMenuPage && <MenuPage recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                setOpenAddMealPage={setOpenAddMealPage} setOpenMenuPage={setOpenMenuPage}
                setOpenCardPage={setOpenCardPage}
            >
                <Header openCardPage={openCardPage}
                    openAccountPage={openAccountPage} handleGoToUserAccountPage={handleGoToUserAccountPage}
                    openAddMealPage={openAddMealPage} handleGoToAddMealPage={handleGoToAddMealPage}
                    openHomePage={openHomePage} handleGoToHomePage={handleGoToHomePage}
                    openMenuPage={openMenuPage} handleGoToMenuPage={handleGoToMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                </Header>
            </MenuPage>}
            {openCardPage && <CardPage setOpenCardPage={setOpenCardPage}>
                <Header setOpenCardPage={setOpenCardPage} openCardPage={openCardPage}
                    setOpenAccountPage={setOpenAccountPage} openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                    openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                    openMenuPage={openMenuPage} setOpenMenuPage={setOpenMenuPage}
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
                    openMenuPage={openMenuPage} setOpenMenuPage={setOpenMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCardPage(openCardPage => !openCardPage)}></div></li>
                </Header>
            </UserAccountInfo>
            }
            {openAddMealPage && <AddMealPage specificMeals={specificMeals} setSpecificMeals={setSpecificMeals}>
                <Header setOpenCardPage={setOpenCardPage} openCardPage={openCardPage}
                    setOpenAccountPage={setOpenAccountPage} openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} setOpenAddMealPage={setOpenAddMealPage}
                    openHomePage={openHomePage} setOpenHomePage={setOpenHomePage}
                    openMenuPage={openMenuPage} setOpenMenuPage={setOpenMenuPage}


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
                        openMenuPage={openMenuPage} setOpenMenuPage={setOpenMenuPage}
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



