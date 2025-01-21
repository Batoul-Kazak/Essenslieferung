import { useEffect, useState } from "react"
import Header from "./../../Reusable Components/Header/Header"
import CartPage from "./../CartPage/CartPage"
import DishInfoCart from "./../CartPage/components/DishInfoCart"
import UserAccountInfo from "./../UserAccountInfoPage/UserAccountInfoPage"
import AddMealPage from "./../AddMealPage/AddMealPage"
import MenuPage from "./../MenuPage/MenuPage"
import HomePage from "./HomePage"

export default function App() {
    const [query, setQuery] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [recipesOrder, setRecipesOrder] = useState([]);

    const [openedPopup, setOpenedPopup] = useState("none");
    const [users, setUsers] = useState([]);

    const [openAccountPage, setOpenAccountPage] = useState(false);
    const [openCartPage, setOpenCartPage] = useState(false);
    const [openAddMealPage, setOpenAddMealPage] = useState(false);
    const [openHomePage, setOpenHomePage] = useState(true);
    const [openMenuPage, setOpenMenuPage] = useState(false);

    const [specificMeals, setSpecificMeals] = useState([]);

    function handleGoToHomePage() {
        setOpenHomePage(true);
        setOpenCartPage(false);
        setOpenAccountPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(false);
    }

    function handleGoToUserAccountPage() {
        setOpenHomePage(false);
        setOpenAccountPage(true);
        setOpenCartPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(false);
    }

    function handleGoToAddMealPage() {
        setOpenHomePage(false);
        setOpenCartPage(false);
        setOpenAccountPage(false);
        setOpenAddMealPage(true);
        setOpenMenuPage(false);
    }

    function handleGoToMenuPage() {
        setOpenHomePage(false);
        setOpenAccountPage(false);
        setOpenCartPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(true);
    }

    function handleGoToCartPage() {
        setOpenCartPage(true);
        setOpenHomePage(false);
        setOpenAccountPage(false);
        setOpenAddMealPage(false);
        setOpenMenuPage(false);
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
        if (openCartPage)
            document.title = `Tomato | Bill`;
        if (openAccountPage)
            document.title = `Tomato | Account`;
        if (openAddMealPage)
            document.title = `Tomato | Create Meal`;

        return function () {
            document.title = `Tomato`;
        };

    }, [openCartPage, openAccountPage, openAddMealPage]);

    return (
        <div className="app">
            {openMenuPage && <MenuPage recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                setOpenAddMealPage={setOpenAddMealPage} setOpenMenuPage={setOpenMenuPage}
                handleGoToCartPage={handleGoToCartPage}
                handleGoToAddMealPage={handleGoToAddMealPage}
            >
                <Header openCartPage={openCartPage}
                    openAccountPage={openAccountPage} openAddMealPage={openAddMealPage}
                    openHomePage={openHomePage} openMenuPage={openMenuPage}
                    handleGoToUserAccountPage={handleGoToUserAccountPage} handleGoToHomePage={handleGoToHomePage}
                    handleGoToAddMealPage={handleGoToAddMealPage} handleGoToMenuPage={handleGoToMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
            </MenuPage>}
            {openCartPage && <CartPage setOpenCartPage={setOpenCartPage}>
                <Header setOpenCartPage={setOpenCartPage} openCartPage={openCartPage}
                    openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} openHomePage={openHomePage} openMenuPage={openMenuPage}
                    handleGoToUserAccountPage={handleGoToUserAccountPage} handleGoToHomePage={handleGoToHomePage}
                    handleGoToAddMealPage={handleGoToAddMealPage} handleGoToMenuPage={handleGoToMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
                <DishInfoCart recipesOrder={recipesOrder}
                    setRecipesOrder={setRecipesOrder}
                />
            </CartPage>} {openAccountPage && <UserAccountInfo>
                <Header setOpenCartPage={setOpenCartPage} openCartPage={openCartPage}
                    openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} openHomePage={openHomePage} openMenuPage={openMenuPage}
                    handleGoToUserAccountPage={handleGoToUserAccountPage} handleGoToHomePage={handleGoToHomePage}
                    handleGoToAddMealPage={handleGoToAddMealPage} handleGoToMenuPage={handleGoToMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
            </UserAccountInfo>
            }
            {openAddMealPage && <AddMealPage specificMeals={specificMeals} setSpecificMeals={setSpecificMeals}>
                <Header setOpenCartPage={setOpenCartPage} openCartPage={openCartPage}
                    openAccountPage={openAccountPage}
                    openAddMealPage={openAddMealPage} openHomePage={openHomePage} openMenuPage={openMenuPage}
                    handleGoToUserAccountPage={handleGoToUserAccountPage} handleGoToHomePage={handleGoToHomePage}
                    handleGoToAddMealPage={handleGoToAddMealPage} handleGoToMenuPage={handleGoToMenuPage}
                >
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
            </AddMealPage>}
            {
                openHomePage &&
                <HomePage openedPopup={openedPopup} query={query} setQuery={setQuery} isLoading={isLoading}
                    error={error} recipe={recipe} setOpenCartPage={setOpenCartPage} recipesOrder={recipesOrder}
                    setRecipesOrder={setRecipesOrder} handleGoToCartPage={handleGoToCartPage}
                >
                    <Header setOpenCartPage={setOpenCartPage} setOpenAccountPage={setOpenAccountPage}
                        openCartPage={openCartPage} openAccountPage={openAccountPage}
                        openAddMealPage={openAddMealPage}
                        openHomePage={openHomePage} openMenuPage={openMenuPage}
                        handleGoToUserAccountPage={handleGoToUserAccountPage} handleGoToHomePage={handleGoToHomePage}
                        handleGoToAddMealPage={handleGoToAddMealPage} handleGoToMenuPage={handleGoToMenuPage}
                    >
                        <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                        <li><button onClick={() => setOpenedPopup("signup")}>Sign in</button></li>
                    </Header>
                </HomePage>
            }
        </div>
    )
}