import type { Key } from "@/utils/Calculator";
import Calculator from "@/utils/Calculator";
import { useEffect, useRef, useState } from "react";

const keys: Key[] = [
  "C",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

function getClass(k: string) {
  switch (k) {
    case "0":
      return "box-content w-32 px-1";
    default:
      return "w-16";
  }
}

function Counter() {
  const [value, setValue] = useState("0");

  const { current: calculator } = useRef(new Calculator());
  useEffect(() => {
    return calculator.on("change", setValue);
  }, []);
  return (
    <div className="inline-block rounded-md border p-3 pt-10">
      <div className="p-3 text-right text-6xl">{value}</div>
      <div className="inline-flex w-72 flex-wrap justify-between gap-y-1">
        {keys.map((k) => (
          <button
            onClick={() => calculator.press(k)}
            className={
              "box-border text-2xl bg-gray-100/50 h-16 rounded-md border hover:bg-yellow-400/60 active:bg-yellow-400/90 transition-all ease-in " +
              getClass(k)
            }
            key={k}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Counter;
