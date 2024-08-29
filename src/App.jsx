import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import MainMenu from "./components/MainMenu/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection/AdvertisementSection"
import Footer from "./components/Footer/Footer"

export default function App() {
    return (
        <div className="app">
            <Header />
            <HeroSection />
            <ExploreMenu />
            <MainMenu />
            <AdvertisementSection />
            <Footer />
        </div>
    )
}