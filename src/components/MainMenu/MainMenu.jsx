
import StarRating from "./components/StarRating"
import { AddingControl } from "./components/AddingControl";
import { useState } from "react"

export default function MainMenu({ meals, onSetRegisteredMeals, registeredMeals }) {
    return (
        <section className="main-menu">
            <h2>Top dishes near you</h2>
            <main>
                {
                    meals.map((el, i) => <Dish key={i} dish={el}
                        onSetRegisteredMeals={onSetRegisteredMeals}
                        registeredMeals={registeredMeals}
                    />)
                }
                {meals.map((el, i) => <Dish key={i} dish={el} />)}
            </main >
        </section >
    )
}

function Dish({ dish, onSetRegisteredMeals, registeredMeals }) {
    const [quantity, setQuantity] = useState(0);

    function handleAddMeal() {
        setQuantity((quantity) => quantity + 1);
        let try_ = (Math.floor(Math.random() * 5)) + 1;
        // console.log(quantity)
        let dishInfo = { image: dish.image, name: dish.name, price: dish.price, totalQuantity: try_ };

        if (registeredMeals.find(meal => dish.name == meal.name)) {
            onSetRegisteredMeals(
                registeredMeals =>
                    registeredMeals.map(el =>
                        el.name != element.name ?
                            el :
                            dishInfo
                    ));
        } else {
            onSetRegisteredMeals(
                registeredMeals =>
                    [...registeredMeals, dishInfo]);
        }
        console.log(dish)
        console.log(registeredMeals);
    }

    return (
        <section className="dish">
            <div className="img">
                <img src={dish.image} alt={dish.name} />
                {quantity > 0 ? <AddingControl onSetQuantity={setQuantity} quantity={quantity}
                    onSetRegisteredMeals={onSetRegisteredMeals}
                /> :
                    <button className="add" onClick={() => handleAddMeal()}
                    ></button>
                }
            </div>
            <main>
                <div className="dish-info">
                    <h3>{dish.name}</h3>
                    {/* {rating[dish.rating - 1]} */}
                    <StarRating rating={dish.rating} />
                </div>
                <p>{dish.description}</p>
                <p className="price">{dish.price}$</p>
            </main>
        </section>
    );
}