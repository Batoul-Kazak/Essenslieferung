import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import MainMenu from "./components/MainMenu/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection/AdvertisementSection"
import Footer from "./components/Footer/Footer"
import SignUp from "./components/Header/components/SignUp"
import Login from "./components/Header/components/Login"

import { useState } from "react"

export default function App() {
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedLogin, setOpenedLogin] = useState(false);

    return (
        <div className="app">
            <Header onSetOpenedSignUp={setOpenedSignUp} />
            {openedSignUp && <SignUp onSetOpenedLogin={setOpenedLogin} />}
            {openedLogin && <Login onSetOpenedSignUp={setOpenedSignUp} />}
            <HeroSection />
            <ExploreMenu />
            <MainMenu />
            <AdvertisementSection />
            <Footer />
        </div>
    )
}