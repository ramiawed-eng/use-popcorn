import { useEffect, useState } from "react";

const key = "5a204103";
const url = `http://www.omdbapi.com/?apikey=${key}&`;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        setIsLoading(true);
        setError("");
        try {
          const response = await fetch(`${url}s=${query}`, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movies not found");
          }

          setMovies(data.Search);
          setError("");
        } catch (e) {
          if (e.name !== "AbortError") setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      const timer = setTimeout(fetchMovies, 700);

      return function () {
        clearTimeout(timer);
        controller.abort();
      };
    },
    [callback, query]
  );

  return [movies, isLoading, error];
}
