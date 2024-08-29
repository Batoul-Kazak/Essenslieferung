import food_1 from "./../../assets/food_1.png"
import food_2 from "./../../assets/food_2.png"
import food_3 from "./../../assets/food_3.png"
import food_4 from "./../../assets/food_4.png"
import food_5 from "./../../assets/food_5.png"
import food_6 from "./../../assets/food_6.png"
import food_7 from "./../../assets/food_7.png"
import food_8 from "./../../assets/food_8.png"
import food_9 from "./../../assets/food_9.png"
import food_10 from "./../../assets/food_10.png"
import food_11 from "./../../assets/food_11.png"
import food_12 from "./../../assets/food_12.png"

const dishes = [
    { image: food_1, name: "Greek Salad", rating: 4, description: "the best one", price: 23 },
    { image: food_2, name: "Veg Salad", rating: 5, description: "the best one", price: 24 },
    { image: food_3, name: "Claver Salad", rating: 2, description: "the best one", price: 89 },
    { image: food_4, name: "Chicken Salad", rating: 3, description: "the best one", price: 5 },
    { image: food_5, name: "Lasagna Salad", rating: 4, description: "the best one", price: 12 },
    { image: food_6, name: "Peri Peri Rolls", rating: 1, description: "the best one", price: 23 },
    { image: food_7, name: "Chicken Rolls", rating: 3, description: "the best one", price: 23 },
    { image: food_8, name: "Veg Rolls", rating: 1, description: "the best one", price: 23 },
    { image: food_9, name: "Ripple Ice Cream", rating: 3, description: "the best one", price: 76 },
    { image: food_10, name: "Fruit Ice Cream", rating: 2, description: "the best one", price: 34 },
    { image: food_11, name: "Vanilla Ice Cream", rating: 4, description: "the best one", price: 21 },
    { image: food_12, name: "Garlic Mushroom", rating: 3, description: "the best one", price: 8 },
]

export default function MainMenu() {
    return (
        <section className="main-menu">

            <h2>Top dishes near you</h2>
            <main>
                {dishes.map((el, i) => <Dish key={i} dish={el} />)}
            </main>
        </section>
    )
}

function Dish({ dish }) {
    const rating = [
        "⭐",
        "⭐⭐",
        "⭐⭐⭐",
        "⭐⭐⭐⭐",
        "⭐⭐⭐⭐⭐",
    ]
    return (
        <section className="dish">
            <div className="img">
                <img src={dish.image} alt={dish.name} />
                <div className="add"></div>
            </div>
            <main>
                <div className="dish-info">
                    <h3>{dish.name}</h3>
                    {rating[dish.rating - 1]}
                </div>
                <p>{dish.description}</p>
                <p className="price">{dish.price}$</p>
            </main>
        </section>
    );
}