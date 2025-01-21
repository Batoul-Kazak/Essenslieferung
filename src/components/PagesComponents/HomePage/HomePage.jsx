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

export default function HomePage({
    children,
    openedPopup,
    query,
    setQuery,
    isLoading,
    error,
    recipe,
    setOpenCartPage,
    recipesOrder,
    setRecipesOrder,
    handleGoToCartPage
}) {
    return (
        <section className="home-page">
            {children}
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
                setQuery={setQuery} setOpenCartPage={setOpenCartPage}
                recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                handleGoToCartPage={handleGoToCartPage}
            />}
            {error && <ErrorMessage message={error} />}
            <AdvertisementSection />
            <Footer />
        </section>
    )
}