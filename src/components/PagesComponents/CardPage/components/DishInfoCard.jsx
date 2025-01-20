import { useState } from "react"

export default function DishInfoCard({ recipesOrder, setRecipesOrder }) {
    const [isDelivered, setIsDelivered] = useState(false);

    const totalPrice_forRecipe = recipesOrder.map(recipe => Number(recipe.totalPrice));
    const checkAmount = totalPrice_forRecipe.reduce((acc, recipeTotalPrice) => acc + recipeTotalPrice, 0);

    const totalTimeNeeded = recipesOrder.map(recipe => Number(recipe.totalTime))
        .reduce((acc, totalTime) => acc + totalTime, 0);

    const hours = (totalTimeNeeded / 60).toFixed(0);
    const minutes = totalTimeNeeded % 60;

    return (
        <section className="dish-info-card">
            {isDelivered && <p>{`we are working on your recipes, please wait ${hours > 1 ? hours + " hours" : (hours == 1) ?
                " one hour " : ""} ${minutes > 0 ? `and ${minutes} min` : ""} until we deliver it to your home`}</p>}
            {!isDelivered && <>
                {!recipesOrder.length ? <p>No Selected Meals!</p> :
                    <table className="dish-info-card-show">
                        <tr>
                            <td>image</td>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                            <td>Remove</td>
                        </tr>
                        {recipesOrder.map((recipe) => <DishInfo key={recipe.id}
                            recipe={recipe} setRecipesOrder={setRecipesOrder}
                        />)}
                    </table>
                }
                <div className="dish-info-card-side-section">
                    <CartTotal checkAmount={checkAmount} setIsDelivered={setIsDelivered} />
                    <PromoCode />
                </div>
            </>}
        </section>
    )
}

function DishInfo({
    recipe,
    setRecipesOrder
}) {

    function handleRemoveRecipe_FromRecipesOrder() {
        setRecipesOrder(recipesOrder => recipesOrder.filter(item => item.id !== recipe.id));
    }

    return (
        <tr className="dish-info">
            <td className="image">
                <img src={recipe.image} alt="image" />
            </td>
            <td>{recipe.name}</td>
            <td>{recipe.price}$</td>
            <td>{recipe.quantity}</td>
            <td>{recipe.totalPrice}$</td>
            <td>
                <button onClick={handleRemoveRecipe_FromRecipesOrder}>✖</button>
            </td>
        </tr>
    );
}

function CartTotal({ checkAmount, setIsDelivered }) {

    function handleProceedToCheck() {
        setIsDelivered(true);
    }

    return (
        <section className="cart-total">
            <h2>Cart Total</h2>
            <div>
                <div>
                    <p>Subtotal</p>
                    <p>{checkAmount.toFixed(1)}$</p>
                </div>
                <div>
                    <p>Delivery Fee</p>
                    <p>5$</p>
                </div>
                <div>
                    <p>Total</p>
                    <p>{checkAmount ? (checkAmount + 5).toFixed(1) : 0}$</p>
                </div>
            </div>
            <button onClick={() => handleProceedToCheck()} disabled={!checkAmount}>PROCEED TO CHECKOUT</button>
        </section>
    )
}

function PromoCode() {
    return (
        <section className="promo-code">
            <p>If you have a promo code enter it here</p>
            <form>
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
            </form>
        </section>
    )
}