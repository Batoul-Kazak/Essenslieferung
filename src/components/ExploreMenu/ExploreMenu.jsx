const meals = [
    { meal: "Salad", img: "" },
    { meal: "Rolls", img: "" },
    { meal: "Deserts", img: "" },
    { meal: "Sandwich", img: "" },
    { meal: "Cake", img: "" },
    { meal: "Pure Veg", img: "" },
    { meal: "Pasta", img: "" },
    { meal: "Noodles", img: "" },
];

export default function ExploreMenu() {

    return (
        <section className="explore-menu">
            <h2>Explore our menu</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aliquam unde,
                est, illum soluta dolor optio eius necessitatibus veniam quasi dolorem,
                deleniti officiis consequuntur doloremque culpa sunt ipsum distinctio a!</p>
            <main>
                {meals.map((el, i) =>
                    <FoodType key={i} meal={el} />
                )}
            </main>
        </section>
    )
}

function FoodType({ meal }) {
    return (
        <section>
            {/* <img src="" alt="" /> */}
            <div style={{ backgroundColor: "red", width: "5rem", height: "5rem" }}></div>
            <h3>{meal.meal}</h3>
        </section>
    );
}