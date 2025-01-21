import Warning from "../../Reusable Components/Warning";
import Curtain from "../../Reusable Components/Curtain";
import { useState } from "react";

export default function AddMealPage({ children, specificMeals, setSpecificMeals }) {
    const [sortedBy, setSortedBy] = useState("firstAdded");
    const [isShowWarning, setIsShowWarning] = useState(false);
    const [isYes, setIsYes] = useState(null);
    const warningMsg = "Clearing all meals will delete them permanently and you won't receive any meal, Are you sure you want to clear all specific meals";
    let sortedSpecificMeals = [];

    if (sortedBy === "firstAdded") { sortedSpecificMeals = specificMeals; }

    if (sortedBy === "makingTime") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(a.time) - Number(b.time)); }

    if (sortedBy === "price") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(a.price) - Number(b.price)); }

    if (sortedBy === "name") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => a.name.localeCompare(b.name)) }

    function handleWarningAnswerIfYes() {
        setIsShowWarning(false);
        setSpecificMeals([]);
        setIsYes(null);
    }

    function handleWarningAnswerIfNo() {
        setIsShowWarning(false);
        setIsYes(null);
    }


    function handleClearAllSpecificMeals() {
        if (!specificMeals.length) {
            alert("There is no items in the list");
            return;
        }
        setIsShowWarning(true);
        console.log(isShowWarning);
    }

    function handleDeleteSpecificMeal(name) {
        setSpecificMeals(specificMeals => specificMeals.filter(item => item.name !== name));
    }

    return (
        <section className="add-meal-page">
            {children}

            <section className="flex">
                <nav>
                    {specificMeals.length ? <> <h2>Your Created Meals</h2>
                        <p>You have {sortedSpecificMeals.length} meals from your creation</p>
                    </>
                        : <p>No meals added</p>}
                    <ul>
                        {sortedSpecificMeals.map(item => <Meal key={item.name} item={item}
                            handleDeleteSpecificMeal={handleDeleteSpecificMeal} />)}
                    </ul>
                    <div style={{ display: "flex", gap: "4rem" }}>
                        <button onClick={handleClearAllSpecificMeals}>Clear All</button>
                        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
                            <option value="makingTime">sort by making time</option>
                            <option value="name">sort by name</option>
                            <option value="price">sort by price</option>
                            <option value="firstAdded">sort by first added</option>
                        </select>
                    </div>
                </nav>

                <main>
                    <NewMealInfo setSpecificMeals={setSpecificMeals} specificMeals={specificMeals} />
                </main>
            </section>
            {isShowWarning && <Curtain />}
            {isShowWarning && <Warning handleWarningAnswerIfNo={handleWarningAnswerIfNo}
                handleWarningAnswerIfYes={handleWarningAnswerIfYes} message={warningMsg} />}
        </section>
    );
}

function Meal({ item, handleDeleteSpecificMeal }) {
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
            <button onClick={() => handleDeleteSpecificMeal(item.name)}>×</button>
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

        const newSpecificMeal = {
            image: image,
            name: name,
            description: description,
            time: time,
            date: date,
            ingredients: ingredients,
            price: price
        };

        if (name === "") {
            alert("You didn't enter the name of your meal");
            return;
        }

        const isExist = specificMeals.find(meal => meal.name === name);

        if (isExist) { alert("You used this name before, try another one"); return; }

        setSpecificMeals(specificMeals => [...specificMeals, newSpecificMeal]);

        console.log(specificMeals);
        handleResetForm();
    }

    function handleResetForm() {
        setName("");
        setDate(currentDate);
        setTime(currentTime);
        setDescription("");
        setIngredients([]);
        setIngredientItem("");
        setPrice(0);
    }

    function handleAddIngredient() {
        setPrice(price => price + 10);

        const isExist = ingredients.find(item => item.name === name);

        if (ingredientItem === "") {
            alert("You didn't add any items");
            return;
        }

        if (isExist) {
            alert("Item already exists");
            setName("");
        }

        setIngredients(ingredients => [...ingredients, ingredientItem]);
        setIngredientItem("")
    }

    function handleRemoveIngredient(item_) {
        setIngredients(ingredients => ingredients.filter(item => item !== item_));
        setPrice(price => price - 10);
    }

    return (
        <form>
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
                    {ingredients.map(item => <Ingredient key={item.name} name={item}
                        handleRemoveIngredient={handleRemoveIngredient} />)}
                </ol>
            </div>
            <div className="flex-row">
                <button onClick={handleAddNewSpecificMeal}>Order</button>
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