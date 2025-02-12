import HeroSection from "./components/HeroSection"
import ExploreMenu from "./components/ExploreMenu"
import MainMenu from "./components/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection"
import Footer from "./components/Footer"
import Header from "../../Reusable Components/Header/Header"
import SignUp from "./../../Reusable Components/Header/components/SignUp"
import Login from "./../../Reusable Components/Header/components/Login"
import Curtain from "./../../Reusable Components/Curtain"
import Loader from "./../../Reusable Components/Loader"
import ErrorMessage from "./../../Reusable Components/ErrorMessage"
import { useContext } from "react"
import OpenedPageContext from "./../App"

export default function HomePage() {
    const Context = useContext(OpenedPageContext);
    const openedPopup = Context?.openedPopup;
    const error = Context?.error;
    const isLoading = Context?.isLoading;

    return (
        <section className="home-page">
            <Header />
            {openedPopup === "signup" ?
                <>
                    <SignUp />
                    <Curtain />
                </>
                : openedPopup === "login" ?
                    <>
                        <Login />
                        <Curtain />
                    </>
                    : ""}
            <HeroSection />
            <ExploreMenu />
            {isLoading && <Loader />}
            {!isLoading && !error && <MainMenu />}
            {error && <ErrorMessage />}
            <AdvertisementSection />
            <Footer />
        </section>
    )
}