import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  const searchEl = useRef();

  function keyDownCallback() {
    if (document.activeElement === searchEl.current) return;

    searchEl.current.focus();
  }

  useKey(keyDownCallback, "Enter");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchEl}
    />
  );
}
