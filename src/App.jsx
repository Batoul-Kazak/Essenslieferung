import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import MainMenu from "./components/MainMenu/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection/AdvertisementSection"
import Footer from "./components/Footer/Footer"
import SignUp from "./components/Header/components/SignUp"
import Login from "./components/Header/components/Login"

import { useState } from "react"
import Warning from "./components/Header/components/Warning"
import Curtain from "./Curtain"
import CardPage from "./components/CardPage.jsx/CardPage"

import { DISHES, SIGNED_UP_USERS } from "./constants"

export default function App() {
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedLogin, setOpenedLogin] = useState(false);
    let showWarning = false;
    const showCurtain = (openedLogin || openedSignUp);

    const [meals, setMeals] = useState(DISHES);
    const [openedCardPage, setOpenedCardPage] = useState(false);
    const [registeredMeals, setRegisteredMeals] = useState([]);

    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [signedUpUsers, setSignedUpUsers] = useState(SIGNED_UP_USERS);
    const [loggedInUser, setLoggedInUser] = useState({ email: "", password: "" });

    console.log(signedUpUsers);

    function handleDisplayFoods(meal) {
        setMeals((meals) => DISHES.filter((dish) => dish.type === meal.toLowerCase()))
    }

    function handleAddUser(e) {
        e.preventDefault();
        const u = { name: name, email: email, password: password };
        setSignedUpUsers((users) => [...users, u]);
        setName("");
        setPassword("");
        setEmail("");
    }

    function handleLogIn(e) {
        e.preventDefault();
        signedUpUsers.map((user) => user.email !== email || user.password !== password ? alert("this user doesn't exist") :
            setLoggedInUser((user) => ({ email: email, password: password })));
    }

    console.log(loggedInUser);

    return (
        <div className="app">
            {openedCardPage && < CardPage registeredMeals={registeredMeals}
                onSetRegisteredMeals={setRegisteredMeals}
                onSetOpenedSignUp={setOpenedSignUp} onSetOpenedCardPage={setOpenedCardPage}
            />}
            <Header onSetOpenedSignUp={setOpenedSignUp} onSetOpenedCardPage={setOpenedCardPage} />
            {openedSignUp && <SignUp onSetOpenedLogin={setOpenedLogin}
                onSetOpenedSignUp={setOpenedSignUp}
                showWarning={showWarning}
                onSetPassword={setPassword} password={password}
                onSetEmail={setEmail} email={email}
                onSetName={setName} name={name}
                onAddUser={handleAddUser}
            />}
            {openedLogin && <Login onSetOpenedSignUp={setOpenedSignUp}
                onSetOpenedLogin={setOpenedLogin}
                password={password} onSetPassword={setPassword}
                email={email} onSetEmail={setEmail}
                onLogIn={handleLogIn}
            />}
            {showCurtain && <Curtain />}
            {showWarning && <Warning />}
            <HeroSection />
            <ExploreMenu onDisplayFoods={handleDisplayFoods} />
            <MainMenu meals={meals} onSetRegisteredMeals={setRegisteredMeals}
                registeredMeals={registeredMeals}
            />
            <AdvertisementSection />
            <Footer />
        </div>
    )
}