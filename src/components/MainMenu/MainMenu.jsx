const dishes = [
    { image: "", name: "Greek Salad", rating: 4, description: "the best one", price: 23 },
    { image: "", name: "Veg Salad", rating: 5, description: "the best one", price: 24 },
    { image: "", name: "Claver Salad", rating: 2, description: "the best one", price: 89 },
    { image: "", name: "Chicked Salad", rating: 3, description: "the best one", price: 5 },
    { image: "", name: "Lasagna Salad", rating: 4, description: "the best one", price: 12 },
    { image: "", name: "Peri Peri Rolls", rating: 1, description: "the best one", price: 23 },
    { image: "", name: "Chicken Rolls", rating: 3, description: "the best one", price: 23 },
    { image: "", name: "Veg Rolls", rating: 1, description: "the best one", price: 23 },
    { image: "", name: "Ripple Ice Cream", rating: 3, description: "the best one", price: 76 },
    { image: "", name: "Fruit Ice Cream", rating: 2, description: "the best one", price: 34 },
    { image: "", name: "Vanilla Ice Cream", rating: 4, description: "the best one", price: 21 },
    { image: "", name: "Garlic Mushroom", rating: 3, description: "the best one", price: 8 },
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
    return (
        <section className="dish">
            {/* <img src="" alt="" /> */}
            <div className="img" style={{ backgroundColor: "green", width: "15rem", height: "15rem", borderRadius: "1rem" }}>
                <div className="add">➕</div>
            </div>
            <main>
                <div className="flex-row gap">
                    <h3>{dish.name}</h3>
                    <p>⭐⭐⭐</p>
                </div>
                <p>{dish.description}</p>
                <div>{dish.price}$</div>
            </main>
        </section>
    );
}