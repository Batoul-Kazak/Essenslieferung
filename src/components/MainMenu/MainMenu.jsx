
import StarRating from "./StarRating"
import { useState } from "react"



export default function MainMenu({ meals }) {
    return (
        <section className="main-menu">

            <h2>Top dishes near you</h2>
            <main>
                {meals.map((el, i) => <Dish key={i} dish={el} />)}
            </main>
        </section>
    )
}

function Dish({ dish }) {
    return (
        <section className="dish">
            <div className="img">
                <img src={dish.image} alt={dish.name} />
                <div className="add"></div>
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