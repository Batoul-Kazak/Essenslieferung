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

import { DISHES } from "./constants"

export default function App() {
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedLogin, setOpenedLogin] = useState(false);
    let showWarning = false;
    const showCurtain = (openedLogin || openedSignUp);
    const [password, setPassword] = useState("");
    const [meals, setMeals] = useState(DISHES);
    const [openedCardPage, setOpenedCardPage] = useState(false);
    const [registeredMeals, setRegisteredMeals] = useState([]);

    function handleDisplayFoods(meal) {
        setMeals((meals) => DISHES.filter((dish) => dish.type === meal.toLowerCase()))
    }

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
                password={password} onSetPassword={setPassword}
            />}
            {openedLogin && <Login onSetOpenedSignUp={setOpenedSignUp}
                onSetOpenedLogin={setOpenedLogin}
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