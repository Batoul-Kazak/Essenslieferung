

import menu_1 from "./../../assets/menu_1.png"
import menu_2 from "./../../assets/menu_2.png"
import menu_3 from "./../../assets/menu_3.png"
import menu_4 from "./../../assets/menu_4.png"
import menu_5 from "./../../assets/menu_5.png"
import menu_6 from "./../../assets/menu_6.png"
import menu_7 from "./../../assets/menu_7.png"
import menu_8 from "./../../assets/menu_8.png"

const dishesTypesArr = [
    { meal: "Salad", img: menu_1 },
    { meal: "Rolls", img: menu_2 },
    { meal: "Deserts", img: menu_3 },
    { meal: "Sandwich", img: menu_4 },
    { meal: "Cake", img: menu_5 },
    { meal: "Pure Veg", img: menu_6 },
    { meal: "Pasta", img: menu_7 },
    { meal: "Noodles", img: menu_8 },
];

export default function ExploreMenu({ onDisplayFoods }) {
    return (
        <section className="explore-menu">
            <h2>Explore our menu</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aliquam unde,
                est, illum soluta dolor optio eius necessitatibus veniam quasi dolorem,
                deleniti officiis consequuntur doloremque culpa sunt ipsum distinctio a!</p>
            <main>
                {dishesTypesArr.map((el, i) =>
                    <FoodType key={i} meal={el} onDisplayFoods={() => onDisplayFoods(el.meal)} />
                )}
            </main>
        </section>
    );
}

function FoodType({ meal, onDisplayFoods }) {
    return (
        <section className="meal" role="button" onClick={onDisplayFoods}>
            <img src={meal.img} alt={meal.meal} />
            <h3>{meal.meal}</h3>
        </section>
    );
}