const foodInfo = [
    { img: "", title: "Greek Salad", price: "34$", quantity: 2, Total: "24$" }
]

export default function BasketPage() {
    return (
        <section>
            <section className="food-list">
                <div>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                {foodInfo.map((food, i) => <FoodInfo key={i} food={food} />)}
            </section>
        </section>
    )
}

function FoodInfo() {
    return (
        <section>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <button>✖</button>
        </section>
    )
}