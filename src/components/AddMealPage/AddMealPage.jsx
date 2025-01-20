import { useState } from "react";

export default function AddMealPage({ children, specificMeals, setSpecificMeals }) {
    return (
        <section className="add-meal-page">
            {children}

            <section className="flex">
                <nav>
                    <h2>Your Created Meals</h2>
                    <ul>
                        {specificMeals.map(item => <Meal key={item.id} item={item} />)}
                    </ul>
                </nav>

                <main>
                    <NewMealInfo setSpecificMeals={setSpecificMeals} specificMeals={specificMeals} />
                </main>
            </section>
        </section>
    );
}

function Meal({ item }) {
    return (
        <li>
            <div>
                {item.image ? <img src={item.image} alt="" />
                    : <div className="image-place"></div>
                }
            </div>
            <div>{item.name}</div>
            <div>{item.time}</div>
            <div>{item.date}</div>
            {/* <div>{item.description}</div> */}
            <button>×</button>
        </li>
    );
}

function NewMealInfo({ setSpecificMeals, specificMeals }) {
    const now = new Date();
    // const year = now.getFullYear();
    // const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    // const day = String(now.getDate()).padStart(2, '0');
    // const currentDate = `${year}-${month}-${day}`;
    const currentDate = now.toISOString().slice(0, 10);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [ingredientItem, setIngredientItem] = useState("");
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTime);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState(0);

    function handleAddNewSpecificMeal(e) {
        e.preventDefault();

        const id = ingredients.length;

        const newSpecificMeal = {
            id: id,
            image: image,
            name: name,
            description: description,
            time: time,
            date: date,
            price: price
        };

        setSpecificMeals(specificMeals => [...specificMeals, newSpecificMeal]);
        console.log(specificMeals);
    }

    function handleAddIngredient() {
        setPrice(price => price + 10);

        // ingredients.forEach((i, item), function () {
        //     if (item === ingredientItem) {
        //         alert("Item already exists");
        //         return;
        //     }
        // }
        // );

        if (ingredientItem === "") {
            alert("You didn't add any items");
            return;
        }

        setIngredients(ingredients => [...ingredients, ingredientItem]);
    }

    function handleRemoveIngredient(item_) {
        setIngredients(ingredients => ingredients.filter(item => item !== item_));
        setPrice(price => price - 10);
    }

    return (
        <form onSubmit={(e) => handleAddNewSpecificMeal(e)}>
            <section>
                <div>
                    <label htmlFor="">Upload image</label>
                    <input type="image" src={image} onChange={(e) => setImage(e.target.src)} />
                </div>
                <div>
                    <label htmlFor="">Product name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
            </section>
            <div>
                <label htmlFor="">Product description and notes:</label>
                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="">Add date and time you need your recipe to be made</label>
                <p style={{ color: "red", margin: 0 }}>Note special meals needs 2 hours and they will be delivered directly after they made</p>
                <div className="date">
                    <label htmlFor="">Time:</label>
                    <input type="time" name="" id="" min={currentTime}
                        value={time} onChange={(e) => setTime(e.target.value)} />
                    <label htmlFor="">Date:</label>
                    <input type="date" name="" id="" min={currentDate}
                        value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div className="flex-row">
                <input type="text" className="ingredient-input" placeholder="Add ingredient"
                    value={ingredientItem} onChange={(e) => setIngredientItem(e.target.value)}
                />
                <button className="add-ingredient-button" onClick={handleAddIngredient}>ADD</button>
            </div>
            <div className="list">
                <ol>
                    {ingredients.map(item => <Ingredient key={item.id} name={item}
                        handleRemoveIngredient={handleRemoveIngredient} />)}
                </ol>
            </div>
            <div className="flex-row">
                <button>Order</button>
                {price > 0 && <div className="price-displayer">the price of your meal is {price}$</div>}
            </div>
        </form>
    );
}

function Ingredient({ handleRemoveIngredient, name }) {
    return (
        <div className="ingredient-container" onClick={() => handleRemoveIngredient(name)}>
            <li>{name}</li>
            <button className="remove"></button>
        </div>
    );
}