import { useEffect, useState } from "react";

export function useLocalStorage(initiaState, key) {
  const [value, setValue] = useState(function () {
    const storage = JSON.parse(localStorage.getItem(key));

    return storage || initiaState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
