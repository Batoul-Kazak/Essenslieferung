import HeroSection from "./components/HeroSection"
import ExploreMenu from "./components/ExploreMenu"
import MainMenu from "./components/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection"
import Footer from "./components/Footer"
import SignUp from "./../../Reusable Components/Header/components/SignUp"
import Login from "./../../Reusable Components/Header/components/Login"
import Curtain from "./../../Reusable Components/Curtain"
import Loader from "./../../Reusable Components/Loader"
import ErrorMessage from "./../../Reusable Components/ErrorMessage"
import { use } from "react"

export default function HomePage({
    children,
    openedPopup,
    query,
    setQuery,
    isLoading,
    error,
    recipe,
    recipesOrder,
    setRecipesOrder,
    setOpenedPopup,
    setOpenedPage,
    users,
    dispatch,
    currentUser
}) {
    return (
        <section className="home-page">
            {children}
            {openedPopup === "signup" ?
                <>
                    <SignUp users={users} setOpenedPopup={setOpenedPopup} dispatch={dispatch} />
                    <Curtain />
                </>
                : openedPopup === "login" ?
                    <>
                        <Login setOpenedPopup={setOpenedPopup} users={users} dispatch={dispatch} currentUser={currentUser} />
                        <Curtain />
                    </>
                    : ""}
            <HeroSection />
            <ExploreMenu query={query} setQuery={setQuery} />
            {isLoading && <Loader />}
            {!isLoading && !error && <MainMenu recipe={recipe}
                setQuery={setQuery} recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                setOpenedPage={setOpenedPage}
            />}
            {error && <ErrorMessage message={error} />}
            <AdvertisementSection />
            <Footer />
        </section>
    )
}