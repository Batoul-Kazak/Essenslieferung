import Header from "../Header/Header"
import DishInfoCard from "./components/DishInfoCard"

export default function CardPage({ children }) {
    return (
        <section className="card-page">
            {children}
        </section>
    )
}