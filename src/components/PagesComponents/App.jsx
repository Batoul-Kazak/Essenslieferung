import { createContext, useEffect, useReducer, useState } from "react"
import Header from "./../Reusable Components/Header/Header"
import CartPage from "./CartPage/CartPage"
import DishInfoCart from "./CartPage/components/DishInfoCart"
import UserAccountInfo from "./UserAccountInfoPage/UserAccountInfoPage"
import AddMealPage from "./AddMealPage/AddMealPage"
import MenuPage from "./MenuPage/MenuPage"
import HomePage from "./HomePage/HomePage"
import { useFetchingMeals } from "../../functions/useFetchingMeals"

const initialState = {
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: null,
    recipesOrder: [],
    specificMeals: []
};

// const newUser = {
//     id: users.length + 1, name: name, email: email,
//     password: password, isActive: true, currentRequestedRecipesIds: [],
//     recipesRating: [{ recipeId: -1, recipeRated: 0 }], previousRequestedRecipesIds: []
// };

function reducer(state, action) {
    switch (action.type) {
        case "register":
            const newUser = {
                id: Date.now(), // Generate a unique ID (you might use a UUID library in a real app)
                name: action.payload.name,
                password: action.payload.password,
                email: action.payload.email,
            };

            const isExist = state.users.find((user) => user.email === action.payload.email);

            if (!isExist) {
                localStorage.setItem('users', JSON.stringify([...state.users, newUser])); // Update localStorage
                return { ...state, users: [...state.users, newUser] };
            } else {
                return { ...state, registrationError: "this email already in use, try another one" };
            }

        case 'login':
            const { email, password } = action.payload;
            const user = state.users.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                return { ...state, currentUser: user };
            } else {
                return { ...state, loginError: "Invalid email or password" }; // Or handle error as you want
            }
        // case 'LOGOUT':
        //     return { ...state, currentUser: null };
        // default:
        //     return state;
    }
}

export default function App() {
    const [query, setQuery] = useState("");
    const { recipe, isLoading, error } = useFetchingMeals(true, query);
    const [openedPopup, setOpenedPopup] = useState("none");
    const [openedPage, setOpenedPage] = useState("home");
    const [{ users, currentUser, recipesOrder }, dispatch] = useReducer(reducer, initialState);

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

    const OpenedPageContext = createContext();

    return (
        <OpenedPageContext.Provider>
            <div className="app">
                {openedPage === "menu" && <MenuPage recipesOrder={recipesOrder}
                    setOpenedPage={setOpenedPage}
                >
                    <Header>
                        <li><div className="basket-icon" role="button" onClick={() => setOpenedPage(openedPage => openedPage == "cart" ? "home" : "cart")}></div></li>
                    </Header>
                </MenuPage>}

                {openedPage === "cart" && <CartPage>
                    <Header>
                        <li><div className="basket-icon" role="button" onClick={() => setOpenedPage(openedPage => openedPage == "cart" ? "home" : "cart")}></div></li>
                    </Header>
                    <DishInfoCart recipesOrder={recipesOrder}
                    />
                </CartPage>}

                {openedPage === "account" && <UserAccountInfo>
                    <Header>
                        <li><div className="basket-icon" role="button" onClick={() =>
                            setOpenedPage(openedPage => openedPage === "account" ? "cart" : "account")}></div></li>
                    </Header>
                </UserAccountInfo>
                }

                {openedPage === "meal" && <AddMealPage specificMeals={specificMeals} setSpecificMeals={setSpecificMeals}>
                    <Header>
                        <li><div className="basket-icon" role="button" onClick={() =>
                            setOpenedPage(openedPage => openedPage === "meal" ? "cart" : "meal")
                        }></div></li>
                    </Header>
                </AddMealPage>}

                {openedPage === "home" &&
                    <HomePage openedPopup={openedPopup} setOpenedPopup={setOpenedPopup} query={query} setQuery={setQuery} isLoading={isLoading}
                        error={error} recipe={recipe} recipesOrder={recipesOrder}
                        setOpenedPage={setOpenedPage}
                        users={users} dispatch={dispatch} currentUser={currentUser}
                    >
                        <Header>
                            <li><div className="basket-icon" role="button" onClick={() =>
                                setOpenedPage(openedPage => openedPage === "home" ? "cart" : "home")
                            }></div></li>
                            <li><button onClick={() => setOpenedPopup("signup")}>Sign in</button></li>
                        </Header>
                    </HomePage>
                }
            </div>
        </OpenedPageContext.Provider>
    )
}