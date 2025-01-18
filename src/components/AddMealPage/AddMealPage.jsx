export default function AddMealPage({ children }) {
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
                <NewMealInfo />
            </main>
        </section>
    );
}

function NewMealInfo() {
    return (
        <form>
            <div>
                <label htmlFor="">Upload image</label>
                <input type="image" src="" alt="" />
            </div>
            <div>
                <label htmlFor="">Product name</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Product description</label>
                <textarea type="text" />
            </div>
            <div className="flex-row">
                <div>
                    <label htmlFor="">Product Category</label>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Product price</label>
                    <input type="text" className="price-input" />
                </div>
            </div>
            <button>ADD</button>
        </form>
    )
}