import { useEffect, useRef } from "react";
import { useKey } from "../../../../functions/useKey";

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

    useKey("Enter", function () {
        if (document.activeElement === inputEl.current) return;

        inputEl.current.focus();
        setQuery("");
    })

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