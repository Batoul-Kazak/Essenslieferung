import { useEffect, useState } from "react"
import Loader from "../../Reusable Components/Loader";
import ErrorMessage from "../../Reusable Components/ErrorMessage";
import Dish from "./../../Reusable Components/Dish";
import { useFetchingMeals } from "../../../functions/useFetchingMeals";

export default function MenuPage({
    children,
    recipesOrder,
    setRecipesOrder,
    handleGoToCartPage,
    handleGoToAddMealPage
}) {
    const { recipe, isLoading, error } = useFetchingMeals(false);
    // const [recipes, setRecipes] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState("");

    // useEffect(function () {
    //     async function fetchMenu() {
    //         try {
    //             setIsLoading(true);
    //             setError("");
    //             const res = await fetch("https://dummyjson.com/recipes");
    //             if (!res.ok) throw new Error("Couldn't fetch recipe");

    //             const data = await res.json();
    //             if (data.total === 0)
    //                 throw new Error("There is no items matches your search");

    //             setRecipes(data.recipes);
    //             setError("");
    //         } catch (err) {
    //             setError(err.message);
    //             console.log(err.message)
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchMenu();
    // }, []);

    return (
        <section className="menu-page">
            {children}
            {!error && !isLoading && <Menu handleGoToAddMealPage={handleGoToAddMealPage}
                handleGoToCartPage={handleGoToCartPage}>
                {recipe.map(dish => <Dish key={dish.id}
                    recipe={dish}
                    recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                />)}
            </Menu>}
            {isLoading && !error && <Loader />}
            {error && <ErrorMessage message={error} />}
        </section>
    );
}

function Menu({
    children,
    handleGoToAddMealPage,
    handleGoToCartPage,
    recipesOrder
}) {

    return (
        <section className="main-menu">
            <p>All Recipes We have, <a href="#" onClick={handleGoToAddMealPage}>Click here to add your own meal</a> </p>
            {!recipesOrder && <button className="order-button" onClick={handleGoToCartPage}>Go to Check and Buy Your Recipes</button>}
            <main>
                {children}
            </main>
        </section>
    );
}