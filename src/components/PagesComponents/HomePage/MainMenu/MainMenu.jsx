
import Dish from "./../../../Reusable Components/Dish";

export default function MainMenu({
    recipe,
    recipesOrder,
    setRecipesOrder,
    handleGoToCartPage,
}) {
    const localStorageData = []; // Array to store key-value pairs

    return (
        <section className="main-menu">
            {!recipe.length ? <h2>Search and find your recipes</h2>
                : <>
                    <h2>Choose and enjoy your meal</h2>
                    <main>
                        {
                            recipe.map(dish => <Dish key={dish.id}
                                recipe={dish}
                                recipesOrder={recipesOrder} setRecipesOrder={setRecipesOrder}
                            />)
                        }

                    </main>
                    {/* {
                copy from text in this project folder
                } */}
                </>}
            {!recipesOrder.length && <button className="order-button" onClick={handleGoToCartPage}>Go to Check and Buy Your Recipes</button>}
        </section >
    );
}
