import Header from "../Header/Header"
import DishInfoCard from "./components/DishInfoCard"

export default function CardPage({ registeredMeals, onSetRegisteredMeals, onSetOpenedCardPage, onSetOpenedSignUp }) {
    return (
        <section className="card-page">
            <div>
                <Header onSetOpenedSignUp={onSetOpenedSignUp} onSetOpenedCardPage={onSetOpenedCardPage} />
                <DishInfoCard registeredMeals={registeredMeals} onSetRegisteredMeals={onSetRegisteredMeals} />
            </div>
        </section>
    )
}