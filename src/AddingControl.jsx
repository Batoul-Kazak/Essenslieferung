import { useEffect, useRef } from "react";

export default function AddingControl({
    setIsClicked,
    setCanOrder,
    dishAmount,
    setDishAmount,
    handleAddRecipe
}) {
    const inputEl = useRef(null);

    // useEffect(function () {
    //     // localStorage.setItem("dishAmount", dishAmount);
    //     // localStorage.setItem(`dish${id}`, {...,  });
    // }, [dishAmount])

    useEffect(function () {
        if (dishAmount > 0) setCanOrder(true);
        else setCanOrder(false);

        handleAddRecipe();
    }, [dishAmount])

    function checkValue() {

        inputEl.current.value = inputEl.current.value.replace(/^0+/, '');

        // if (inputEl.current.value === "") {
        //     inputEl.current.value = "0"
        // }

        if (dishAmount <= 0) {
            alert("Value cannot be less than 0. Please correct it.");
            setDishAmount(1);
            setIsClicked(false);
        }

        if (dishAmount > 100) {
            alert("Sorry you can't get more than 100 dishes from the same type");
            setDishAmount(100);
        }
    }

    function handleAddDish() {
        if (dishAmount == 100) {
            alert("Sorry you can't get more than 100 dishes from the same type");
            return;
        }
        setDishAmount(dishAmount => dishAmount + 1);
    }

    function handleRemoveDish() {
        if (dishAmount <= 1) {
            alert("Value cannot be less than 0. Please correct it.");
            setDishAmount(1);
        }
        setDishAmount(dishAmount => dishAmount - 1);
        // handleAddRecipe();
    }

    function handleOnChange(e) {
        setDishAmount(Number(e.target.value));
        // handleAddRecipe();
    }

    return (
        <div className="adding-control">
            <div className="AAA">
                <button className="remove" onClick={handleRemoveDish}></button>
                {/* <p>{dishAmount}</p> */}
                <input type="number" max={100} min={0} value={dishAmount}
                    onChange={(e) => handleOnChange(e)} ref={inputEl}
                    onBlur={checkValue}
                />
                <button className="add-green" onClick={handleAddDish}></button>
            </div>
        </div>
    )
}