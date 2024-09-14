import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import ExploreMenu from "./components/ExploreMenu/ExploreMenu"
import MainMenu from "./components/MainMenu/MainMenu"
import AdvertisementSection from "./components/AdvertisementSection/AdvertisementSection"
import Footer from "./components/Footer/Footer"
import SignUp from "./components/Header/components/SignUp"
import Login from "./components/Header/components/Login"

import { useState } from "react"

import food_1 from "./assets/food_1.png"
import food_2 from "./assets/food_2.png"
import food_3 from "./assets/food_3.png"
import food_4 from "./assets/food_4.png"
import food_5 from "./assets/food_5.png"
import food_6 from "./assets/food_6.png"
import food_7 from "./assets/food_7.png"
import food_8 from "./assets/food_8.png"
import food_9 from "./assets/food_9.png"
import food_10 from "./assets/food_10.png"
import food_11 from "./assets/food_11.png"
import food_12 from "./assets/food_12.png"

const dishes = [
    { image: food_1, name: "Greek Salad", type: "salad", rating: 4, description: "the best one", price: 23 },
    { image: food_2, name: "Veg Salad", type: "salad", rating: 5, description: "the best one", price: 24 },
    { image: food_3, name: "Claver Salad", type: "salad", rating: 2, description: "the best one", price: 89 },
    { image: food_4, name: "Chicken Salad", type: "salad", rating: 3, description: "the best one", price: 5 },
    { image: food_5, name: "Lasagna Salad", type: "salad", rating: 4, description: "the best one", price: 12 },
    { image: food_6, name: "Peri Peri Rolls", type: "rolls", rating: 1, description: "the best one", price: 23 },
    { image: food_7, name: "Chicken Rolls", type: "rolls", rating: 3, description: "the best one", price: 23 },
    { image: food_8, name: "Veg Rolls", type: "rolls", rating: 1, description: "the best one", price: 23 },
    { image: food_9, name: "Ripple Ice Cream", type: "desert", rating: 3, description: "the best one", price: 76 },
    { image: food_10, name: "Fruit Ice Cream", type: "desert", rating: 2, description: "the best one", price: 34 },
    { image: food_11, name: "Vanilla Ice Cream", type: "desert", rating: 4, description: "the best one", price: 21 },
    { image: food_12, name: "Garlic Mushroom", type: "sandwich", rating: 3, description: "the best one", price: 8 },
]

export default function App() {
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedLogin, setOpenedLogin] = useState(false);
    const [meals, setMeals] = useState(dishes);

    function handleDisplayFoods(meal) {
        setMeals((meals) => dishes.filter((dish) => dish.type === meal.toLowerCase() ? [...meals, meal] : meals))
        console.log(meal.toLowerCase());
    }

    return (
        <div className="app">
            <Header onSetOpenedSignUp={setOpenedSignUp} />
            {openedLogin && <SignUp onSetOpenedLogin={setOpenedLogin}
                onSetOpenedSignUp={setOpenedSignUp}
            />}
            {openedSignUp && <Login onSetOpenedSignUp={setOpenedSignUp}
                onSetOpenedLogin={setOpenedLogin}
            />}
            <HeroSection />
            <ExploreMenu onDisplayFoods={handleDisplayFoods} />
            <MainMenu meals={meals} />
            <AdvertisementSection />
            <Footer />
        </div>
    )
}