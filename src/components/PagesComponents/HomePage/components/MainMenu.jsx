
import { useContext } from "react";
import Dish from "./../../../Reusable Components/Dish";
import { OpenedPageContext } from "../../App";

export default function MainMenu() {
    const localStorageData = []; // Array to store key-value pairs
    const Context = useContext(OpenedPageContext);
    const recipe = Context?.recipe;
    const recipesOrder = Context?.recipesOrder;
    const setOpenedPage = Context?.setOpenedPage;

    return (
        <section className="main-menu">
            {!recipe.length ? <h2>Search and find your recipes</h2>
                : <>
                    <h2>Choose and enjoy your meal</h2>
                    <main>
                        {recipe.map(dish => <Dish key={dish.id} recipe={dish} />)}
                    </main>
                    {/* {
                copy from text in this project folder
                } */}
                </>}
            {!recipesOrder.length && <button className="order-button" onClick={() => setOpenedPage("cart")}>Go to Check and Buy Your Recipes</button>}
        </section >
    );
}
