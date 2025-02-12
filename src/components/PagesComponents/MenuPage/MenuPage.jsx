import { useContext, useEffect, useState } from "react"
import Loader from "../../Reusable Components/Loader";
import ErrorMessage from "../../Reusable Components/ErrorMessage";
import Dish from "./../../Reusable Components/Dish";
import Header from "../../Reusable Components/Header/Header";
import { useFetchingMeals } from "../../../functions/useFetchingMeals";
import { OpenedPageContext } from "../App";

export default function MenuPage() {
    const { recipe, isLoading, error } = useFetchingMeals(false);

    return (
        <section className="menu-page">
            <Header />
            {!error && !isLoading && <Menu>
                {recipe.map(dish => <Dish key={dish.id} recipe={dish} />)}
            </Menu>}
            {isLoading && !error && <Loader />}
            {error && <ErrorMessage message={error} />}
        </section>
    ); error
}

function Menu({
    children
}) {
    const Context = useContext(OpenedPageContext);
    const recipesOrder = Context?.recipesOrder;
    const setOpenedPage = Context?.setOpenedPage;

    return (
        <section className="main-menu">
            <p>All Recipes We have, <a href="#" onClick={() => setOpenedPage("meal")}>Click here to add your own meal</a> </p>
            {!recipesOrder && <button className="order-button" onClick={() => setOpenedPage("cart")}>Go to Check and Buy Your Recipes</button>}
            <main>
                {children}
            </main>
        </section>
    );
}