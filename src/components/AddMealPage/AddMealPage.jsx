import { useState } from "react";

export default function AddMealPage({ children, setSpecificMeals }) {
    return (
        <section className="add-meal-page">
            {children}

            <nav>
                <ul>
                    <li>Add Items</li>
                    <li>List added Items</li>
                </ul>
            </nav>

            <main>
                <NewMealInfo setSpecificMeals={setSpecificMeals} />
            </main>
        </section>
    );
}

function NewMealInfo({ setSpecificMeals }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [ingredientItem, setIngredientItem] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState(0);

    function handleAddNewSpecificMeal(e) {
        e.preventDefault();

        const id = ingredients.length;


        const newSpecificMeal = {
            id: id,
            name: name,
            image: image,
            price: price
        };

        setSpecificMeals(specificMeals => [...specificMeals, newSpecificMeal]);
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

        setIngredients(ingredients => [...ingredients, ingredientItem]);
    }

    function handleRemoveIngredient(item_) {
        setIngredients(ingredients => ingredients.filter(item => item !== item_));
    }

    return (
        <form onSubmit={(e) => handleAddNewSpecificMeal(e)}>
            <section>
                <div>
                    <label htmlFor="">Upload image</label>
                    <input type="image" src={image} alt="special-meal" onChange={(e) => setImage(e.target.src)} />
                </div>
                <div>
                    <label htmlFor="">Product name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </section>
            <div>
                <label htmlFor="">Product description and notes:</label>
                <textarea type="text" />
            </div>
            <div>
                <label htmlFor="">Add date and time you need your recipe to be made</label>
                <p style={{ color: "red", margin: 0 }}>Note special meals needs 2 hours and they will be delivered directly after they made</p>
                <div className="date">
                    <label htmlFor="">Time:</label>
                    <input type="time" name="" id="" />
                    <label htmlFor="">Date:</label>
                    <input type="date" name="" id="" />
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
                <div className="price-displayer">the price of your meal is 234$</div>
            </div>
        </form>
    );
}

function Ingredient({ handleRemoveIngredient, name }) {
    return (
        <div className="ingredient-container" onClick={() => handleRemoveIngredient(name)}>
            <li>{name}</li>
            <div className="remove"></div>
        </div>
    );
}