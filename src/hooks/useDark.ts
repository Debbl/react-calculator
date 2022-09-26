import type { IFuncUpdater } from "ahooks/lib/createUseStorageState";

import { useEffect } from "react";
import { useLocalStorageState } from "ahooks";

function useDark(): [
  boolean,
  (value: boolean | IFuncUpdater<boolean>) => void,
] {
  const [isDark, setIsDark] = useLocalStorageState("dark", {
    defaultValue: false,
  });
  useEffect(() => {
    const htmlEl = document.querySelector("html");
    if (isDark) {
      htmlEl?.classList.add("dark");
    } else {
      htmlEl?.classList.remove("dark");
    }
  }, [isDark]);
  return [isDark, setIsDark];
}

export default useDark;
