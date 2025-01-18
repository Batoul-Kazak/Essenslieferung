// import menu_1 from "./../../assets/menu_1.png"
// import menu_2 from "./../../assets/menu_2.png"
// import menu_3 from "./../../assets/menu_3.png"
// import menu_4 from "./../../assets/menu_4.png"
// import menu_5 from "./../../assets/menu_5.png"
// import menu_6 from "./../../assets/menu_6.png"
// import menu_7 from "./../../assets/menu_7.png"
// import menu_8 from "./../../assets/menu_8.png"

import { useEffect, useRef } from "react";

// const dishesTypesArr = [
//     { meal: "Salad", img: menu_1 },
//     { meal: "Rolls", img: menu_2 },
//     { meal: "dessert", img: menu_3 },
//     { meal: "Sandwich", img: menu_4 },
//     { meal: "Cake", img: menu_5 },
//     { meal: "Pure Veg", img: menu_6 },
//     { meal: "Pasta", img: menu_7 },
//     { meal: "Noodles", img: menu_8 },
// ];

export default function ExploreMenu({ setQuery, query }) {
    return (
        <section className="explore-menu">
            <h2>Explore our menu</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aliquam unde,
                est, illum soluta dolor optio eius necessitatibus veniam quasi dolorem,
                deleniti officiis consequuntur doloremque culpa sunt ipsum distinctio a!</p>
            <Search setQuery={setQuery} query={query} />
        </section>
    );
}

function Search({ setQuery, query }) {
    const inputEl = useRef(null);

    useEffect(function () {
        function callback(e) {
            if (document.activeElement === inputEl.current) return;

            if (e.code === "Enter") {
                inputEl.current.focus();
                setQuery("");
            }
        }

        document.addEventListener("keydown", callback);
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [setQuery]);

    return (
        <main>
            <input
                type="text"
                placeholder="Search for your recipe..."
                value={query}
                className="search"
                onChange={(e) => setQuery(e.target.value)}
                ref={inputEl}
            />
            <div className="search-icon"></div>
        </main>
    );
}