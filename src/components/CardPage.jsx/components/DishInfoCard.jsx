import image1 from "./../../../assets/menu_7.png"

export default function DishInfoCard({ registeredMeals, onSetRegisteredMeals }) {

    const show = registeredMeals.length ? true : false;
    return (
        <section className="dish-info-card">
            {show &&
                <div className="dish-info-card-show">
                    <div>
                        <p className="image">Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    {registeredMeals.map((_dish) => <DishInfo key={_dish.name} _dish={_dish}
                        onSetRegisteredMeals={onSetRegisteredMeals} registeredMeals={registeredMeals} />)}
                </div>
            }

            {!show && <p>No Meals Selected!</p>}
        </section>
    )
}

function DishInfo({ _dish, onSetRegisteredMeals, registeredMeals }) {
    const totalPrice = _dish.totalQuantity * _dish.price;

    function handleRemoveMeal() {
        onSetRegisteredMeals((meals) => meals.filter(meal => _dish.name !== meal.name));
        console.log(registeredMeals);

    }

    return (
        <div className="dish-info">
            <div className="image">
                <img src={image1} alt="image" />
            </div>
            <p>{_dish.name}</p>
            <p>{_dish.price}$</p>
            <p>{_dish.totalQuantity}</p>
            <p>{totalPrice}$</p>
            <button onClick={() => handleRemoveMeal()}>✖</button>
        </div>
    );
}