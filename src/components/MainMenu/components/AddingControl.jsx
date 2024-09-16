export function AddingControl({ onSetQuantity, quantity, onSetRegisteredMeals }) {

    return (
        <div className="adding-control">
            <div className="AAA">
                <button className="remove" onClick={() => onSetQuantity((quantity) => quantity - 1)}></button>
                <p>{quantity}</p>
                <button className="add-green" onClick={() => onSetQuantity((quantity) => quantity + 1)}></button>
            </div>
        </div>
    )
}