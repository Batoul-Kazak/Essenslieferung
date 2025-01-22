import { useState, useEffect } from "react";

export function useFetchingMeals(isQuery, query) {
    const [recipe, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const URL = isQuery ? `https://dummyjson.com/recipes/search?q=${query}` :
        "https://dummyjson.com/recipes";

    useEffect(function () {
        const controller = new AbortController();

        async function fetchRecipes() {
            try {
                setError("");
                setIsLoading(true);

                const res = await fetch(URL, { signal: controller.signal });

                if (!res.ok) throw new Error("Couldn't fetch recipe");

                const data = await res.json();

                if (data.total === 0)
                    throw new Error("There is no items matches your search");

                setRecipe(data.recipes);
                setError("");
                console.log(data.recipes)
            } catch (err) {
                console.log(err.message);
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }

            if (isQuery && query.length < 2) {
                setError("");
                setRecipe([]);
                return;
            }
        }
        fetchRecipes();

        return function () {
            controller.abort();
        }

    }, [query]);

    return { recipe, isLoading, error };
}