import EventBus from "./EventBus";
import { reduce, Stack } from "./Stack";

type Events = { change: string };

type KeyNumber = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type KeyOpBinary = "+" | "-" | "*" | "/";
type KeyOpUnary = "%" | "+/-";
export type Key = KeyNumber | KeyOpBinary | KeyOpUnary | "." | "C" | "=";

// k is KeyNumber 用于 if 后类型缩小
export const isNumber = (k: Key): k is KeyNumber => !isNaN(parseInt(k));
export const isOpBinary = (k: Key): k is KeyOpBinary =>
  ["+", "-", "*", "/"].includes(k);
export const isOpUnary = (k: Key): k is KeyOpUnary => ["%", "+/-"].includes(k);

class Calculator extends EventBus<Events> {
  protected stack: Stack = ["0"];

  protected setStack(stack: Stack) {
    this.stack = stack;
    console.log(stack);
    this.emit("change", stack.join(""));
    // if (stack.length === 1) {
    //   this.emit("change", this.stack[0]);
    // } else if (stack.length === 2) {
    //   this.emit("change", this.stack[0]);
    // } else if (stack.length === 3) {
    //   this.emit("change", this.stack[2]!);
    // } else {
    //   throw stack;
    // }
  }
  press(k: Key) {
    const { stack } = this;
    if (isNumber(k)) {
      const num = parseInt(k);
      if (stack.length === 1) {
        this.setStack([
          stack[0] === "0" ? num.toString() : stack[0] + num.toString(),
        ]);
      } else if (stack.length === 2) {
        this.setStack([stack[0], stack[1], num.toString()]);
      } else if (stack.length === 3) {
        this.setStack([stack[0], stack[1], stack[2] + num.toString()]);
      }
    } else if (isOpBinary(k)) {
      if (stack.length === 1) {
        this.setStack([stack[0], k]);
      } else if (stack.length === 2) {
        this.setStack([stack[0], k]);
      } else if (stack.length === 3) {
        const [str] = reduce(stack);
        this.setStack([str, k]);
      }
    } else if (isOpUnary(k)) {
      const operate = (v: string, k: KeyOpUnary): string => {
        if (k === "%") {
          return parseFloat((parseFloat(v) / 100).toFixed(8)).toString();
        } else if (k === "+/-") {
          if (v.startsWith("-")) {
            return v.substring(1);
          } else {
            return "-" + v;
          }
        } else {
          throw k;
        }
      };
      if (stack.length === 1) {
        this.setStack([operate(this.stack[0], k)]);
      } else if (stack.length === 2) {
        this.setStack([operate(this.stack[0]!, k), this.stack[1]!]);
      } else {
        this.setStack([
          this.stack[0]!,
          this.stack[1]!,
          operate(this.stack[2]!, k),
        ]);
      }
    } else {
      const op = (k: string) => (k.includes(".") ? k : k + ".");
      switch (k) {
        case ".":
          if (stack.length === 1) {
            this.setStack([op(stack[0])]);
          } else if (stack.length === 2) {
            this.setStack([stack[0], stack[1], "0."]);
          } else if (stack.length === 3) {
            this.setStack([stack[0], stack[1], op(stack[2])]);
          }
          break;
        case "C":
          this.setStack(["0"]);
          break;
        case "=":
          if (this.stack.length === 3) {
            const [str] = reduce(this.stack);
            this.setStack([str]);
          }
          break;
        default:
          throw k;
      }
    }
  }
}

export default Calculator;
