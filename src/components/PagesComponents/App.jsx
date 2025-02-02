import { useEffect, useState } from "react"
import Header from "./../Reusable Components/Header/Header"
import CartPage from "./CartPage/CartPage"
import DishInfoCart from "./CartPage/components/DishInfoCart"
import UserAccountInfo from "./UserAccountInfoPage/UserAccountInfoPage"
import AddMealPage from "./AddMealPage/AddMealPage"
import MenuPage from "./MenuPage/MenuPage"
import HomePage from "./HomePage/HomePage"
import { useFetchingMeals } from "../../functions/useFetchingMeals"

export default function App() {
    const [query, setQuery] = useState("");
    const [recipesOrder, setRecipesOrder] = useState([]);

    const [users, setUsers] = useState([]);

    const [openedPopup, setOpenedPopup] = useState("none");
    const [openedPage, setOpenedPage] = useState("home");

    const [specificMeals, setSpecificMeals] = useState([]);

    const { recipe, isLoading, error } = useFetchingMeals(true, query);

    useEffect(function () {
        switch (openedPage) {
            case "cart": document.title = `Tomato | Bill`; break;
            case "account": document.title = `Tomato | Account`; break;
            case "meal": document.title = `Tomato | Create Meal`; break;
            case "menu": document.title = `Tomato | Menu`; break;
            case "contact": document.title = `Tomato | Contact`; break;
        }

        return function () {
            document.title = `Tomato`;
        };

    }, [openedPage]);

    return (
        <div className="app">
            {openedPage === "menu" && <MenuPage recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                setOpenedPage={setOpenedPage}
            >
                <Header setOpenedPage={setOpenedPage} openedPage={openedPage}>
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
            </MenuPage>}

            {openedPage === "cart" && <CartPage>
                <Header openedPage={openedPage} setOpenedPage={setOpenedPage}>
                    <li><div className="basket-icon" role="button" onClick={() => setOpenCartPage(openCartPage => !openCartPage)}></div></li>
                </Header>
                <DishInfoCart recipesOrder={recipesOrder}
                    setRecipesOrder={setRecipesOrder}
                />
            </CartPage>}

            {openedPage === "account" && <UserAccountInfo>
                <Header openedPage={openedPage} setOpenedPage={setOpenedPage}>
                    <li><div className="basket-icon" role="button" onClick={() =>
                        setOpenedPage(openedPage => openedPage === "account" ? "cart" : "account")}></div></li>
                </Header>
            </UserAccountInfo>
            }

            {openedPage === "meal" && <AddMealPage specificMeals={specificMeals} setSpecificMeals={setSpecificMeals}>
                <Header openedPage={openedPage} setOpenedPage={setOpenedPage}>
                    <li><div className="basket-icon" role="button" onClick={() =>
                        setOpenedPage(openedPage => openedPage === "meal" ? "cart" : "meal")
                    }></div></li>
                </Header>
            </AddMealPage>}

            {openedPage === "home" &&
                <HomePage openedPopup={openedPopup} setOpenedPopup={setOpenedPopup} query={query} setQuery={setQuery} isLoading={isLoading}
                    error={error} recipe={recipe} recipesOrder={recipesOrder}
                    setRecipesOrder={setRecipesOrder} setOpenedPage={setOpenedPage}
                >
                    <Header openedPage={openedPage} setOpenedPage={setOpenedPage}>
                        <li><div className="basket-icon" role="button" onClick={() =>
                            setOpenedPage(openedPage => openedPage === "home" ? "cart" : "home")
                        }></div></li>
                        <li><button onClick={() => setOpenedPopup("signup")}>Sign in</button></li>
                    </Header>
                </HomePage>
            }
        </div>
    )
}