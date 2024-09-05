import { useEffect } from "react";

export function useKey(action, key) {
  useEffect(
    function () {
      function keyDownCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", keyDownCallback);

      return function () {
        document.removeEventListener("keydown", keyDownCallback);
      };
    },
    [action, key]
  );
}
