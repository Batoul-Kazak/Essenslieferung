import Warning from "../../Reusable Components/Warning";
import Curtain from "../../Reusable Components/Curtain";
import { useState } from "react";

export default function AddMealPage({ children, specificMeals, setSpecificMeals }) {
    const [sortedBy, setSortedBy] = useState("timeAdded");
    const [typeOfSorting, setTypeOfSorting] = useState("ascending");
    const [isShowWarning, setIsShowWarning] = useState(false);
    const [isYes, setIsYes] = useState(false);
    const [displayTotalMealsPrice, setDisplayTotalMealsPrice] = useState(false);
    const warningMsg = "Clearing all meals will delete them permanently and you won't receive any meal, Are you sure you want to clear all meals you created?";
    let sortedSpecificMeals = [];
    let specificMealsPriceArr = specificMeals.map(meal => Number(meal.price));
    let specificMealsTotalPrice = specificMealsPriceArr.reduce((a, b) => a + b, 0);

    if (typeOfSorting === "ascending") {
        if (sortedBy === "timeAdded") { sortedSpecificMeals = specificMeals; }
        if (sortedBy === "makingTime") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(a.time) - Number(b.time)); }
        if (sortedBy === "price") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(a.price) - Number(b.price)); }
        if (sortedBy === "name") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => a.name.localeCompare(b.name)) }
        if (sortedBy === "soldState") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(a.isForCompany) - Number(b.isForCompany)) }
    }

    if (typeOfSorting === "descending") {
        if (sortedBy === "timeAdded") { sortedSpecificMeals = specificMeals.reverse(); }
        if (sortedBy === "makingTime") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(b.time) - Number(a.time)); }
        if (sortedBy === "price") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(b.price) - Number(a.price)); }
        if (sortedBy === "name") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => b.name.localeCompare(a.name)) }
        if (sortedBy === "soldState") { sortedSpecificMeals = specificMeals.slice().sort((a, b) => Number(b.isForCompany) - Number(a.isForCompany)) }
    }

    function handleWarningAnswerIfYes() {
        setIsShowWarning(false);
        setSpecificMeals([]);
        setIsYes(false);
    }

    function handleWarningAnswerIfNo() {
        setIsShowWarning(false);
        setIsYes(false);
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
                    <table>
                        <tr>
                            <td>image</td>
                            <td>quantity</td>
                            <td>meal</td>
                            <td>make time</td>
                            <td>make date</td>
                            <td>status</td>
                            <td></td>
                        </tr>
                        {sortedSpecificMeals.map(item => <Meal key={item.name} item={item}
                            handleDeleteSpecificMeal={handleDeleteSpecificMeal}
                        />)}
                    </table>
                    <div className="control-container">
                        <button onClick={handleClearAllSpecificMeals}>Clear All</button>
                        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
                            <option value="makingTime">sort by making time</option>
                            <option value="name">sort by name</option>
                            <option value="price">sort by price</option>
                            <option value="timeAdded">sort by first added</option>
                            <option value="soldState">sold state</option>
                        </select>
                        <select value={typeOfSorting} onChange={(e) => setTypeOfSorting(e.target.value)}>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                        <button onClick={() => setDisplayTotalMealsPrice(!displayTotalMealsPrice)}>{!displayTotalMealsPrice ? "total price" : "hide total price"}</button>
                    </div>
                    {displayTotalMealsPrice && <p>The total price of meals you created is {specificMealsTotalPrice}$</p>}
                </nav>

                <main>
                    <NewMealInfo setSpecificMeals={setSpecificMeals} specificMeals={specificMeals}
                    />
                </main>
            </section>
            {isShowWarning && <Curtain />}
            {isShowWarning && <Warning handleWarningAnswerIfNo={handleWarningAnswerIfNo}
                defaultSelectedOption={isYes}
                handleWarningAnswerIfYes={handleWarningAnswerIfYes} message={warningMsg} />}
        </section>
    );
}

function Meal({
    item,
    handleDeleteSpecificMeal
}) {
    return (
        <tr>
            <td className="image-displayer">
                {item.image ? <img src={item.image} alt="" />
                    : <div className="image-place"></div>
                }
            </td>
            <td>{item.quantity}</td>
            <td>{item.name}</td>
            <td>{item.time}</td>
            <td>{item.date}</td>
            <td>{item.isForCompany ? "to sold" : "for you"}</td>

            {/* <div>{item.description}</div> */}
            <td>
                <button onClick={() => handleDeleteSpecificMeal(item.name)}>×</button>
            </td>
        </tr>
    );
}

function NewMealInfo({
    setSpecificMeals,
    specificMeals
}) {
    const now = new Date();
    // const year = now.getFullYear();
    // const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    // const day = String(now.getDate()).padStart(2, '0');
    // const currentDate = `${year}-${month}-${day}`;
    const currentDate = now.toISOString().slice(0, 10);
    const [isForCompany, setIsForCompany] = useState(false);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const [mealsQuantity, setMealsQuantity] = useState(1);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [previewURL, setPreviewURL] = useState(null);
    const [ingredientItem, setIngredientItem] = useState("");
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTime);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState(0);

    function handleAddNewSpecificMeal(e) {
        e.preventDefault();

        const newSpecificMeal = {
            image: previewURL,
            name: name,
            description: description,
            time: time,
            date: date,
            ingredients: ingredients,
            price: price,
            isForCompany: isForCompany,
            quantity: mealsQuantity
        };

        if (name === "") {
            alert("You didn't enter the name of your meal");
            return;
        }

        if (mealsQuantity == 0) {
            alert("you didn't add any ingredient");
            return;
        }

        const isExist = specificMeals.find(meal => meal.name === name);

        if (isExist) { alert("You used this name before, try another one"); return; }

        setSpecificMeals(specificMeals => [...specificMeals, newSpecificMeal]);

        if (isForCompany)
            alert("Your recipe is sent successfully, you can contact us by our email, thank you for being apart from our company 😊");
        else
            alert("Your meal has been added successfully");
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
        setIsForCompany(false);
        setMealsQuantity(1);
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

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            setImage(file); // Store the file in state
            const reader = new FileReader(); // Use FileReader to preview
            reader.onloadend = () => {
                setPreviewURL(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL.
        } else {
            setImage(null);
            setPreviewURL(null);
        }
    };

    return (
        <form>
            <section>
                <div>
                    <label htmlFor="">Upload image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    {previewURL && ( // Conditionally render the image preview
                        <div className="image-displayer"> {/* Styling the div */}
                            <img
                                src={previewURL}
                                alt="Image Preview"
                            />
                        </div>)}
                </div>
            </section>
            <div className="flex-col">
                <div>
                    <label htmlFor="">Product name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="flex-row">
                    <input type="checkbox" value={isForCompany} onChange={(e) => setIsForCompany(e.target.value)} />
                    <label htmlFor="">Do you want to upload your meal on our website?</label>
                </div>
            </div>

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
                <div className="quantity">
                    <label htmlFor="">{isForCompany ? "Add quantity of meals you want to sold" : "Enter quantity of this meal you want to order"}</label>
                    <input type="number" style={{ width: "4rem" }}
                        value={mealsQuantity} onChange={(e) => setMealsQuantity(e.target.value)} />
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
            <div className="flex-row-ingredient">
                <button onClick={handleAddNewSpecificMeal}>{isForCompany ? "Upload Meal" : "Order"}</button>
                {price > 0 && <div className="price-displayer">{!isForCompany ? `the price of your meal is ${price}` :
                    `you need to pay ${price / 2} for each meal of this type and you will earn ${(price / 2)}`
                }</div>}
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