import AddingControl from "./AddingControl";
import ControlledStarRating from "./ControlledStarRating"
import UncontrolledStarRating from "./UncontrolledStarRating"
import TextExpander from "./TextExpander"
import { useEffect, useRef, useState } from "react";

export default function Dish({ recipe, recipesOrder, setRecipesOrder }) {
    const [isClicked, setIsClicked] = useState(false);
    const [showDetails, setShowDetails] = useState(true);
    const [dishAmount, setDishAmount] = useState(1);
    const [canControlRating, setCanControlRating] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [isShowText, setIsShowText] = useState(false);
    const [canOrder, setCanOrder] = useState(false);
    const ratedTimes = useRef(0);

    const ratingMessages = [
        { msg: "Terrible", color: "red" },
        { msg: "Bad", color: "orangered" },
        { msg: "Okay", color: "#b8b800" },
        { msg: "Good", color: "green" },
        { msg: "Amazing", color: "blue" }
    ];

    function handleShowDetails() {
        setShowDetails(!showDetails);
    }

    function handleCloseDishDetails(e) {
        if (e.code === "Escape") {
            setShowDetails(true);
        }
    }

    document.addEventListener("keydown", handleCloseDishDetails);

    const {
        cookTimeMinutes,
        cuisine,
        difficulty,
        image,
        ingredients,
        mealType,
        name,
        id,
        prepTimeMinutes,
        rating,
        reviewCount,
    } = recipe;

    const ingredientsPart1 = ingredients.toString().slice(0, 25);
    const ingredientsPart2 = ingredients.toString().slice(25);

    const price = 2 * rating;

    const roundedRating = Math.round(Number(rating));

    // useEffect(function () {
    //     localStorage.setItem(`dish${id}`, { name: name, price: price });
    // }, [price]);

    let totalPrice = (dishAmount * price).toFixed(1);

    let totalTimeNeeded = prepTimeMinutes + cookTimeMinutes;

    useEffect(function () {
        if (userRating)
            ratedTimes.current++;
    }, [userRating])

    function handleAddRecipe() {

        const newRecipe = {
            id: id,
            name,
            image,
            price: price,
            totalTime: totalTimeNeeded,
            quantity: dishAmount,
            totalPrice: totalPrice,
            countRatingDecisions: 3
        };

        console.log(newRecipe);

        const isExistInRecipesOrder = recipesOrder.map(item => item.id).includes(id);

        //adding recipe only if it doesn't exists
        if (!isExistInRecipesOrder) {
            setRecipesOrder(recipesOrder => [...recipesOrder, newRecipe]);
        }
        else
            //update existing recipe totalPrice + amount
            setRecipesOrder(recipesOrder => recipesOrder.map(item => item.id === id ?
                { ...item, quantity: dishAmount, totalPrice: totalPrice } : item
            ));

        console.log(recipesOrder);
    }

    function handleAddInFirstTime() {
        setIsClicked(true);
        handleAddRecipe();
    }

    return (
        <section className="dish">
            <div className="img">
                <img src={image} alt={name} />
                {isClicked ? <AddingControl setDishAmount={setDishAmount}
                    dishAmount={dishAmount} handleAddRecipe={handleAddRecipe}
                    setIsClicked={setIsClicked} setCanOrder={setCanOrder} /> :
                    <button className="add" onClick={handleAddInFirstTime}
                    ></button>
                }
            </div>
            {showDetails ?
                <main>
                    <div className="dish-info">
                        <p>{cuisine}</p>
                        <div>
                            {!canControlRating ? <UncontrolledStarRating rating={roundedRating} /> :
                                <ControlledStarRating defaultRating={2} onSetRating={setUserRating} messages={ratingMessages} />}
                            <p className="add-rating-text" role="button"
                                style={{ color: canControlRating ? "goldenrod" : "navy" }}
                                onClick={() => setCanControlRating(canControlRating => !canControlRating)}>
                                {canControlRating ? "see people's rating" : "add your rating"}
                            </p>
                        </div>
                        <p className="review-count">{reviewCount} people reviews</p>
                    </div>
                    <h3 className="name">{name}</h3>
                    <div className="detailed-info">
                        <p className="price">{price}$</p>
                        <p>Duration: {cookTimeMinutes + prepTimeMinutes}min</p>
                        <button className="details" onClick={handleShowDetails}>show</button>
                    </div>
                </main> : <div className="more-details">
                    <h3 className="name">{name}</h3>
                    <table>
                        <tr>
                            <td>cuisine </td>
                            <td>{cuisine}</td>
                        </tr>
                        <tr>
                            <td>Meal Type: </td>
                            <td>{mealType}</td>
                        </tr>
                        <tr>
                            <td>Ingredients: </td>
                            <td>
                                <TextExpander text1={ingredientsPart1} textClassName="lighter"
                                    showText_={isShowText} onSetShowText={setIsShowText}>
                                    {ingredientsPart2}
                                </TextExpander>
                            </td>
                        </tr>
                        <tr>
                            <td>Avg Rating: </td>
                            <td>{rating}/5 with {reviewCount} people reviews</td>
                        </tr>
                        <tr>
                            <td>cook time: </td>
                            <td>{cookTimeMinutes}min</td>
                        </tr>
                        <tr>
                            <td>Prep time: </td>
                            <td>{prepTimeMinutes}min</td>
                        </tr>
                        <tr>
                            <td>Difficulty: </td>
                            <td>{difficulty}</td>
                        </tr>
                    </table>
                    <button className="details" onClick={handleShowDetails}>hide</button>
                </div>}
        </section>
    );
}