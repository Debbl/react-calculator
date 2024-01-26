type Op = "+" | "-" | "*" | "/";

export type Stack = [string] | [string, Op] | [string, Op, string];

export const reduce = (stack: [string, Op, string]): [string, number] => {
  const [s1, op, s2] = stack;
  const [n1, n2] = [s1, s2].map(Number.parseFloat);

  let res = Number.NaN;

  switch (op) {
    case "+":
      res = n1 + n2;
      break;
    case "-":
      res = n1 - n2;
      break;
    case "*":
      res = n1 * n2;
      break;
    case "/":
      res = n1 / n2;
      break;
    default:
      throw op;
  }

  if (!Number.isFinite(res) || Number.isNaN(res)) {
    return ["ERROR", Number.NaN];
  } else {
    return [Number.parseFloat(res.toFixed(8)).toString(), res];
  }
};
